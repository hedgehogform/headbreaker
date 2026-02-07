import { vector, type Vector } from "./vector";

export interface ImageMetadata {
  content: HTMLImageElement | HTMLCanvasElement;
  offset?: Vector;
  scale?: number;
}

export type ImageLike = HTMLImageElement | HTMLCanvasElement | ImageMetadata;

export function asImageMetadata(
  imageLike: ImageLike | null | undefined,
): ImageMetadata | null {
  if (!imageLike) return null;
  if (
    typeof HTMLImageElement !== "undefined" &&
    imageLike instanceof HTMLImageElement
  ) {
    return { content: imageLike, offset: vector(1, 1), scale: 1 };
  }
  if (
    typeof HTMLCanvasElement !== "undefined" &&
    imageLike instanceof HTMLCanvasElement
  ) {
    return { content: imageLike, offset: vector(1, 1), scale: 1 };
  }
  // At this point, imageLike must be ImageMetadata
  return imageLike as ImageMetadata;
}
