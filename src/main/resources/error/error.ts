import { getSite, getSiteConfig, imageUrl, pageUrl, processHtml } from "/lib/xp/portal";
import { render } from "/lib/tineikt/freemarker";
import { forceArray } from "/lib/myproject/arrays";
import { localize } from "/lib/xp/i18n";
import { getMenuTree } from "/lib/menu";
import type { MenuTree } from "/lib/menu";

const view = resolve("error.ftl");

export function handleError(err: XP.ErrorRequest): XP.Response | undefined {
  const site = getSite<XP.SiteConfig>();
  const siteConfig = getSiteConfig<XP.SiteConfig>();

  if (!site || !siteConfig) {
    return {
      status: err.status,
      body: err.exception,
    };
  }

  const locale = site.language ?? "no";
  const freemarkerParams: FreemarkerParams = {
    locale,
    title: siteConfig.errorTitle,
    imageSrc: siteConfig.errorImage
      ? imageUrl({
          id: siteConfig.errorImage,
          scale: "width(390)",
        })
      : undefined,

    message1: localize({
      key: `error.message.${err.status}`,
      locale,
    }),
    message2: siteConfig.errorMessage ? processHtml({ value: siteConfig.errorMessage }) : undefined,
    debugMessage: err.request.mode !== "live" && err.message ? formatFreemarkerMessage(err.message) : undefined,
    footerColumns: forceArray(siteConfig.footerColumns),
    headerMenu: getMenuTree(2),
    homeUrl: pageUrl({
      path: site._path,
    }),
  };

  return {
    status: err.status,
    postProcess: true,
    body: render<FreemarkerParams>(view, freemarkerParams),
  };
}

function formatFreemarkerMessage(message: string) {
  return message.replace(/----\sTip:/, `<details><summary>Tip</summary>`).replace("----", `</details>`);
}

interface FreemarkerParams {
  title?: string;
  imageSrc?: string;
  locale: string;
  footerColumns: Array<string>;
  message1: string;
  message2?: string;
  debugMessage?: string;
  homeUrl: string;
  headerMenu: MenuTree;
}
