import type { StorybookConfig } from "@storybook/server-webpack5";

const config: StorybookConfig = {
  typescript: {
    check: false,
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.ts"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@itemconsulting/preset-enonic-xp"
  ],
  staticDirs: ['../src/main/resources/assets', './images'],
  framework: {
    name: "@storybook/server-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
