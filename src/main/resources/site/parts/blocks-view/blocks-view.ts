import { getContent, getComponent, getSite, type Content } from "/lib/xp/portal";
import { render } from "/lib/tineikt/freemarker";
import { assertIsDefined } from "/lib/myproject/utils";
import { forceArray } from "/lib/myproject/arrays";
import { process } from "/site/mixins/blocks/blocks";
import type { BlocksView } from ".";
import type { Blocks as BlocksMixin } from "/site/mixins/blocks";
import type { PartComponent } from "@enonic-types/core";
import type { FreemarkerParams } from "/site/parts/blocks-view/blocks-view.freemarker";

export type BlocksViewPart = PartComponent<`${string}:blocks-view`, BlocksView>;

const view = resolve("blocks-view.ftl");

export function get(): XP.Response {
  const content = getContent<Content<BlocksMixin>>();
  const part = getComponent<BlocksViewPart>();

  assertIsDefined(content);
  assertIsDefined(part);

  const locale = content.language ?? "no";

  const blocksInComponent: BlocksMixin["blocks"] =
    content.type === "portal:site"
      ? part.config.blocks ?? (getSite()?.x[app.name.replace(/\./g, "-")]?.frontpage?.blocks as BlocksMixin["blocks"])
      : part.config.blocks;

  const processedBlocks = process(
    {
      blocks: forceArray(blocksInComponent ? blocksInComponent : content.data.blocks),
      gapRow: part.config.gapRow,
    },
    {
      locale,
      component: part,
    },
  );

  return {
    body: render<FreemarkerParams>(view, {
      processedBlocks,
    }),
  };
}
