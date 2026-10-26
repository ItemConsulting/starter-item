import type { StorybookConfig } from "@itemconsulting/storybook-framework-enonic-xp";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.ts"],
  addons: ["@storybook/addon-links", "@storybook/addon-a11y", "@storybook/addon-docs"],
  staticDirs: ["../src/main/resources/assets", "./images"],
  framework: {
    name: "@itemconsulting/storybook-framework-enonic-xp",
    options: {},
  },
};

export default config;
