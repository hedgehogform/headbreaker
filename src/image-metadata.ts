import { vector, type Vector } from './vector';

export interface ImageMetadata {
  content: any; // HTMLImageElement | HTMLCanvasElement
  offset?: Vector;
  scale?: number;
}

export type ImageLike = any | ImageMetadata;

export function asImageMetadata(imageLike: ImageLike): ImageMetadata | null {
  if (!imageLike) return null;
  if (typeof HTMLImageElement !== 'undefined' && imageLike instanceof HTMLImageElement) {
    return { content: imageLike, offset: vector(1, 1), scale: 1 };
  }
  if (typeof HTMLCanvasElement !== 'undefined' && imageLike instanceof HTMLCanvasElement) {
    return { content: imageLike, offset: vector(1, 1), scale: 1 };
  }
  if (imageLike.content) {
    return imageLike as ImageMetadata;
  }
  return null;
}
