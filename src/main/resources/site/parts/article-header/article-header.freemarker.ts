import type { Media } from "/site/mixins/media/media.freemarker";

export type FreemarkerParams = {
  displayName: string;
  intro?: string;
  media?: Media;
};
