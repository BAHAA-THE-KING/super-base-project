import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  AddAPhoto as AddAPhotoIcon,
  Message as MessageIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

import { FormSlider } from "src/components";
import { BButton } from "src/components/Base";

export function Home() {
  const { control, handleSubmit } = useForm({ defaultValues: { asd: 0 } });
  return (
    <Box>
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
        rules={{}}
      />
      <BButton onClick={handleSubmit(console.log)}>click</BButton>
    </Box>
  );
}
