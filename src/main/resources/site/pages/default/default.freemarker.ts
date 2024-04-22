import type { Region } from "@enonic-types/core";
import type { MenuTree } from "@item-enonic-types/lib-menu";

export type FreemarkerParams = {
  locale: string;
  contentTypeClass: string;
  displayName: string;
  themeColor: string;
  headerRegion?: Region;
  mainRegion?: Region;
  asideRegion?: Region;
  footerColumns: Array<string>;
  homeUrl: string;
  logoUrl?: string;
  headerMenu: MenuTree;
  showWithAside: boolean;
};
