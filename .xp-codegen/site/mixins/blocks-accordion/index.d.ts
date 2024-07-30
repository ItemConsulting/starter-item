export type BlocksAccordion = {
  /**
   * Title
   */
  title?: string;

  /**
   * Theme
   */
  theme?: string;

  /**
   * Accordion element
   */
  items: Array<{
    /**
     * Title
     */
    title: string;

    /**
     * Text
     */
    text: string;
  }>;
}
