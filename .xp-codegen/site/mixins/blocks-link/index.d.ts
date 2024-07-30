export type BlocksLink = {

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
}
