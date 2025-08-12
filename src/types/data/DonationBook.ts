export type DonationBook = {
  id: number;
  number: number;
  category: string;
  date: string;
  start: string;
  end: string;
  is_finished: boolean;
  page_price: number;
  details: string;
  batches: Batch[];
};

export type Batch = {
  id: number;
  order: number;
  date: string;
  from: string;
  to: string;
  got_money: number;
  person: {
    id: number;
    image_url: string;
    name: string;
    national_number: string;
  };
};
