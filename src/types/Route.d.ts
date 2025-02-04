export type Route = Partial<{
  key: string;
  path: string;
  title: string;
  icon: React.FC;
  component: React.ReactElement;
  children: Route[];
  isDivider: boolean;
}>;
