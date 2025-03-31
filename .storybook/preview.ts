//import "../src/main/resources/assets/styles/core.css";
import { createPreviewServerParams, type Preview } from "@itemconsulting/xp-storybook-utils";

if(!process.env.STORYBOOK_SERVER_URL) {
  throw Error(`You need to create a file named ".env" with "STORYBOOK_SERVER_URL" in it. Then restart storybook.`)
}

const preview: Preview = {
  parameters: {
    server: {
      url: process.env.STORYBOOK_SERVER_URL,
      params: createPreviewServerParams({
        zonedDateTime: /Date$/,
        region: /Region$/i
      })
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
