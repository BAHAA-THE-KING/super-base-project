export type Route =
  | {
      key: string;
      path: string;
      title: string;
      icon: React.FC;
      component: React.FC;
    }
  | {
      key: string;
      title: string;
      icon: React.FC;
      children: Route[];
    }
  | {
      key: string;
      isDivider: true;
    };
