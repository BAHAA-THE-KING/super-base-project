export type Doctor = {
  id: number;
  name: string;
  address: string;
  birth: string;
  mobile: string;
  specification: string;
  price: string;
  attendance_schedules: {
    from: string;
    to: string;
    days: string[];
  }[];
};
