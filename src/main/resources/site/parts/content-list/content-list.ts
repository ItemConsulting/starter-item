import { getContent, type Content, pageUrl } from "/lib/xp/portal";
import { assertIsDefined } from "/lib/myproject/utils";
import { render } from "/lib/tineikt/freemarker";
import { getChildren } from "/lib/xp/content";
import type { FreemarkerParams, SimpleChild } from "./content-list.freemarker";

const view = resolve("./content-list.ftl");

export function get(): XP.Response {
  const content = getContent<Content<{ intro?: string }>>();

  assertIsDefined(content);

  const res = getChildren({
    key: content._path,
    start: 0,
    count: 100,
    sort: content.childOrder ?? "displayName DESC",
  });

  return {
    body: render<FreemarkerParams>(view, {
      displayName: content.displayName,
      children: res.hits.map(getSimpleChildren),
    }),
  };
}

function getSimpleChildren(content: Content<unknown>): SimpleChild {
  return {
    displayName: content.displayName,
    url: pageUrl({
      path: content._path,
    }),
  };
}
