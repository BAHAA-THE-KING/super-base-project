import React from "react";
import { Grid2 } from "@mui/material";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { SupporterCard } from "../../SupporterCard";
import { AddCard } from "../../AddCard";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  control: Control<SingleBeneficiary>;
  isEditable: boolean;
};

export function SupportersInfo({ control, isEditable }: Props) {
  const { id } = useWatch({ control });
  const { append, fields: uncles } = useFieldArray({ control, name: "uncles" });
  return (
    <Grid2 container spacing={3}>
      {uncles?.map((uncle, idx) => (
        <React.Fragment key={uncle.id}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <SupporterCard
              control={control}
              isEditable={isEditable}
              idx={idx}
            />
          </Grid2>
        </React.Fragment>
      ))}
      {isEditable && (
        <Grid2 size={{ xs: 12, md: 4 }} display={"flex"} alignItems={"stretch"}>
          <AddCard
            onAdd={() =>
              append({
                beneficiary_id: id!,
                first_name: "",
                from: "",
                id: uuidv4(),
                job: "",
                last_name: "",
                provided_aid: "",
              })
            }
          />
        </Grid2>
      )}
    </Grid2>
  );
}
