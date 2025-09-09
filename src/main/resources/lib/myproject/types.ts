import type { Content } from "@enonic-types/core";

export type Unarray<T> = T extends Array<infer U> ? U : T extends ReadonlyArray<infer U> ? U : T;

export type PickSelected<OPTION_SET extends { _selected: string }, SELECTED extends string> = Extract<
  OPTION_SET,
  { _selected: SELECTED }
>;

export type PickSelectedValue<
  OPTION_SET extends { _selected: string },
  SELECTED extends string,
> = SELECTED extends keyof PickSelected<OPTION_SET, SELECTED> ? PickSelected<OPTION_SET, SELECTED>[SELECTED] : never;

declare global {
  interface XpXData {
    media?: {
      imageInfo?: {
        contentType?: string;
        pixelSize?: number;
        imageHeight?: number;
        imageWidth?: number;
        byteSize?: number;
      };
    };
  }
}

// Built in
export type BaseMedia<Media extends object = BaseMediaConfig> = {
  media: Media;
  caption?: string;
  artist?: string | string[];
  copyright?: string;
  tags?: string | string[];
};

export interface BaseMediaConfig {
  attachment: string;
}

export type Image = BaseMedia<ImageConfig> & {
  altText?: string;
};

export type ImageConfig = {
  attachment: string;
  focalPoint: {
    x: number;
    y: number;
  };
  zoomPosition: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  cropPosition: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    zoom: number;
  };
};

export type ContentBaseFolder = Content<Record<PropertyKey, never>, `base:folder`>;
export type ContentBaseShortcut = Content<{ target: string }, "base:shortcut">;
export type ContentImage = Content<Image, "media:image">;
export type ContentVector = Content<BaseMedia, "media:vector">;
export type ContentMedia = Content<BaseMedia, `media:${string}`>;
export type ContentPageTemplate = Content<{ supports?: string | string[] }, "portal:page-template">;
