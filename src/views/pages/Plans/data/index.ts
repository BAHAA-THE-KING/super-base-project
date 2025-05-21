import { useMemo } from "react";

export type PlanAttribute = {
  id: number;
  attribute_id: number;
  attribute: {
    id: number;
    name: string;
  };
  weight: number;
};

export type PlanBeneficiary = {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  birth_date: string;
  birth_place: string;
  national_number: string;
  score: number;
  order: number;
  received_date?: string;
  due_date?: string;
  has_taken: boolean;
};

export type Plan = {
  id: number;
  name: string;
  description: string;
  portion: string;
  type: "meat" | "food" | "rice" | "clothes" | "other";
  is_finished: boolean;
  created_at: string;
  plan_attributes: PlanAttribute[];
  nextBeneficiaries: PlanBeneficiary[];
  percent: number;
};
export function usePlansData() {
  const plans: Plan[] = useMemo(
    () => [
      {
        id: 1,
        name: "Meat Plan",
        description: "Supports families with monthly health needs.",
        portion: "2kg of lamb meat",
        type: "meat",
        is_finished: false,
        created_at: "2025-05-01",
        plan_attributes: [
          {
            id: 101,
            attribute_id: 1,
            attribute: {
              id: 1,
              name: "Health Score",
            },
            weight: 50,
          },
          {
            id: 102,
            attribute_id: 2,
            attribute: {
              id: 2,
              name: "Income Level",
            },
            weight: 30,
          },
        ],
        nextBeneficiaries: [
          {
            id: 201,
            first_name: "John",
            last_name: "Doe",
            father_name: "John",
            birth_date: "1980-01-01",
            birth_place: "Tehran",
            national_number: "1234567890",
            score: 75,
            order: 1,
            received_date: "2025-05-10",
            due_date: "2025-05-12",
            has_taken: false,
          },
          {
            id: 202,
            first_name: "Jane",
            last_name: "Smith",
            father_name: "John",
            birth_date: "1985-01-01",
            birth_place: "Tehran",
            national_number: "0987654321",
            score: 80,
            order: 2,
            received_date: "2025-05-11",
            has_taken: true,
          },
          {
            id: 203,
            first_name: "Ali",
            last_name: "Rezaei",
            father_name: "Karim",
            birth_date: "1978-07-12",
            birth_place: "Mashhad",
            national_number: "1122334455",
            score: 70,
            order: 3,
            received_date: "2025-05-12",
            due_date: "2025-05-14",
            has_taken: false,
          },
          {
            id: 204,
            first_name: "Zahra",
            last_name: "Moradi",
            father_name: "Hossein",
            birth_date: "1992-03-22",
            birth_place: "Qom",
            national_number: "6677889900",
            score: 85,
            order: 4,
            received_date: "2025-05-13",
            has_taken: true,
          },
          {
            id: 205,
            first_name: "Reza",
            last_name: "Kazemi",
            father_name: "Mahmoud",
            birth_date: "1983-11-05",
            birth_place: "Tabriz",
            national_number: "5566778899",
            score: 72,
            order: 5,
            due_date: "2025-06-16",
            has_taken: false,
          },
        ],
        percent: 65,
      },
      {
        id: 2,
        name: "al sha'lan rice distribution",
        description: "al sha'lan company will donate 500kg of rice monthly.",
        type: "rice",
        portion: "1kg per family member",
        is_finished: true,
        created_at: "2025-04-15",
        plan_attributes: [
          {
            id: 103,
            attribute_id: 3,
            attribute: {
              id: 3,
              name: "Number of Children",
            },
            weight: 40,
          },
          {
            id: 104,
            attribute_id: 2,
            attribute: {
              id: 2,
              name: "Income Level",
            },
            weight: 60,
          },
        ],
        nextBeneficiaries: [],
        percent: 100,
      },
      {
        id: 3,
        name: "clothes donation for disaster plan",
        description: "Aid for disaster-affected communities.",
        portion: "2 sets of clothes",
        type: "clothes",
        is_finished: false,
        created_at: "2025-03-20",
        plan_attributes: [
          {
            id: 105,
            attribute_id: 4,
            attribute: { id: 4, name: "Disaster Severity" },
            weight: 60,
          },
          {
            id: 106,
            attribute_id: 5,
            attribute: { id: 5, name: "Family Size" },
            weight: 40,
          },
        ],
        nextBeneficiaries: [
          {
            id: 204,
            first_name: "Sara",
            last_name: "Ahmadi",
            father_name: "Hossein",
            birth_date: "1990-06-15",
            birth_place: "Shiraz",
            national_number: "6677889900",
            score: 92,
            order: 1,
            due_date: "2025-03-27",
            has_taken: false,
          },
        ],
        percent: 45,
      },
      {
        id: 4,
        name: "Nutrition Improvement Plan",
        description: "Improves nutrition for low-income households.",
        portion: "1 bag of rice, 2 bottles of oil",
        type: "food",
        is_finished: false,
        created_at: "2025-02-10",
        plan_attributes: [
          {
            id: 107,
            attribute_id: 6,
            attribute: { id: 6, name: "Nutritional Risk" },
            weight: 70,
          },
        ],
        nextBeneficiaries: [
          {
            id: 205,
            first_name: "Mehdi",
            last_name: "Rostami",
            father_name: "Ali",
            birth_date: "1975-11-11",
            birth_place: "Isfahan",
            national_number: "5566778899",
            score: 78,
            order: 1,
            received_date: "2025-02-15",
            has_taken: true,
          },
          {
            id: 206,
            first_name: "Fatemeh",
            last_name: "Karimi",
            father_name: "Reza",
            birth_date: "1982-08-25",
            birth_place: "Tabriz",
            national_number: "9988776655",
            score: 81,
            order: 2,
            has_taken: false,
          },
        ],
        percent: 30,
      },
      {
        id: 5,
        name: "Employment Support Plan",
        description: "Helps unemployed individuals find jobs.",
        portion: "5kg of meat",
        type: "meat",
        is_finished: true,
        created_at: "2025-01-01",
        plan_attributes: [
          {
            id: 108,
            attribute_id: 7,
            attribute: { id: 7, name: "Unemployment Duration" },
            weight: 50,
          },
          {
            id: 109,
            attribute_id: 8,
            attribute: { id: 8, name: "Education Level" },
            weight: 50,
          },
        ],
        nextBeneficiaries: [],
        percent: 100,
      },
    ],
    []
  );

  return { isLoading: false, plans };
}
