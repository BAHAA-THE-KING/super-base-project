import { useLoading } from "src/globals";
import { useBeneficiaries } from "src/views/APIs";

import { BeneficiaryTable } from "src/types/data/BeneficiaryTable";

export function useData(filters: {}): {
  beneficiaries: BeneficiaryTable[];
} {
  const { getIndexedBeneficiaries } = useBeneficiaries();
  const { data: response } = getIndexedBeneficiaries(filters);

  const [_, setLoading] = useLoading();
  setLoading(response?.message === "wait");

  const beneficiaries: BeneficiaryTable[] =
    response?.data?.data?.map((e) => ({
      id: e.id,
      first_name: e.first_name,
      last_name: e.last_name,
      father_name: e.father_name,
      mother_name: e.mother_name,
      birth_date: e.birth_date.split("T")[0],
      birth_place: e.birth_place,
      national_number: e.national_number,
      job: e.job,
      phone_number: e.phone_number,
      // TODO: add missing field
      mobile_number: "",
      residence_type: e.residence_type,
      group_name: e.group.name,
      group_color: e.group.color,
      // TODO: add missing field
      family_members: 0,
      monthly_income: e.monthly_income,
      request_status: e.request_status,
    })) ?? [];

  return { beneficiaries };
}
