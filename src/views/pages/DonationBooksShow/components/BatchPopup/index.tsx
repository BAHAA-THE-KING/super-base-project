import { useEffect } from "react";
import { Box, Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect, Popup } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { DonationBook } from "src/types/data/DonationBook";
import { useShowBookData } from "../../data";

type Form = {
  date: string;
  from: string;
  to: string;
  got_money: number;
  person_id: number;
};

type Props = {
  open: boolean;
  close: () => void;
  book: DonationBook;
};

const i18ns = [
  "add_new_batch_for_book",
  "collector",
  "date",
  "from",
  "to",
  "got_money",
  "save_new_batch",
];
export function BatchPopup({ open, close, book }: Props) {
  const [
    AddNewBatchForBookText,
    CollectorText,
    DateText,
    FromText,
    ToText,
    GotMoneyText,
    SaveNewBatchText,
  ] = useBaseTranslation(i18ns);

  const { employees, createNewBatch } = useShowBookData();

  const { control, reset, handleSubmit } = useForm<Form>({
    defaultValues: {
      date: new Date().toLocaleDateString("en-ZA"),
      from: "",
      to: "",
      got_money: 0,
      person_id: 0,
    },
  });

  useEffect(() => {
    reset({
      date: new Date().toLocaleDateString("en-ZA"),
      from: "",
      to: "",
      got_money: 0,
      person_id: 0,
    });
  }, [open]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createNewBatch({ ...data, book_id: book.id });
  });

  return (
    <Popup open={open} close={close}>
      <BTypography variant="h5" fontWeight={"bold"}>
        {AddNewBatchForBookText} {book.number} / {book.category}
      </BTypography>
      <Box mt={5}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormSelect
              options={employees}
              control={control}
              label={CollectorText}
              name="person_id"
              rules={{ required: true }}
              canType
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={DateText}
              name="date"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={FromText}
              name="from"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={ToText}
              name="to"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={GotMoneyText}
              name="got_money"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={12} mt={3}>
            <Box>
              <BButton variant="contained" color="primary" onClick={onSubmit}>
                {SaveNewBatchText}
              </BButton>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Popup>
  );
}
