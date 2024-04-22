import type { Media as RawMedia } from ".";
import type { Media } from "/site/mixins/media/media.freemarker";
import { imageUrl, ImageUrlParams } from "/lib/xp/portal";

export function getSimple(mediaOptionSet: RawMedia["media"], params: Omit<ImageUrlParams, "path" | "id">): Media {
  if (mediaOptionSet?._selected === "withoutAltText") {
    return {
      mediaSrc: mediaOptionSet?.withoutAltText?.image
        ? imageUrl({
            ...params,
            id: mediaOptionSet.withoutAltText.image,
          })
        : undefined,
      caption: mediaOptionSet?.withoutAltText?.caption,
    };
  } else if (mediaOptionSet?._selected === "withAltText") {
    return {
      mediaSrc: mediaOptionSet?.withAltText?.image
        ? imageUrl({
            ...params,
            id: mediaOptionSet.withAltText.image,
          })
        : undefined,
      altText: mediaOptionSet?.withAltText?.altText,
      caption: mediaOptionSet?.withAltText?.caption,
    };
  }

  return {};
}
