import { useMemo, useState } from "react";

import { useBeneficiaries } from "src/views/APIs";

import { jsonToFormdata } from "src/utils";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

export function useBeneficiaryData(id: number) {
  const { getSingleBeneficiary, addBeneficiary } = useBeneficiaries();
  const { data: beneficiaryResponse } = getSingleBeneficiary(id);

  const responseData = beneficiaryResponse?.data;

  const beneficiary = useMemo(
    () =>
      responseData
        ? ({
            id: responseData.id,
            image_url: responseData.personalImage.file,
            first_name: responseData.first_name,
            last_name: responseData.last_name,
            father_name: responseData.father_name,
            mother_name: responseData.mother_name,
            birth_date: responseData.birth_date.split("T")[0],
            birth_place: responseData.birth_place,
            national_number: responseData.national_number,
            gender: responseData.gender,
            job: responseData.job,
            health_status: responseData.health_status,
            phone_number: responseData.phone_number,
            mobile_number: responseData.mobile_number,
            address: responseData.address,
            residence_type: responseData.residence_type,
            residence_document_url: [responseData.residenceDocument.file],
            children: responseData.children.map((e) => ({
              id: e.id,
              beneficiary_id: responseData.id,
              name: e.name,
              birth_date: e.birth_date.split("T")[0],
              gender: e.gender,
              is_alive: e.is_alive,
              partner_name: e.partner_name,
              residence_place: e.residence_place,
            })),
            uncles: responseData.uncles.map((e) => ({
              id: e.id,
              beneficiary_id: responseData.id,
              from: e.from,
              first_name: e.first_name,
              last_name: e.last_name,
              job: e.job,
              provided_aid: e.provided_aid,
            })),
            partner: {
              id: responseData.partners[0]?.id ?? "",
              beneficiary_id: responseData.id,
              first_name: responseData.partners[0]?.first_name ?? "",
              last_name: responseData.partners[0]?.last_name ?? "",
              job: responseData.partners[0]?.job ?? "",
              gender: responseData.partners[0]?.gender ?? "",
              health_status: responseData.partners[0]?.health_status ?? "",
            },
            group: {
              id: responseData.group.id,
              name: responseData.group.name,
              salary: responseData.group.salary.toString(),
              color: responseData.group.color,
              group_conditions: responseData.group.conditions.map((e) => ({
                id: e.id,
                condition: {
                  id: e.id,
                  name: e.name,
                },
                params: e.param,
              })),
            },
            monthly_income: responseData.monthly_income,
            case_description: responseData.case_description,
            request_id: responseData.request_id,
            request_status: responseData.request_status,
            history: responseData.beneficiaryHistories.map((e) => ({
              id: e.id,
              type: e.type,
              record: e.record,
              created_at: new Date(e.created_at)
                .toISOString()
                .slice(0, 16)
                .replace("T", ", "),
            })),
          } as SingleBeneficiary)
        : null,
    [responseData]
  );

  const [createBeneficiaryLoading, setCreateBeneficiaryLoading] =
    useState(false);

  const createBeneficiary = (b: SingleBeneficiary) => {
    setCreateBeneficiaryLoading(true);
    return addBeneficiary({
      data: jsonToFormdata({
        first_name: b.first_name,
        last_name: b.last_name,
        father_name: b.father_name,
        mother_name: b.mother_name,
        birth_date: b.birth_date,
        birth_place: b.birth_place,
        national_number: b.national_number,
        gender: b.gender,
        job: b.job,
        health_status: b.health_status,
        phone_number: b.phone_number,
        mobile_number: b.mobile_number,
        address: b.address,
        residence_type: b.residence_type,
        "residence_document[file]": b.residence_document_url[0],
        "personal_image[file]": b.image_url,
        monthly_income: b.monthly_income,
        case_description: b.case_description,
        partners: [
          {
            first_name: b.partner.first_name,
            last_name: b.partner.last_name,
            gender: b.gender === "female" ? "male" : "female",
            job: b.partner.job,
            health_status: b.partner.health_status,
          },
        ],
        children: b.children.map((e) => ({
          name: e.name,
          gender: e.gender,
          is_alive: Number(e.is_alive) as 0 | 1,
          partner_name: e.gender === "female" ? e.partner_name : "",
          residence_place: e.residence_place,
          birth_date: e.birth_date,
        })),
        uncles: b.uncles.map((e) => ({
          first_name: e.first_name,
          last_name: e.last_name,
          from: e.from,
          job: e.job,
          provided_aid: e.provided_aid,
        })),
      }),
    }).finally(() => setCreateBeneficiaryLoading(false));
  };

  const getBeneficiaryLoading = beneficiaryResponse?.message === "wait";

  return {
    beneficiary,
    createBeneficiary,
    getBeneficiaryLoading,
    createBeneficiaryLoading,
  };
}
