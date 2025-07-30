import { useMemo } from "react";
import { Grid2 } from "@mui/material";
import { Control, useFieldArray, useWatch } from "react-hook-form";

import { PartnerCard, ChildCard, AddCard } from "../..";

import { v4 as uuidv4 } from "uuid";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  control: Control<SingleBeneficiary>;
  isEditable: boolean;
};

export function FamilyInfo({ control, isEditable }: Props) {
  const { gender, id, children } = useWatch({ control });
  const { append, remove } = useFieldArray({
    control,
    name: "children",
  });
  const members = useMemo(
    () =>
      children!.sort(
        (e1, e2) =>
          new Date(e1?.birth_date ?? "").getTime() -
          new Date(e2?.birth_date ?? "").getTime()
      ),
    [children, children!.length, JSON.stringify(children)]
  );

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 4 }} display={"flex"} alignItems={"stretch"}>
        <PartnerCard
          control={control}
          beneficiaryGender={gender!}
          isEditable={isEditable}
        />
      </Grid2>
      {members.map((e, idx) => (
        <Grid2
          key={e.id}
          size={{ xs: 12, md: 4 }}
          display={"flex"}
          alignItems={"stretch"}
        >
          <ChildCard
            child={e}
            control={control}
            isEditable={isEditable}
            idx={idx}
            remove={remove}
          />
        </Grid2>
      ))}
      {isEditable && (
        <Grid2 size={{ xs: 12, md: 4 }} display={"flex"} alignItems={"stretch"}>
          <AddCard
            onAdd={() =>
              append({
                beneficiary_id: Number(id),
                birth_date: "",
                gender: "",
                id: uuidv4(),
                is_alive: true,
                name: "",
                partner_name: "",
                residence_place: "",
              })
            }
          />
        </Grid2>
      )}
    </Grid2>
  );
}
