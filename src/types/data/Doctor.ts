export type Doctor = {
  id?: number;
  name: string;
  address: string;
  birth_place: string;
  birth_date: string;
  mobile: string;
  specification: string;
  price: string;
  attendance_schedules: {
    from: string;
    to: string;
    days: { id: number; name: string }[];
  }[];
};
