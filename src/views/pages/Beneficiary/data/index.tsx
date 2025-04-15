import { useMemo } from "react";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

export function useData(id: number) {
  return useMemo<SingleBeneficiary>(
    () => ({
      id: 1,
      first_name: "Omar",
      last_name: "Yousef",
      father_name: "Ali",
      mother_name: "Fatima",
      birth_date: "1985-03-15",
      birth_place: "Damascus",
      national_number: "198503150001",
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
      partners: [
        {
          id: 1,
          beneficiary_id: 1,
          first_name: "Amina",
          last_name: "Hassan",
          job: "Home-based seamstress",
          gender: "female",
          health_status: "Healthy",
        },
      ],
    }),
    []
  );
}
