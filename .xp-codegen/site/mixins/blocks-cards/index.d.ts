export type BlocksCards = {
  /**
   * Title
   */
  title?: string;

  /**
   * Theme
   */
  theme?: string;

  /**
   * Image placement
   */
  imageClass: "blocks-card--image-left" | "blocks-card--image-right" | "blocks-card--image-top" | "blocks-card--image-bottom";

  /**
   * Column count
   */
  columnsClass: "blocks-card--cols-1" | "blocks-card--cols-2" | "blocks-card--cols-3";

  /**
   * Cards
   */
  items: Array<{
    /**
     * Title
     */
    title?: string;


    link:
      | {
          /**
           * Selected
           */
          _selected: "internal";

          /**
           * Internal
           */
          internal: {
            /**
             * Internal link
             */
            internalLink: string;
          };
        }
      | {
          /**
           * Selected
           */
          _selected: "external";

          /**
           * External
           */
          external: {
            /**
             * External link
             */
            externalLink: string;
          };
        }
      | {
          /**
           * Selected
           */
          _selected: "none";

          /**
           * None
           */
          none: Record<string, unknown>;
        };

    /**
     * Kicker
     */
    kicker?: string;

    /**
     * Text
     */
    text?: string;

    /**
     * Image
     */
    imageId?: string;
  }>;
}