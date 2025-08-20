import { useState } from "react";
import { Employee } from "src/types/data/Employee";

export function useShowEmployeeData(employeeId: number = 0) {
  const employee: Employee = {
    id: employeeId,
    first_name: "Jane",
    last_name: "Smith",
    father_name: "Arthur Smith",
    national_number: "0987654321",
    birth_date: "1990-03-22",
    birth_place: "Los Angeles",
    joined_at: "2015-01-20",
    is_active: "true",
    salary: 82000,
    history: [
      {
        id: 1,
        type: "Collect from mosques",
        icon: "mosque",
        date: "2023-10-25",
        description:
          "Collected funds from local mosques in the community for a charitable project.",
        expenses: 0,
        gain: 50000,
        composition: 500,
      },
      {
        id: 2,
        type: "Pay electricity bill",
        icon: "bill",
        date: "2023-10-26",
        description:
          "Paid the monthly electricity bill for the office building.",
        expenses: 1250,
        gain: 0,
        composition: 0,
      },
      {
        id: 3,
        type: "Make donation book",
        icon: "donation_book",
        date: "2023-10-27",
        description:
          "Created and printed new donation books for an upcoming fundraising campaign.",
        expenses: 2500,
        gain: 0,
        composition: 0,
      },
      {
        id: 4,
        type: "Collect from mosques",
        icon: "mosque",
        date: "2023-11-05",
        description: "Received a large donation from the Central City Mosque.",
        expenses: 0,
        gain: 75000,
        composition: 750,
      },
      {
        id: 5,
        type: "Pay water bill",
        icon: "bill",
        date: "2023-11-10",
        description:
          "Settled the quarterly water bill for the main headquarters.",
        expenses: 850,
        gain: 0,
        composition: 0,
      },
      {
        id: 6,
        type: "Purchase office supplies",
        icon: "other",
        date: "2023-11-15",
        description:
          "Bought new paper, pens, and printer ink for all departments.",
        expenses: 750,
        gain: 0,
        composition: 0,
      },
      {
        id: 7,
        type: "Make donation book",
        icon: "donation_book",
        date: "2023-11-20",
        description:
          "Completed a small batch of donation books for the new branch office.",
        expenses: 1200,
        gain: 0,
        composition: 0,
      },
      {
        id: 8,
        type: "Collect from mosques",
        icon: "mosque",
        date: "2023-11-25",
        description:
          "Collected additional funds from smaller mosques in the suburban area.",
        expenses: 0,
        gain: 25000,
        composition: 250,
      },
      {
        id: 9,
        type: "Pay internet bill",
        icon: "bill",
        date: "2023-12-01",
        description:
          "Paid the bill for internet services for the month of December.",
        expenses: 500,
        gain: 0,
        composition: 0,
      },
      {
        id: 10,
        type: "Organize charity event",
        icon: "event",
        date: "2023-12-05",
        description:
          "Prepared a budget and secured a venue for the annual charity gala.",
        expenses: 10000,
        gain: 0,
        composition: 0,
      },
      {
        id: 11,
        type: "Collect from schools",
        icon: "other",
        date: "2023-12-10",
        description: "Received donations from a school fundraiser.",
        expenses: 0,
        gain: 15000,
        composition: 150,
      },
      {
        id: 12,
        type: "Make donation book",
        icon: "donation_book",
        date: "2023-12-15",
        description:
          "Designed and ordered a new series of personalized donation books.",
        expenses: 4000,
        gain: 0,
        composition: 0,
      },
      {
        id: 13,
        type: "Pay staff salaries",
        icon: "other",
        date: "2023-12-20",
        description:
          "Processed and paid the salaries for all staff members for the month.",
        expenses: 250000,
        gain: 0,
        composition: 0,
      },
      {
        id: 14,
        type: "Collect from mosques",
        icon: "mosque",
        date: "2023-12-25",
        description: "Collected end-of-year donations from multiple mosques.",
        expenses: 0,
        gain: 120000,
        composition: 1200,
      },
      {
        id: 15,
        type: "Office rent",
        icon: "bill",
        date: "2023-12-30",
        description: "Paid the monthly rent for the primary office space.",
        expenses: 15000,
        gain: 0,
        composition: 0,
      },
      {
        id: 16,
        type: "Collect from events",
        icon: "event",
        date: "2024-01-05",
        description:
          "Collected ticket sales and donations from the charity gala.",
        expenses: 0,
        gain: 85000,
        composition: 850,
      },
      {
        id: 17,
        type: "Pay electricity bill",
        icon: "bill",
        date: "2024-01-26",
        description: "Settled the electricity bill for January.",
        expenses: 1300,
        gain: 0,
        composition: 0,
      },
      {
        id: 18,
        type: "Purchase equipment",
        icon: "other",
        date: "2024-02-01",
        description:
          "Acquired new computer equipment for the accounting department.",
        expenses: 25000,
        gain: 0,
        composition: 0,
      },
      {
        id: 19,
        type: "Collect from mosques",
        icon: "mosque",
        date: "2024-02-15",
        description:
          "A special collection from several mosques for a new humanitarian aid project.",
        expenses: 0,
        gain: 65000,
        composition: 650,
      },
      {
        id: 20,
        type: "Make donation book",
        icon: "donation_book",
        date: "2024-02-20",
        description:
          "Designed a new, more modern-looking donation book with improved tracking.",
        expenses: 3000,
        gain: 0,
        composition: 0,
      },
    ],
  };
  const createEmployee = (data: any) => ({ data: employee });
  const updateEmployee = (data: any) => {};
  const getEmployeeLoading = false;

  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  const createNewTask = (data: {
    employee_id: number;
    date: string;
    from: string;
    to: string;
    got_money: number;
    person_id: number;
  }) => {};

  return {
    employee,
    createEmployee,
    updateEmployee,
    getEmployeeLoading,
    createNewTask,
    createTaskLoading,
  };
}
