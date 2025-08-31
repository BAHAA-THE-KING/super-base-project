import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";

import { BTextField } from "../BTextField";
import { usePreferredLanguage } from "src/globals";

export type BDatePickerProps<TDate = any> = DatePickerProps<TDate>;

export function BDatePicker<TDate>({ ...props }: BDatePickerProps<TDate>) {
  const [lang] = usePreferredLanguage();
  return (
    <DatePicker
      {...props}
      localeText={
        lang === "ar"
          ? {
              // Calendar navigation
              previousMonth: "الشهر السابق",
              nextMonth: "الشهر التالي",
              openPreviousView: "عرض سابق",
              openNextView: "عرض تالي",
              calendarViewSwitchingButtonAriaLabel: (view: string) =>
                view === "year"
                  ? "تم فتح عرض السنة، انتقل إلى عرض التقويم"
                  : "تم فتح عرض التقويم، انتقل إلى عرض السنة",

              // Toolbar titles
              toolbarTitle: "اختر التاريخ",

              // Dialog / action buttons
              cancelButtonLabel: "إلغاء",
              clearButtonLabel: "مسح",
              okButtonLabel: "تأكيد",
              todayButtonLabel: "اليوم",

              // Open/close pickers
              openDatePickerDialogue: (value: TDate | null) =>
                value
                  ? `اختر التاريخ، التاريخ الحالي ${value}`
                  : "اختر التاريخ",
              openTimePickerDialogue: (value: TDate | null) =>
                value ? `اختر الوقت، الوقت الحالي ${value}` : "اختر الوقت",

              // Table labels
              timeTableLabel: "اختر الوقت",
              dateTableLabel: "اختر التاريخ",

              // Field placeholders
              fieldYearPlaceholder: () => "سنة",
              fieldMonthPlaceholder: () => "شهر",
              fieldDayPlaceholder: () => "يوم",
              fieldHoursPlaceholder: () => "ساعات",
              fieldMinutesPlaceholder: () => "دقائق",
              fieldSecondsPlaceholder: () => "ثواني",
              fieldMeridiemPlaceholder: () => "ص/م",

              // Field aria labels
              fieldClearLabel: "مسح القيمة",

              // Table aria labels
              calendarWeekNumberHeaderLabel: "رقم الأسبوع",
              calendarWeekNumberAriaLabelText: (weekNumber: number) =>
                `الأسبوع ${weekNumber}`,
            }
          : {}
      }
      slots={{
        ...(props?.slots ?? {}),
        textField: BTextField as any,
      }}
    />
  );
}
