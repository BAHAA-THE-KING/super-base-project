import { withNormalLayout } from "src/HOCs";
import { NotFound } from "./pages/NotFound";
import { AllBeneficiaries } from "./pages/BeneficiariesAll";

export const NotFoundPage = withNormalLayout(NotFound);
export const AllBeneficiariesPage = withNormalLayout(AllBeneficiaries);
