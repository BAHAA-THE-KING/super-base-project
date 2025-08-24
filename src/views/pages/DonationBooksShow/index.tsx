import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { GeneralBookInfo, BatchesInfo, BookTerminatePopup } from "./components";

import { useShowBookData } from "./data";

import { varAlpha } from "src/themes/styles";

type Form = {
  number: number;
  date: string;
  start: string;
  end: string;
  category: string;
  page_price: number;
  details: string;
};

export function DonationBooksShow({ isAdd = false }: { isAdd?: boolean }) {
  const navigate = useNavigate();
  const { bookId: bookIdParam } = useParams();
  const bookId = Number(bookIdParam) ?? 0;
  if ((!bookId || bookId <= 0) && !isAdd) {
    navigate("/accountant/donation-books");
    return <></>;
  }

  const { book, createBook, updateBook, getBookLoading } =
    useShowBookData(bookId);

  const [wantToTerminate, setWantToTerminate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit && !book) {
    navigate(-1);
    return <></>;
  }

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<Form>({
    defaultValues: {
      number: 0,
      date: "",
      start: "",
      end: "",
      category: "",
      page_price: 0,
      details: "",
    },
  });

  useEffect(() => {
    if (isEdit && book)
      reset({
        number: book.number,
        date: book.date,
        start: book.start,
        end: book.end,
        category: book.category,
        page_price: book.page_price,
        details: book.details,
      });
  }, [book, isEdit]);

  const submit = handleSubmit(async (data) => {
    if (isAdd) {
      const newBook = await createBook({
        number: data.number,
        date: data.date,
        start: data.start,
        end: data.end,
        category: data.category,
        page_price: data.page_price,
        details: data.details,
      });
      navigate(newBook.data.id.toString(), {
        replace: true,
      });
    } else if (isEdit) {
      await updateBook({
        id: bookId,
        number: data.number,
        date: data.date,
        start: data.start,
        end: data.end,
        category: data.category,
        page_price: data.page_price,
        details: data.details,
      });
      setIsEdit(false);
    }
  });
  function handleTerminate() {}

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      borderRadius={1}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"stretch"}
      p={2}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.secondary.darkerChannel, 0.2)
            : theme.palette.secondary.lighter,
      })}
    >
      {isEdit && getBookLoading ? (
        <>
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={350}
            sx={{ my: 1 }}
          />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={400}
            sx={{ my: 3 }}
          />
        </>
      ) : (
        <>
          <GeneralBookInfo
            control={control}
            isDirty={isDirty}
            handleSubmit={submit}
            handleTerminate={() => setWantToTerminate(true)}
            isAdd={isAdd}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          {isAdd ? null : book ? <BatchesInfo book={book} /> : null}
          <BookTerminatePopup
            book={wantToTerminate ? book : null}
            handleTerminate={handleTerminate}
            close={() => setWantToTerminate(false)}
          />
        </>
      )}
    </Stack>
  );
}
