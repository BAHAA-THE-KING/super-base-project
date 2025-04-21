import { useMemo } from "react";

import image from "./image.png";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { Aid } from "src/types/data/Aid";

export function useData(id: number) {
  return useMemo<SingleBeneficiary>(
    () => ({
      id,
      image_url: image,
      first_name: "Omar",
      last_name: "Yousef",
      father_name: "Ali",
      mother_name: "Fatima",
      birth_date: "1985-03-15",
      birth_place: "Damascus",
      national_number: "198503150001",
      gender: "male",
      job: "Electrician",
      health_status: "Suffers from chronic back pain",
      phone_number: "0112345678",
      mobile_number: "0798765432",
      address: "Al-Midan, Damascus, Syria",
      residence_type: "rent", // enum: rent, own, host, borrow
      residence_document_id: 101,
      monthly_income: 250,
      case_description:
        "Struggles to provide for a family of 5 due to low income and health problems.",
      request_id: 42,
      request_status: "accepted", // enum: accepted, rejected
      children: [
        {
          id: 1,
          beneficiary_id: 1,
          name: "Layla Yousef",
          birth_date: "2010-06-10",
          gender: "female", // enum: male, female
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 2,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2012-11-23",
          gender: "male",
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
      ],
      uncles: [
        {
          id: 1,
          beneficiary_id: 1,
          from: "father", // enum: father, mother
          first_name: "Hassan",
          last_name: "Yousef",
          job: "Teacher",
          provided_aid: "Occasionally sends money and food supplies.",
        },
        {
          id: 2,
          beneficiary_id: 1,
          from: "mother",
          first_name: "Khaled",
          last_name: "Hussein",
          job: "Tailor",
          provided_aid: "Helped with school fees for the children.",
        },
      ],
      partner: {
        id: 1,
        beneficiary_id: 1,
        first_name: "Amina",
        last_name: "Hassan",
        job: "Home-based seamstress",
        gender: "female",
        health_status: "Healthy",
      },
      group: {
        id: 3,
        name: "section 5",
        salary: "1000000",
        color: "warning",
        group_conditions: [
          {
            id: 6,
            params: "5",
            condition: {
              id: 9,
              name: "more than 3 members under 18 years old",
            },
          },
          {
            id: 63,
            params: "8",
            condition: {
              id: 85,
              name: "more than 5 members",
            },
          },
        ],
      },
    }),
    []
  );
}

export function useAidsData(beneficiary_id: number) {
  const aids: Aid[] = useMemo(
    () => [
      {
        id: 1,
        is_collected: true,
        description: "راتب بقيمة 100 ألف",
        collection_date: "2025-04-01",
        recipient_name: "عمر يوسف",
        expiry_date: "2025-05-01",
        type: "monthly salary",
      },
      {
        id: 2,
        is_collected: false,
        description: "ملابس شتوية للأطفال",
        collection_date: null,
        recipient_name: "فاطمة خالد",
        expiry_date: "2026-01-01",
        type: "aids",
      },
      {
        id: 3,
        is_collected: true,
        description: "وصفة أدوية زكام",
        collection_date: "2025-03-20",
        recipient_name: "علي حسن",
        expiry_date: "2025-09-30",
        type: "prescription exchange",
      },
      {
        id: 4,
        is_collected: false,
        description: "وقود للتدفئة",
        collection_date: null,
        recipient_name: "ليلى يوسف",
        expiry_date: "2026-06-30",
        type: "special materials",
      },
      {
        id: 5,
        is_collected: true,
        description: "200 ألف لتسديد قسط المدرسة",
        collection_date: "2025-02-15",
        recipient_name: "خالد حسين",
        expiry_date: "2025-12-31",
        type: "emergency aids",
      },
    ],
    []
  );

  return { isLoading: false, aids };
}
