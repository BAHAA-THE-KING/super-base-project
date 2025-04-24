import { useMemo } from "react";

import image from "./image.png";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { Aid } from "src/types/data/Aid";
import { Request } from "src/types/data/Request";

export function useData(id: number) {
  return useMemo<SingleBeneficiary>(
    () => ({
      id,
      image_url: image,
      first_name: "عمر",
      last_name: "يوسف",
      father_name: "علي",
      mother_name: "فاطمة",
      birth_date: "1985-03-15",
      birth_place: "دمشق",
      national_number: "198503150001",
      gender: "male",
      job: "كهربائي",
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
        name: "الفئة 5",
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
