export type Route = Partial<{
  key: string;
  path: string;
  title: string;
  icon: React.FC;
  element: React.ReactElement;
  children: Route[];
  isDivider: boolean;
}>;
