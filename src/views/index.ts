import { withNormalLayout } from "src/HOCs";
import { Buttons } from "./pages/Buttons";
import { Cards } from "./pages/Cards";
import { Inputs } from "./pages/Inputs";
import { Switches } from "./pages/Switches";
import { Radios } from "./pages/Radios";
import { NotFound } from "./pages/NotFound";
import { Table } from "./pages/Table";
import { Charts } from "./pages/Charts";

export const ButtonsPage = withNormalLayout(Buttons);
export const CardsPage = withNormalLayout(Cards);
export const InputsPage = withNormalLayout(Inputs);
export const SwitchesPage = withNormalLayout(Switches);
export const RadiosPage = withNormalLayout(Radios);
export const NotFoundPage = withNormalLayout(NotFound);
export const TablePage = withNormalLayout(Table);
export const ChartsPage = withNormalLayout(Charts);
