import { getContent, getComponent, type Content } from "/lib/xp/portal";
import { assertIsDefined } from "/lib/myproject/utils";
import { render } from "/lib/freemarker";
import type { Article } from "/site/content-types";
import type { FreemarkerParams } from "./article-header.freemarker";
import type { Response, PartComponent } from "@enonic-types/core";

type PartArticleHeader = PartComponent<"no.item.starter:article-header">;

const view = resolve("./article-header.ftl");

export function get(): Response {
  const content = getContent<Content<Article>>();
  const part = getComponent<PartArticleHeader>();

  assertIsDefined(content);
  assertIsDefined(part);

  return {
    body: render<FreemarkerParams>(view, {
      displayName: content.displayName,
      intro: part.config.intro,
      body: content.data.body,
    }),
  };
}
