import { useState } from "react";
import { DonationBook } from "src/types/data/DonationBook";

export function useShowBookData(_: number = 0) {
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
  const createBook = (_: any) => ({ data: book });
  const updateBook = (_: any) => {};
  const getBookLoading = false;

  const employees = [
    {
      id: 1,
      image_url: "https://randomuser.me/api/portraits/men/12.jpg",
      name: "Liam Johnson",
      national_number: "1122334455",
    },
    {
      id: 2,
      image_url: "https://randomuser.me/api/portraits/women/45.jpg",
      name: "Olivia Davis",
      national_number: "2233445566",
    },
    {
      id: 3,
      image_url: "https://randomuser.me/api/portraits/men/33.jpg",
      name: "Noah Miller",
      national_number: "3344556677",
    },
    {
      id: 4,
      image_url: "https://randomuser.me/api/portraits/women/22.jpg",
      name: "Sophia Brown",
      national_number: "5566778899",
    },
    {
      id: 5,
      image_url: "https://randomuser.me/api/portraits/men/55.jpg",
      name: "Ethan Wilson",
      national_number: "6677889900",
    },
    {
      id: 6,
      image_url: "https://randomuser.me/api/portraits/women/65.jpg",
      name: "Ava Taylor",
      national_number: "7788990011",
    },
  ];

  const getEmployeesLoading = false;

  const [createBatchLoading] = useState(false);
  const createNewBatch = (_: {
    book_id: number;
    date: string;
    from: string;
    to: string;
    got_money: number;
    person_id: number;
  }) => {};

  return {
    book,
    createBook,
    updateBook,
    getBookLoading,
    createNewBatch,
    employees,
    getEmployeesLoading,
    createBatchLoading,
  };
}
