import id from "./blocks-view.ftl";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";
import type { FreemarkerParams } from "./blocks-view.freemarker";

const meta: Meta<FreemarkerParams> = {
  title: "Part/Blocks View",
  parameters: {
    server: {
      id,
      params: {
        template: `
          [#assign text1]
            [#assign title=text1Title /]
            [#assign text=text1Text /]
            [#include "/site/mixins/blocks-text/blocks-text.ftl" /]
          [/#assign]

          [#assign blocks]
            [#assign blocks=[text1] /]
            [#include "/site/mixins/blocks/blocks.ftl" /]
          [/#assign]

          [#include "${id}" /]
        `,
      },
    },
  },
};

export default meta;

export const blocksView: StoryObj = {
  name: "BlocksView",
  args: {
    text1Title: "Welcome to my blog!",
    text1Text: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
      <ul>
        <li>Sharks</li>
        <li>Lasers</li>
        <li>Unicorns</li>
      </ul>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    `,
  },
};
