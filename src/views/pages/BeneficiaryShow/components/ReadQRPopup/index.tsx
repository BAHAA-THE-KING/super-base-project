import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useForm } from "react-hook-form";
import { Box, Stack, type BoxProps } from "@mui/material";

import { FormSelect, Popup } from "src/components";
import { BButton } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { AvailableAid, Item } from "src/types/data/AvailableAid";

type Props = {
  open: boolean;
  close: () => void;
  data: AvailableAid | null;
  items: Item[];
  deliverAid: (qr: string, aid: AvailableAid, item_id?: number) => Promise<any>;
  deliverAidLoading: boolean;
};

const i18ns = ["item", "no._available", "confirm_operation"];
export function ReadQRPopup({
  open,
  close,
  data,
  items,
  deliverAid,
  deliverAidLoading,
}: Props) {
  const [ItemText, NOAvailableText, ConfirmOperationText] =
    useBaseTranslation(i18ns);
  const [scannedData, setScannedData] = useState(""); // Store the scanned QR code value
  const { control, handleSubmit, reset } = useForm<{ item_id: number }>({
    defaultValues: { item_id: 0 },
  });

  useEffect(() => {
    reset({ item_id: 0 });
    setScannedData("");
  }, [open]);

  const withItem = data?.type === "special materials" || data?.type === "aids";

  return (
    <Popup open={open} close={close}>
      <Stack justifyContent={"center"} alignItems={"center"} gap={3}>
        <Scanner
          onScan={(result) => setScannedData(result[0].rawValue)}
          styles={{ container: { width: "100%", maxWidth: "500px" } }}
        />
        {withItem ? (
          <Box width={"100%"}>
            <FormSelect
              control={control}
              name="item_id"
              label={ItemText}
              options={items.filter((e) => e.id === data.category_id)}
              rules={{ required: true }}
              renderOption={(props, option: any) => (
                <Box {...(props as BoxProps)}>
                  {option.id +
                    " / " +
                    option.name +
                    " / " +
                    NOAvailableText +
                    " " +
                    option.amount}
                </Box>
              )}
            />
          </Box>
        ) : null}
        <Box width={"100%"}>
          <BButton
            variant="contained"
            color="primary"
            loading={deliverAidLoading}
            onClick={handleSubmit((item) => {
              if (!data || !scannedData) return;
              if (withItem)
                deliverAid(scannedData, data, item.item_id).then(close);
              else deliverAid(scannedData, data).then(close);
            })}
          >
            {ConfirmOperationText}
          </BButton>
        </Box>
      </Stack>
    </Popup>
  );
}
