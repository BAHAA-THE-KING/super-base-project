import { withNormalLayout } from "src/HOCs";
import { Buttons } from "./pages/Buttons";
import { Cards } from "./pages/Cards";
import { NotFound } from "./pages/NotFound";
import { Table } from "./pages/Table";
import { Charts } from "./pages/Charts";

export const ButtonsPage = withNormalLayout(Buttons);
export const CardsPage = withNormalLayout(Cards);
export const NotFoundPage = withNormalLayout(NotFound);
export const TablePage = withNormalLayout(Table);
export const ChartsPage = withNormalLayout(Charts);
