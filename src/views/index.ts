import { withNormalLayout } from "src/HOCs";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export const HomePage = withNormalLayout(Home);
export const NotFoundPage = withNormalLayout(NotFound);
