import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormImage } from "src/components";

export function Home() {
  const { control } = useForm({ defaultValues: { asd: [] } });
  return (
    <Box>
      <FormImage control={control} label="" name="asd" />
    </Box>
  );
}
