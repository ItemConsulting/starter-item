import id from "./article-header.ftl";
import { hideControls, type Meta, type StoryObj } from "@itemconsulting/xp-storybook-utils";
import type { FreemarkerParams } from "./article-header.freemarker";

const meta: Meta<FreemarkerParams> = {
  title: "Part/Article Header",
  argTypes: hideControls({
    media: "object",
  }),
  parameters: {
    layout: "centered",
    server: { id },
  },
};

export default meta;

export const articleHeader: StoryObj<FreemarkerParams> = {
  name: "Article Header",
  args: {
    displayName: "This is a typical title of an article",
    intro: "An intro can be relevant some times. Other times edits write a whole article here.",
    media: {
      mediaSrc: "item.svg",
      altText: "Item Logo",
    },
  },
};
