import { getSite, type Content, type Site } from "/lib/xp/portal";

const DEFAULT_LOCALE = "no";

export function getLocale({ content, site }: GetLocaleParams): string {
  const language = content?.language ?? site?.language ?? getSite()?.language ?? DEFAULT_LOCALE;

  return language.replace("_", "-");
}

type GetLocaleParams = {
  content?: Content<unknown>;
  site?: Site<XP.SiteConfig>;
};
