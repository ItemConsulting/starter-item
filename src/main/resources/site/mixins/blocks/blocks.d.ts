import type { Component } from "@enonic-types/core";
import type { Blocks as BlocksRaw } from ".";

export type BlockProcessorParams = {
  component: Component;
  locale: string;
};

export declare function process(config: BlocksRaw, params?: BlockProcessorParams): string;
