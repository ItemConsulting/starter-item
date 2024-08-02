import { getContent, getSite, getSiteConfig, pageUrl, imageUrl, type Content } from "/lib/xp/portal";
import { getMenuTree } from "/lib/menu";
import { render } from "/lib/tineikt/freemarker";
import { forceArray } from "/lib/myproject/arrays";
import { assertIsDefined } from "/lib/myproject/utils";
import type { Default } from ".";
import type { PageComponent } from "@enonic-types/core";
import type { FreemarkerParams } from "./default.freemarker";
import { getLocale } from "/lib/myproject/locale";

type DefaultPage = PageComponent<"no.item.starter:default", Default>;

const view = resolve("default.ftl");

export function all(): XP.Response {
  const content = getContent<Content<unknown, string, DefaultPage>>();
  const site = getSite<XP.SiteConfig>();
  const siteConfig = getSiteConfig<XP.SiteConfig>();

  assertIsDefined(content);
  assertIsDefined(site);
  assertIsDefined(siteConfig);

  const locale = getLocale({ content, site });

  return {
    status: 200,
    body: render<FreemarkerParams>(view, {
      displayName: content.displayName,
      themeColor: "#8812e2",
      headerRegion: content.page?.regions?.header,
      mainRegion: content.page?.regions?.main,
      asideRegion: content.page?.regions?.aside,
      footerColumns: forceArray(siteConfig.footerColumns),
      locale,
      contentTypeClass: `content-type-${content.type.split(":")[1]}`,
      headerMenu: getMenuTree(2),
      homeUrl: pageUrl({
        path: site._path,
      }),
      logoUrl: siteConfig.logoId
        ? imageUrl({
            id: siteConfig.logoId,
            scale: "width(150)",
          })
        : undefined,
      showWithAside: content.page?.config.showWithAside ?? true,
    }),
  };
}
