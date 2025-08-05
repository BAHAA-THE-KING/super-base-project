import { Box } from "@mui/material";

import { BButton, BTypography } from "src/components/Base";
import { Popup } from "src/components";

import { useBaseTranslation } from "src/hooks";

type Props = {
  group: {
    id: number;
    name: string;
    number_of_beneficiaries: number;
    percent_of_beneficiaries: number;
  } | null;
  deleteGroupLoading: boolean;
  handleDelete: () => void;
  close: () => void;
};

const i18ns = [
  "you_sure_to_delete_group",
  "about",
  "beneficiary_will_be_without_group",
  "yes_delete_it",
];
export function GroupDeletePopup({
  group,
  deleteGroupLoading,
  handleDelete,
  close,
}: Props) {
  const [
    YouSureDoDeleteGroupText,
    AboutText,
    BeneficiaryWillBeWithoutGroupText,
    YesDeleteItText,
  ] = useBaseTranslation(i18ns);
  return (
    <Popup open={Boolean(group)} close={close}>
      <BTypography variant="h5">{YouSureDoDeleteGroupText}</BTypography>
      <BTypography fontSize={"large"} mt={3}>
        {group?.name}
      </BTypography>
      <BTypography>
        {AboutText} {group?.number_of_beneficiaries}{" "}
        {BeneficiaryWillBeWithoutGroupText}.
      </BTypography>
      <Box mt={5}>
        <BButton
          variant="contained"
          color="error"
          onClick={handleDelete}
          loading={deleteGroupLoading}
        >
          {YesDeleteItText}
        </BButton>
      </Box>
    </Popup>
  );
}
