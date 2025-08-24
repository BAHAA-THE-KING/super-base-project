import { useMemo, useState } from "react";
import { Grid2, Skeleton, Stack } from "@mui/material";

import {
  AddDonationBookCard,
  DonationBookCard,
  DonationBookGrid,
} from "./components";

import { useDonationBooksColumns } from "./hooks";

import { useDonationBooksData } from "./data";

import { varAlpha } from "src/themes/styles";

export function DonationBooks() {
  const columns = useDonationBooksColumns();

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<
    {
      id: string | number;
      field: string;
      operator: string;
      value: string | number;
    }[]
  >([]);

  const params = [
    ...filters,
    { id: "page", field: "page", operator: "=", value: page + 1 },
  ].reduce((p, e) => ({ ...p, [e.field]: e.value }), {});

  const { books, totalRows, getBooksLoading } = useDonationBooksData(params);

  const top4Books = useMemo(
    () => books.filter((book) => !book.is_finished).slice(0, 4),
    [books]
  );

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      borderRadius={1}
      p={3}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.secondary.darkerChannel, 0.2)
            : theme.palette.secondary.lighter,
      })}
    >
      <Grid2 container spacing={3} mb={2}>
        {top4Books.map((book) => (
          <Grid2 key={book.id} size={{ xs: 12, md: 2.4 }}>
            <DonationBookCard book={book} />
          </Grid2>
        ))}
        {getBooksLoading
          ? new Array(4).fill(null).map((_, i) => (
              <Grid2 key={i} size={{ xs: 12, md: 2.4 }}>
                <Skeleton variant="rounded" width={"100%"} height={240} />
              </Grid2>
            ))
          : null}
        <AddDonationBookCard />
      </Grid2>
      <DonationBookGrid
        columns={columns}
        rows={books}
        loading={getBooksLoading}
        page={page}
        setPage={setPage}
        setFilters={setFilters}
        totalRows={totalRows}
        pageSize={15}
      />
    </Stack>
  );
}
