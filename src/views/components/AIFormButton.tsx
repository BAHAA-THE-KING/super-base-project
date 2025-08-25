import { useEffect, useState } from "react";
import { Box, Grid2, Stack, SvgIcon } from "@mui/material";
import { useForm, type UseFormSetValue } from "react-hook-form";

import { BsMagic } from "react-icons/bs";

import { FormImage, Popup } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useAIAssistant } from "../APIs/useAIAssistant";
import { jsonToFormdata } from "src/utils";

const i18ns = ["extract_data_from_media", "images", "extract", "apply"];
export function AIFormButton({ setValue }: { setValue: UseFormSetValue<any> }) {
  const [ExtractDataText, ImagesText, ExtractText, ApplyText] =
    useBaseTranslation(i18ns);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExtracted, setIsExtracted] = useState(false);
  const [extractedData, setExtractedData] = useState<
    {
      key: string;
      value: string;
    }[]
  >([]);

  const { formFillerAPI } = useAIAssistant();

  const { control, handleSubmit, reset } = useForm<{ image: File[] }>({
    defaultValues: { image: [] },
  });

  useEffect(() => {
    reset({ image: [] });
  }, [open]);

  const onSubmit = handleSubmit((data) => {
    setLoading(true);

    const inputs = [...document.querySelectorAll("input[type=text]")]
      .map((e) => e.getAttribute("name"))
      .filter((e) => e)
      .map((e) => ({
        name: e,
        description: "all arabic, just numbers english",
      }));

    formFillerAPI({
      data: jsonToFormdata({ files: data.image, fields: inputs }),
    })
      .then((data) => {
        setIsExtracted(true);
        setExtractedData(
          Object.keys(data)
            .map((k) => {
              const { value, confidence } = data[k];
              if (confidence < 0.5) return null;
              return {
                key: k,
                value,
              };
            })
            .filter((e) => e !== null)
        );
      })
      .finally(() => setLoading(false));
  });
  const applyData = () => {
    extractedData.map(({ key, value }) => setValue(key, value));
    setIsExtracted(false);
    setOpen(false);
  };

  return (
    <>
      <BButton
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
        startIcon={
          <SvgIcon>
            <BsMagic />
          </SvgIcon>
        }
      >
        {ExtractDataText}
      </BButton>
      <Popup open={open} close={() => setOpen(false)}>
        <BTypography variant="h5" fontWeight={"bold"}>
          {ExtractDataText}
        </BTypography>
        <Box mt={5}>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <FormImage
                control={control}
                label={ImagesText}
                name="image"
                rules={{ required: true }}
              />
            </Grid2>
            {isExtracted && (
              <Grid2 size={12} display={"flex"} flexDirection={"column"}>
                {extractedData.map(({ key, value }) => (
                  <Stack flexDirection={"row"}>
                    <BTypography fontWeight={"bold"}>
                      {document.querySelector(`input[type=text][name=${key}]`)
                        ?.parentElement?.previousSibling?.innerHTML ?? ""}
                      :&nbsp;
                    </BTypography>
                    <BTypography>{value}</BTypography>
                  </Stack>
                ))}
              </Grid2>
            )}
            <Grid2 size={12} mt={3}>
              <Box>
                <BButton
                  variant="contained"
                  color="primary"
                  onClick={isExtracted ? applyData : onSubmit}
                  loading={loading}
                >
                  {isExtracted ? ApplyText : ExtractText}
                </BButton>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Popup>
    </>
  );
}
