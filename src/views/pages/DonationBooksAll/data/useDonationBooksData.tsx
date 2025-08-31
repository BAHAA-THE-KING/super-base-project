import { DonationBook } from "src/types/data/DonationBook";

export function useDonationBooksData(_: any) {
  const books: DonationBook[] = [
    {
      id: 1,
      number: 101,
      date: "2025-02-01",
      start: "00001",
      end: "01000",
      is_finished: true,
      category: "10 مليون",
      page_price: 10000,
      details: "Book donations collected for local school libraries.",
      batches: [
        {
          id: 1,
          order: 1,
          date: "2025-02-01",
          from: "00001",
          to: "00045",
          got_money: 440000,
          person: {
            id: 1,
            image_url: "https://randomuser.me/api/portraits/men/32.jpg",
            name: "John Carter",
            national_number: "1234567890",
          },
        },
        {
          id: 2,
          order: 2,
          date: "2025-02-01",
          from: "00045",
          to: "00100",
          got_money: 560000,
          person: {
            id: 2,
            image_url: "https://randomuser.me/api/portraits/women/65.jpg",
            name: "Emily Roberts",
            national_number: "9876543210",
          },
        },
      ],
    },
    {
      id: 2,
      number: 102,
      date: "2025-02-05",
      start: "120000",
      end: "120100",
      is_finished: false,
      category: "100 ألف",
      page_price: 1000,
      details: "Medical book drive for rural clinics.",
      batches: [
        {
          id: 3,
          order: 1,
          date: "2025-02-05",
          from: "120000",
          to: "120014",
          got_money: 14000,
          person: {
            id: 3,
            image_url: "https://randomuser.me/api/portraits/men/44.jpg",
            name: "Michael Smith",
            national_number: "1122334455",
          },
        },
      ],
    },
    {
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
    },
    {
      id: 4,
      number: 104,
      date: "2025-03-02",
      start: "230000",
      end: "240000",
      is_finished: false,
      category: "5 مليون",
      page_price: 5000,
      details: "Books for community development programs.",
      batches: [
        {
          id: 5,
          order: 1,
          date: "2025-03-02",
          from: "230000",
          to: "230020",
          got_money: 100000,
          person: {
            id: 5,
            image_url: "https://randomuser.me/api/portraits/men/77.jpg",
            name: "David Johnson",
            national_number: "6677889900",
          },
        },
        {
          id: 6,
          order: 2,
          date: "2025-03-02",
          from: "230020",
          to: "230050",
          got_money: 150000,
          person: {
            id: 6,
            image_url: "https://randomuser.me/api/portraits/women/34.jpg",
            name: "Olivia Williams",
            national_number: "9988776655",
          },
        },
      ],
    },
    {
      id: 5,
      number: 105,
      date: "2025-03-15",
      start: "74000",
      end: "74050",
      is_finished: true,
      category: "50 ألف",
      page_price: 1000,
      details: "Small print educational pamphlet distribution.",
      batches: [
        {
          id: 7,
          order: 1,
          date: "2025-03-15",
          from: "74000",
          to: "74050",
          got_money: 50000,
          person: {
            id: 7,
            image_url: "https://randomuser.me/api/portraits/men/90.jpg",
            name: "Daniel Evans",
            national_number: "2233445566",
          },
        },
      ],
    },
  ];

  const totalRows = books.length;

  const getBooksLoading = false;
  return {
    books,
    totalRows,
    getBooksLoading,
  };
}
