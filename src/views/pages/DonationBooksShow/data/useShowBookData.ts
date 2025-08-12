import { DonationBook } from "src/types/data/DonationBook";

export function useShowBookData(bookId: number) {
  const book: DonationBook = {
    id: 3,
    number: 103,
    date: "2025-02-10",
    start: "546153",
    end: "546173",
    is_finished: true,
    category: "20 مليون",
    page_price: 100000,
    details: "Donation of educational booklets on climate change.",
    batches: [
      {
        id: 4,
        order: 1,
        date: "2025-02-10",
        from: "546153",
        to: "546173",
        got_money: 200000,
        person: {
          id: 4,
          image_url: "https://randomuser.me/api/portraits/women/22.jpg",
          name: "Sophia Brown",
          national_number: "5566778899",
        },
      },
    ],
  };
  const createBook = (data: any) => ({ data: book });
  const updateBook = (data: any) => {};
  const getBookLoading = false;

  return {
    book,
    createBook,
    updateBook,
    getBookLoading,
  };
}
