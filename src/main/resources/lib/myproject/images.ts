import { get as getOne } from "/lib/xp/content";
import type { ContentImage, Image } from "./types";

export function getImageMeta(imageId: string): Partial<Image> {
  const imageContent = getOne<ContentImage>({ key: imageId });
  return imageContent?.data ?? {};
}
