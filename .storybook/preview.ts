import { createPreviewServerParams, type Preview } from "@itemconsulting/xp-storybook-utils";
import "../src/main/resources/assets/styles/main.css";

const preview: Preview = {
  parameters: {
    server: {
      // Rendered by the xp-storybook app (https://github.com/ItemConsulting/xp-storybook) in your local sandbox.
      // Set STORYBOOK_SERVER_URL in a .env file to use another XP instance.
      url: import.meta.env.STORYBOOK_SERVER_URL ?? "http://localhost:8080/api/no.item.storybook:preview",
      params: createPreviewServerParams({
        zonedDateTime: /Date$/,
        region: /Region$/i,
      }),
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
