import { useCallback, useMemo, useState } from "react";

import { useSecretaries } from "../APIs";

import { jsonToFormdata } from "src/utils";

import { SecretaryType } from "src/types/data/Secretary";
import { useBaseTranslation } from "src/hooks";

const i18ns = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export function useSecretaryData(id: number) {
  const [
    SundayText,
    MondayText,
    TuesdayText,
    WednesdayText,
    ThursdayText,
    FridayText,
    SaturdayText,
  ] = useBaseTranslation(i18ns);
  const getDayByNumber = useCallback((day: number): string => {
    const days = [
      SundayText,
      MondayText,
      TuesdayText,
      WednesdayText,
      ThursdayText,
      FridayText,
      SaturdayText,
    ];
    return days[day];
  }, []);

  const {
    createSecretary: createSecretaryAPI,
    updateSecretary: updateSecretaryAPI,
    getSecretary,
    deleteSecretary: deleteSecretaryAPI,
  } = useSecretaries();
  const { data: secretariesResponse } = getSecretary(id);

  const secretaryData = secretariesResponse?.data;

  const secretary: SecretaryType | null = useMemo(
    () =>
      secretaryData
        ? {
            id: secretaryData.id,
            name: secretaryData.name,
            address: secretaryData.address,
            birth_date: secretaryData.birth_date,
            birth_place: secretaryData.birth_place,
            mobile: secretaryData.phone,
            salary: secretaryData.salary.toString(),
          }
        : null,
    [secretaryData]
  );

  const getSecretaryLoading = secretariesResponse?.message === "wait";
  const [createSecretaryLoading, setCreateSecretaryLoading] = useState(false);
  const [updateSecretaryLoading, setUpdateSecretaryLoading] = useState(false);
  const [deleteSecretaryLoading, setDeleteSecretaryLoading] = useState(false);

  const createSecretary = (data: SecretaryType) => {
    setCreateSecretaryLoading(true);
    return createSecretaryAPI({
      data: jsonToFormdata({
        name: data.name,
        address: data.address,
        birth_date: data.birth_date,
        birth_place: data.birth_place,
        phone: data.mobile,
        salary: Number(data.salary),
      }),
    }).finally(() => setCreateSecretaryLoading(false));
  };
  const updateSecretary = (data: SecretaryType, id: number) => {
    setUpdateSecretaryLoading(true);
    return updateSecretaryAPI({
      data: jsonToFormdata({
        name: data.name,
        address: data.address,
        birth_date: data.birth_date,
        birth_place: data.birth_place,
        phone: data.mobile,
        salary: Number(data.salary),
      }),
      params: { id },
    }).finally(() => setUpdateSecretaryLoading(false));
  };
  const deleteSecretary = (id: number) => {
    setDeleteSecretaryLoading(true);
    return deleteSecretaryAPI({ id }).finally(() =>
      setDeleteSecretaryLoading(false)
    );
  };

  return {
    secretary,
    getSecretaryLoading,
    createSecretary,
    updateSecretary,
    deleteSecretary,
    createSecretaryLoading,
    updateSecretaryLoading,
    deleteSecretaryLoading,
  };
}
