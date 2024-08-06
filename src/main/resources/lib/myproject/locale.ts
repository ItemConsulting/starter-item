import { getSite, type Content, type Site } from "/lib/xp/portal";

const LOCALE_DEFAULT = "no";

export function getLocale({ content, site }: GetLocaleParams): string {
  const language = content?.language ?? site?.language ?? getSite()?.language ?? LOCALE_DEFAULT;

  return language.replace("_", "-");
}

type GetLocaleParams = {
  content?: Content<unknown>;
  site?: Site<XP.SiteConfig>;
};
