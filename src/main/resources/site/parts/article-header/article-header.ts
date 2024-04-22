import { getContent, type Content } from "/lib/xp/portal";
import { assertIsDefined } from "/lib/myproject/utils";
import { render } from "/lib/tineikt/freemarker";
import { getSimple } from "/site/mixins/media/media";
import type { FreemarkerParams } from "./article-header.freemarker";
import type { Article } from "/site/content-types";

const view = resolve("./article-header.ftl");

export function get(): XP.Response {
  const content = getContent<Content<Article>>();

  assertIsDefined(content);

  return {
    body: render<FreemarkerParams>(view, {
      displayName: content.displayName,
      intro: content.data.intro,
      media: getSimple(content.data.media, {
        scale: "block(1170, 400)",
      }),
    }),
  };
}
