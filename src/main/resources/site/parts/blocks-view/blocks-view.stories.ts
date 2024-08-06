import id from "./blocks-view.ftl";
import "./blocks-view.css";
import DetailsAnimated from "@itemconsulting/details-animated";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";

if (!window.customElements.get("details-animated")) {
  window.customElements.define("details-animated", DetailsAnimated);
}

const meta: Meta = {
  title: "Part/Blocks View",
  argTypes: {
    accordionClasses: {
      name: "Accordion Theme",
      description: "Chose a color theme for the component",
      options: ["theme-accent", "theme-neutral", "theme-brand1", "theme-brand2", "theme-brand3"],
      control: {
        type: "inline-radio",
        labels: {
          "theme-accent": "Accent",
          "theme-neutral": "Neutral",
          "theme-brand1": "Brand1",
          "theme-brand2": "Brand2",
          "theme-brand3": "Brand3",
        },
      },
    },
  },
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

          [#assign accordion]
            [#-- Accordion --]
            [#assign items=accordionItems /]
            [#assign classes=accordionClasses /]
            [#include "/site/mixins/blocks-accordion/blocks-accordion.ftl"]
          [/#assign]

          [#assign processedBlocks]
            [#assign blocks=[text1, accordion] /]
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
        Duis aute <a href="#">irure dolor in reprehenderit</a> in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <span class="icon icon-smile"></span>
      </p>
    `,
    accordionItems: [
      {
        title: "Overskrift 1",
        text: `
          <p>Dette er noe riktekst</p>
          <ul>
            <li>test</li>
            <li>test2</li>
          </ul>`,
      },
      {
        title: "Overskrift 2",
        text: `
          <p>Dette er noe riktekst</p>
          <ul>
           <li>test</li>
           <li>test2</li>
          </ul>`,
      },
    ],
    accordionClasses: "theme-neutral",
  },
};
