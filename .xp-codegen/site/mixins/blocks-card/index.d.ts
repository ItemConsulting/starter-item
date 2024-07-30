export type BlocksCard = {
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
}
