import "./article-header.css";
import id from "./article-header.ftl";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";
import type { FreemarkerParams } from "./article-header.freemarker";

const meta: Meta<FreemarkerParams> = {
  title: "Part/Article Header",
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
    body: "This is the body of the article. It should be long and informative.",
  },
};
