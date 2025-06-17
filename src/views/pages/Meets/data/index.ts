import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

import image from "./image.png";

export type BeneficiaryRequest = Pick<
  SingleBeneficiary,
  | "id"
  | "image_url"
  | "first_name"
  | "last_name"
  | "birth_date"
  | "address"
  | "case_description"
  | "request_id"
  | "children"
  | "partner"
>;

export function useMeetData() {
  const membershipRequests: Partial<BeneficiaryRequest>[] = [
    {
      id: 135,
      image_url: image,
      first_name: "عمر",
      last_name: "يوسف",
      birth_date: "1985-03-15",
      address: "Al-Midan, Damascus, Syria",
      case_description:
        "Struggles to provide for a family of 5 due to low income and health problems.",
      request_id: 42,
      children: [
        {
          id: 1,
          beneficiary_id: 1,
          name: "Layla Yousef",
          birth_date: "2010-06-10",
          gender: { id: "female" }, // enum: male, female
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 11,
          beneficiary_id: 1,
          name: "Layla Yousef",
          birth_date: "2010-06-10",
          gender: { id: "female" }, // enum: male, female
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 12,
          beneficiary_id: 1,
          name: "Layla Yousef",
          birth_date: "2010-06-10",
          gender: { id: "female" }, // enum: male, female
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 15,
          beneficiary_id: 1,
          name: "Layla Yousef",
          birth_date: "2010-06-10",
          gender: { id: "female" }, // enum: male, female
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 2,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2012-11-23",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 3,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2012-11-23",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 22,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2008-05-03",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 21,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2015-10-02",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 32,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2010-11-23",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
      ],
      partner: {
        id: 1,
        beneficiary_id: 1,
        first_name: "Amina",
        last_name: "Hassan",
        job: "Home-based seamstress",
        gender: { id: "female" },
        health_status: "Healthy",
      },
    },
    {
      id: 15,
      image_url: image,
      first_name: "يوسف",
      last_name: "عمر",
      birth_date: "1985-03-15",
      address: "Al-Midan, Damascus, Syria",
      case_description:
        "Struggles to provide for a family of 5 due to low income and health problems.",
      request_id: 42,
      children: [
        {
          id: 1,
          beneficiary_id: 1,
          name: "Layla Yousef",
          birth_date: "2010-06-10",
          gender: { id: "female" }, // enum: male, female
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 11,
          beneficiary_id: 1,
          name: "Layla Yousef",
          birth_date: "2010-06-10",
          gender: { id: "female" }, // enum: male, female
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 12,
          beneficiary_id: 1,
          name: "Layla Yousef",
          birth_date: "2010-06-10",
          gender: { id: "female" }, // enum: male, female
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 15,
          beneficiary_id: 1,
          name: "Layla Yousef",
          birth_date: "2010-06-10",
          gender: { id: "female" }, // enum: male, female
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 2,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2012-11-23",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 3,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2012-11-23",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 22,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2008-05-03",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 21,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2015-10-02",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
        {
          id: 32,
          beneficiary_id: 1,
          name: "Ahmad Yousef",
          birth_date: "2010-11-23",
          gender: { id: "male" },
          is_alive: true,
          partner_name: "Omar Yousef",
          residence_place: "Al-Midan, Damascus, Syria",
        },
      ],
      partner: {
        id: 1,
        beneficiary_id: 1,
        first_name: "Amina",
        last_name: "Hassan",
        job: "Home-based seamstress",
        gender: { id: "female" },
        health_status: "Healthy",
      },
    },
    {
      id: 53,
      image_url: image,
      first_name: "محمد",
      last_name: "علي",
      birth_date: "1985-03-15",
      address: "Al-Midan, Damascus, Syria",
      case_description:
        "Struggles to provide for a family of 5 due to low income and health problems.",
      request_id: 42,
    },
  ];

  const isLoading = false;

  return { membershipRequests, isLoading };
}
