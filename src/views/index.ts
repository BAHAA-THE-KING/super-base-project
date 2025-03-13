import { withNormalLayout } from "src/HOCs";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Table } from "./pages/Table";

export const HomePage = withNormalLayout(Home);
export const NotFoundPage = withNormalLayout(NotFound);
export const TablePage = withNormalLayout(Table);
