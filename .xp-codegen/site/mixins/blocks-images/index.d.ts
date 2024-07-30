export type BlocksImages = {
  /**
   * Image
   */
  items: Array<{
    /**
     * Image
     */
    imageId: string;

    /**
     * Description of the image for visually impaired users (alt text)
     */
    altText: string;

    /**
     * Caption
     */
    caption?: string;
  }>;
}
