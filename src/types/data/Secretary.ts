export type SecretaryType = {
  id: number;
  name: string;
  address: string;
  birth: string;
  mobile: string;
  salary: string;
  attendance_schedule: {
    from: string;
    to: string;
    days: string[];
  };
};
