import { useMemo } from "react";
import { BeneficiaryTable } from "src/types/data/BeneficiaryTable";

function generateRandomPerson(): Omit<BeneficiaryTable, "id"> {
  const firstNames = ["John", "Sarah", "Ali", "Fatima", "Omar", "Layla"];
  const lastNames = ["Smith", "Hussein", "Ahmed", "Brown", "Yousef", "Khan"];
  const places = ["Baghdad", "Cairo", "Beirut", "Amman", "Damascus", "Tunis"];
  const jobs = [
    "Engineer",
    "Teacher",
    "Driver",
    "Nurse",
    "Farmer",
    "Technician",
  ];
  const descriptions = [
    "Needs urgent financial aid due to health issues.",
    "Single mother with three children.",
    "Elderly person with no source of income.",
    "Recently lost job due to company downsizing.",
    "Medical bills have accumulated beyond affordability.",
  ];
  const groups = [
    {
      name: "section 1",
      color: "primary",
      salary: "500000",
    },
    {
      name: "section 2",
      color: "secondary",
      salary: "1000000",
    },
    {
      name: "section 3",
      color: "warning",
      salary: "1500000",
    },
  ];

  const random = (arr: any) => arr[Math.floor(Math.random() * arr.length)];
  const randomDate = (start: any, end: any) =>
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
      .toLocaleDateString("Se-sz")
      .replace(/-/g, "/");

  const generatePhone = () =>
    `0${Math.floor(100000000 + Math.random() * 900000000)}`;
  const generateMobile = () =>
    `07${Math.floor(10000000 + Math.random() * 90000000)}`;
  const generateNationalNumber = () =>
    `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const generateGroup = () => groups[Math.floor(Math.random() * groups.length)];
  const group = generateGroup();

  return {
    first_name: random(firstNames),
    last_name: random(lastNames),
    father_name: random(firstNames),
    mother_name: random(firstNames),
    birth_date: randomDate(new Date(1960, 0, 1), new Date(2005, 0, 1)),
    birth_place: random(places),
    national_number: generateNationalNumber(),
    job: random(jobs),
    phone_number: generatePhone(),
    mobile_number: generateMobile(),
    residence_type: random(["rent", "own", "host", "borrow"]),
    monthly_income: Math.floor(Math.random() * 1000 + 100), // e.g., 100–1100
    request_status: random(["accepted", "rejected", "pending"]),
    family_members: Math.floor(Math.random() * 10) + 1,
    group_name: group.name,
    group_color: group.color as BeneficiaryTable["group_color"],
  };
}

export function useData() {
  return useMemo<BeneficiaryTable[]>(
    () => [
      {
        id: 1,
        ...generateRandomPerson(),
      },
      {
        id: 2,
        ...generateRandomPerson(),
      },
      {
        id: 3,
        ...generateRandomPerson(),
      },
      {
        id: 4,
        ...generateRandomPerson(),
      },
      {
        id: 10,
        ...generateRandomPerson(),
      },
      {
        id: 35,
        ...generateRandomPerson(),
      },
      {
        id: 105,
        ...generateRandomPerson(),
      },
      {
        id: 106,
        ...generateRandomPerson(),
      },
      {
        id: 107,
        ...generateRandomPerson(),
      },
      {
        id: 109,
        ...generateRandomPerson(),
      },
      {
        id: 235,
        ...generateRandomPerson(),
      },
      {
        id: 155,
        ...generateRandomPerson(),
      },
    ],
    []
  );
}
