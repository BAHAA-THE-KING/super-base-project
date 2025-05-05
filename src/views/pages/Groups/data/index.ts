import { useMemo } from "react";

type Group = {
  id: number;
  name: string;
  salary: string;
  color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  conditions: {
    id: number;
    name: string;
  }[];
  number_of_beneficiaries: number;
  percent_of_beneficiaries: number;
};
export function useGroupsData() {
  const groups: Group[] = useMemo(
    () => [
      {
        id: 1,
        name: "الفئة 1",
        salary: "500000",
        color: "primary",
        conditions: [
          {
            id: 1,
            name: "more than 1 member under 18 years old",
          },
          {
            id: 2,
            name: "monthly income less than 500000",
          },
        ],
        number_of_beneficiaries: 100,
        percent_of_beneficiaries: 20,
      },
      {
        id: 2,
        name: "الفئة 2",
        salary: "700000",
        color: "secondary",
        conditions: [
          {
            id: 3,
            name: "more than 2 members",
          },
          {
            id: 4,
            name: "more than 1 disabled member",
          },
        ],
        number_of_beneficiaries: 60,
        percent_of_beneficiaries: 15,
      },
      {
        id: 5,
        name: "الفئة 3",
        salary: "900000",
        color: "success",
        conditions: [
          {
            id: 5,
            name: "monthly income more than 700000",
          },
        ],
        number_of_beneficiaries: 10,
        percent_of_beneficiaries: 3,
      },
      {
        id: 4,
        name: "الفئة 4",
        salary: "1200000",
        color: "error",
        conditions: [
          {
            id: 6,
            name: "more than 3 members under 18 years old",
          },
          {
            id: 7,
            name: "more than 2 elderly members",
          },
        ],
        number_of_beneficiaries: 120,
        percent_of_beneficiaries: 30,
      },
      {
        id: 3,
        name: "الفئة 5",
        salary: "1000000",
        color: "warning",
        conditions: [
          {
            id: 9,
            name: "more than 3 members under 18 years old",
          },
          {
            id: 85,
            name: "more than 5 members",
          },
        ],
        number_of_beneficiaries: 15,
        percent_of_beneficiaries: 5,
      },
    ],
    []
  );

  return { isLoading: false, groups };
}
