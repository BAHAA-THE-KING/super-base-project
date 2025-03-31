import { Box, RadioGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  AddAPhoto as AddAPhotoIcon,
  Message as MessageIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

import {
  FormCheckbox,
  FormInput,
  FormMultiSelect,
  FormSelect,
  FormSlider,
} from "src/components";
import { BButton } from "src/components/Base";
import { FormRadio } from "src/components";

export function Home() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      asd: 0,
      dsa1: false,
      dsa2: false,
      lolo: "op1",
      txttt: "",
      choose: { id: 0, name: "" },
      mul: [],
    },
  });
  return (
    <Box>
      <FormInput control={control} label="text" name="txttt" />
      <FormSelect
        control={control}
        label="chosososose"
        name="choose"
        options={[
          { id: 1, name: "op1" },
          { id: 5, name: "opko" },
          { id: 57, name: "oplplp" },
          { id: 3, name: "opasd" },
        ]}
      />
      <FormMultiSelect
        control={control}
        label="mulmulmul"
        name="mul"
        options={[
          { id: 1, name: "op1" },
          { id: 5, name: "opko" },
          { id: 57, name: "oplplp" },
          { id: 3, name: "opasd" },
        ]}
      />
      <FormCheckbox control={control} label="kokoko1" name="dsa1" />
      <FormCheckbox control={control} label="kokoko2" name="dsa2" />
      <RadioGroup>
        <FormRadio control={control} label="opop1" name="lolo" option="op1" />
        <FormRadio control={control} label="opop2" name="lolo" option="op2" />
      </RadioGroup>
      <FormSlider
        control={control}
        label="كوكو"
        name="asd"
        min={100}
        max={1000}
        step={100}
        marks={[
          {
            value: 200,
            label: <AddAPhotoIcon />,
          },
          {
            value: 500,
            label: "hi man",
          },
          {
            value: 700,
            label: <MessageIcon />,
          },
          {
            value: 900,
            label: <PeopleIcon />,
          },
        ]}
      />
      <BButton onClick={handleSubmit(console.log)}>click</BButton>
    </Box>
  );
}
