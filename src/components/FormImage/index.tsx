import { useRef, useState } from "react";
import {
  Controller,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Badge, Box, IconButton, Stack } from "@mui/material";
import {
  Close as CloseIcon,
  AddRounded as AddRoundedIcon,
} from "@mui/icons-material";

import { ImagesPopup } from "../ImagesPopup";
import { BTypography } from "../Base";

import { useBaseTranslation } from "src/hooks";

import { varAlpha } from "src/themes/styles";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  label: string;
  maxFiles?: number;
};

const i18ns = ["you_have_to_upload_at_least_one_image", "click_to_add_image"];

export function FormImage<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  label,
  name,
  rules,
  disabled,
  maxFiles = 1,
}: Props<TFieldValues, TName>) {
  const [YouHaveToUploadAtLeastOneImageText, ClickToAddImageText] =
    useBaseTranslation(i18ns);

  const [previews, setPreviews] = useState<(string | null)[]>([]);

  const [open, setOpen] = useState<false | number>(false);
  const close = () => setOpen(false);

  const inputRef = useRef<any>(null);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { value, onChange },
          fieldState: { invalid, error },
        }) => (
          <Stack>
            <BTypography>{label}</BTypography>
            <Stack
              border={(theme) =>
                `${varAlpha(theme.palette.grey["500Channel"], 0.2)} 1px solid`
              }
              borderRadius={3}
              justifyContent={"flex-start"}
              alignItems={"stretch"}
              onClick={() => inputRef?.current?.click()}
              sx={{ cursor: "pointer" }}
            >
              <Stack
                minHeight={"100px"}
                direction={"row"}
                flexWrap={"wrap"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {value.length ? (
                  <>
                    {value.map((image: string, index: number) => (
                      <Badge
                        key={(previews[index] || image) + index}
                        badgeContent={
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onChange(
                                value
                                  .filter((_: any, i: number) => i !== index)
                                  .slice(0, maxFiles)
                              );
                              setPreviews(
                                previews
                                  .filter((_, i) => i !== index)
                                  .slice(0, maxFiles)
                              );
                            }}
                          >
                            <CloseIcon color="error" />
                          </IconButton>
                        }
                        sx={{
                          cursor: "pointer",
                          "& .MuiBadge-badge": {
                            right: "85%",
                            top: "5%",
                          },
                        }}
                      >
                        <Box
                          sx={(theme) => ({
                            width: "75px",
                            height: "75px",
                            borderRadius: 1,
                            border: `2px solid ${theme.palette.grey["500"]}`,
                            m: "10px",
                          })}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpen(index);
                          }}
                        >
                          <img
                            src={previews[index] || image}
                            style={{
                              width: "75px",
                              height: "75px",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      </Badge>
                    ))}
                    <Box
                      sx={(theme) => ({
                        width: "75px",
                        height: "75px",
                        borderRadius: 1,
                        border: `2px solid ${theme.palette.grey["500"]}`,
                        m: "10px",
                      })}
                    >
                      <AddRoundedIcon
                        sx={(theme) => ({
                          fontSize: "75px",
                          color: theme.palette.text.primary,
                        })}
                      />
                    </Box>
                  </>
                ) : (
                  <BTypography>{ClickToAddImageText}</BTypography>
                )}
              </Stack>
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                disabled={disabled}
                onChange={(e) => {
                  const filesLength = e.target.files?.length ?? 0;
                  if (filesLength === 0) return;
                  const files = e.target.files;
                  const resultFiles: any[] = [];
                  const resultPreviews: any[] = [];
                  [...new Array(filesLength)].map((_, index) => {
                    const file = files?.item(index);
                    if (file) {
                      const url = URL.createObjectURL(file);
                      resultPreviews.push(url);
                      resultFiles.push(file);
                    }
                  });
                  setPreviews([...previews, ...resultPreviews]);
                  onChange([...value, ...resultFiles]);
                }}
                ref={inputRef}
              />
              {invalid && (
                <BTypography color="error" variant="caption">
                  {error?.message || YouHaveToUploadAtLeastOneImageText}
                </BTypography>
              )}
            </Stack>
          </Stack>
        )}
      />
      <ImagesPopup
        open={typeof open === "number"}
        close={close}
        images={previews as string[]}
        defaultIndex={open as number}
      />
    </>
  );
}
