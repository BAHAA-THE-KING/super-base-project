import { useBeneficiaries } from "src/views/APIs";
import { useLoading } from "src/globals";

import { Group, SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { useMemo } from "react";
import { Aid } from "src/types/data/Aid";
import { useGroup } from "src/views/APIs/useGroup";

export function useData(id: number) {
  const { getSingleBeneficiary } = useBeneficiaries();
  const { data: beneficiaryResponse } = getSingleBeneficiary(id);

  const responseData = beneficiaryResponse?.data;

  const beneficiary: SingleBeneficiary | null = responseData
    ? {
        id: responseData.id,
        // TODO: add missing field
        image_url: "",
        first_name: responseData.first_name,
        last_name: responseData.last_name,
        father_name: responseData.father_name,
        mother_name: responseData.mother_name,
        birth_date: responseData.birth_date,
        birth_place: responseData.birth_place,
        national_number: responseData.national_number,
        // TODO: add missing field
        gender: { id: "male" },
        job: responseData.job,
        health_status: responseData.health_status,
        phone_number: responseData.phone_number,
        // TODO: add missing field
        mobile_number: "",
        address: responseData.address,
        residence_type: { id: responseData.residence_type },
        // TODO: add missing field
        residence_document_id: 0,
        children: responseData.children.map((e) => ({
          id: e.id,
          beneficiary_id: responseData.id,
          name: e.name,
          birth_date: e.birth_date,
          gender: { id: e.gender },
          is_alive: e.is_alive,
          partner_name: e.partner_name,
          residence_place: e.residence_place,
        })),
        uncles: responseData.uncles.map((e) => ({
          id: e.id,
          beneficiary_id: responseData.id,
          from: { id: e.from },
          first_name: e.first_name,
          last_name: e.last_name,
          job: e.job,
          provided_aid: e.provided_aid,
        })),
        // TODO: add missing field
        partner: {
          id: 0,
          beneficiary_id: 0,
          first_name: "",
          last_name: "",
          job: "",
          gender: { id: "male" },
          health_status: "",
        },
        group: {
          id: responseData.group.id,
          name: responseData.group.color,
          salary: responseData.group.salary.toString(),
          color: responseData.group.color,
          // TODO: add missing field
          group_conditions: [],
        },
        monthly_income: responseData.monthly_income,
        case_description: responseData.case_description,
        // TODO: add missing field
        request_id: 0,
        request_status: responseData.request_status,
      }
    : null;

  const { showGroups } = useGroup();
  const { data: groupResponse } = showGroups();

  const groups: Group[] =
    groupResponse?.data?.map((e) => ({
      id: e.id,
      name: e.name,
      salary: e.salary.toString(),
      color: e.color,
      // TODO: need to be filled
      group_conditions:
        e?.conditions?.map((ee) => ({
          id: ee.id,
          params: ee.params,
          // TODO: need to be filled
          condition: {
            id: 0,
            name: "",
          },
          // TODO: need to be filled
          is_satisfied: true,
        })) ?? [],
    })) ?? [];

  const [_, setLoading] = useLoading();
  setLoading(beneficiaryResponse?.message === "wait");

  return { beneficiary, groups };
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

export function useRequestsData(beneficiary_id: number) {
  const requests: Request[] = useMemo(
    () => [
      {
        id: 1,
        beneficiary_id: 1,
        type: "emergency aids",
        reason: "فقدان مصدر الدخل بعد الزلزال",
        status: "accepted",
        accepted_at: "2025-04-07",
        is_collected: true,
        collection_date: "2025-04-13",
        recipient_name: "عمر يوسف",
        urgency_level: "high",
        requested_amount: 300000,
        accepted_amount: 250000,
        expiry_date: "2025-05-05",
        created_at: "2025-04-01",
      },
      {
        id: 2,
        beneficiary_id: 1,
        type: "special materials",
        reason: "الحاجة إلى كرسي متحرك جديد",
        status: "pending",
        is_collected: false,
        urgency_level: "medium",
        requested_item_id: 23,
        requested_item_name: "كرسي متحرك",
        accepted_item_id: 23,
        accepted_item_name: "كرسي متحرك",
        created_at: "2025-04-12",
      },
      {
        id: 3,
        beneficiary_id: 1,
        type: "prescription exchange",
        reason: "استبدال الأدوية القديمة",
        status: "accepted",
        accepted_at: "2025-04-18",
        is_collected: true,
        collection_date: "2025-04-24",
        recipient_name: "علي حسن",
        urgency_level: "low",
        what_exchanged: "أدوية الضغط والسكري",
        expiry_date: "2025-06-05",
        created_at: "2025-04-17",
      },
      {
        id: 4,
        beneficiary_id: 1,
        type: "emergency aids",
        reason: "نقص حاد في المواد الغذائية",
        is_collected: false,
        status: "pending",
        urgency_level: "high",
        requested_amount: 150000,
        created_at: "2025-04-23",
      },
      {
        id: 5,
        beneficiary_id: 1,
        type: "special materials",
        reason: "الحصول على سماعة أذن",
        status: "accepted",
        accepted_at: "2025-04-27",
        is_collected: false,
        urgency_level: "medium",
        requested_item_id: 31,
        requested_item_name: "سماعة طبية",
        accepted_item_id: 31,
        accepted_item_name: "سماعة طبية",
        expiry_date: "2025-08-06",
        created_at: "2025-04-26",
      },
      {
        id: 6,
        beneficiary_id: 1,
        type: "prescription exchange",
        reason: "وصفة جديدة لأدوية القلب",
        status: "rejected",
        rejection_reason: "نقص في المستندات المطلوبة",
        is_collected: false,
        urgency_level: "medium",
        created_at: "2025-05-02",
        rejected_at: "2025-05-03",
      },
      {
        id: 7,
        beneficiary_id: 1,
        type: "emergency aids",
        reason: "حالة طبية طارئة لابن المستفيد",
        status: "accepted",
        accepted_at: "2025-05-07",
        is_collected: true,
        collection_date: "2025-05-13",
        recipient_name: "ليلى يوسف",
        urgency_level: "high",
        requested_amount: 500000,
        accepted_amount: 400000,
        expiry_date: "2025-05-25",
        created_at: "2025-05-06",
      },
      {
        id: 8,
        beneficiary_id: 1,
        type: "special materials",
        reason: "حاجة إلى معدات طبية منزلية",
        status: "accepted",
        accepted_at: "2025-05-12",
        is_collected: true,
        collection_date: "2025-05-18",
        recipient_name: "إبراهيم العلي",
        urgency_level: "low",
        requested_item_id: 45,
        requested_item_name: "جهاز قياس ضغط رقمي",
        accepted_item_id: 54,
        accepted_item_name: "جهاز قياس ضغط يدوي",
        expiry_date: "2025-10-15",
        created_at: "2025-05-11",
      },
      {
        id: 9,
        beneficiary_id: 1,
        type: "prescription exchange",
        reason: "استبدال وصفة دوائية منتهية",
        status: "accepted",
        is_collected: true,
        collection_date: "2025-05-23",
        accepted_at: "2025-05-17",
        recipient_name: "سحر عيسى",
        urgency_level: "medium",
        what_exchanged: "علاج للربو",
        created_at: "2025-05-16",
        expiry_date: "2025-06-15",
      },
      {
        id: 10,
        beneficiary_id: 1,
        type: "emergency aids",
        reason: "انقطاع دخل الأسرة بعد إصابة المعيل",
        status: "accepted",
        accepted_at: "2025-05-22",
        is_collected: false,
        urgency_level: "high",
        requested_amount: 400000,
        accepted_amount: 350000,
        expiry_date: "2025-07-05",
        created_at: "2025-05-21",
      },
    ],
    []
  );

  return { isLoading: false, requests };
}
