import { withNormalLayout } from "src/HOCs";
import { NotFound } from "./pages/NotFound";
import { AllBeneficiaries } from "./pages/BeneficiariesAll";
import { ShowBeneficiary } from "./pages/Beneficiary";

export const NotFoundPage = withNormalLayout(NotFound);
export const AllBeneficiariesPage = withNormalLayout(AllBeneficiaries);
export const ShowBeneficiaryPage = withNormalLayout(ShowBeneficiary);
