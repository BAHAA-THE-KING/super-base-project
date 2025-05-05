import { withNormalLayout } from "src/HOCs";
import { NotFound } from "./pages/NotFound";
import { AllBeneficiaries } from "./pages/BeneficiariesAll";
import { ShowBeneficiary } from "./pages/Beneficiary";
import { ShowBeneficiaryRequests } from "./pages/BeneficiaryRequests";
import { AddRequest } from "./pages/RequestAdd";
import { Groups } from "./pages/Groups";

export const NotFoundPage = withNormalLayout(NotFound);
export const AllBeneficiariesPage = withNormalLayout(AllBeneficiaries);
export const ShowBeneficiaryPage = withNormalLayout(ShowBeneficiary);
export const ShowBeneficiaryRequestsPage = withNormalLayout(ShowBeneficiaryRequests);
export const AddRequestPage = withNormalLayout(AddRequest);
export const GroupsPage = withNormalLayout(Groups);
