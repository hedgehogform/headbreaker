import Canvas, { Figure, Group } from "./canvas"
import { Vector } from "./vector"

/**
 * @callback VectorAction
 * @param {number} dx
 * @param {number} dy
 */


 /**
  * @callback Action
  */

/**
 * An interface for a a rendering backend for a {@link Canvas}, that can be implemented in
 * order to create UI representations of a puzzle.
 *
 * @interface Painter
 */
export default interface Painter {
  /**
   * @param {Canvas} canvas
   * @param {number} width
   * @param {number} height
   */
  resize(canvas, width, height)

  /**
   * Creates the rendering backend, initializig all its contents.
   * After this call, painter is ready to receive any other messages
   *
   * @param {Canvas} canvas
   * @param {string} id
   */
  initialize(canvas: Canvas, id)

  /**
   * Recreates the rendering backend, clearing all its contents
   * After this call, painter is ready to receive any other messages
   * as it had been just initialized.
   *
   * @param {Canvas} canvas
   */
  reinitialize(canvas: Canvas)

  /**
   * Draws the canvas figures in the rendering backend
   *
   * @param {Canvas} canvas
   */
  draw(canvas: Canvas)

  /**
   * Scales the canvas contents
   *
   * @param {Canvas} canvas
   * @param {Vector} factor
   */
  scale(canvas: Canvas, factor)

  /**
   * Adds a piece to the rendering backend, so that it is ready to be drawn
   *
   * @param {Canvas} canvas
   * @param {Piece} piece
   * @param {Figure} figure the rendering backend information for this piece. This method may mutate it if necessary
   * @param {import('./outline').Outline} outline
   */
  sketch(canvas: Canvas, piece, figure, outline)

  /**
   * Fills a piece using the canvas image information
   * assigned for it
   *
   * @param {Canvas} canvas
   * @param {Piece} piece
   * @param {Figure} figure
   */
  fill(canvas: Canvas, piece, figure)

  /**
   * Adds piece's label to the given figure in the rendering backend
   *
   * @param {Canvas} canvas
   * @param {Piece} piece
   * @param {Figure} figure the rendering backend information for this piece. This method may mutate it if necessary
   */
  label(canvas: Canvas, piece, figure)

  /**
   * Translates th given piece
   * @param {Canvas} canvas
   * @param {Group} group
   * @param {Piece} piece
   */
  physicalTranslate(canvas: Canvas, group, piece)

  /**
   * @param {Canvas} canvas
   * @param {Piece} piece
   * @param {Group} group
   */
  logicalTranslate(canvas: Canvas, piece, group)

  /**
   * Registers a drag-start callback
   *
   * @param {Canvas} canvas
   * @param {Piece} piece
   * @param {Group} group
   * @param {VectorAction} f
   *
   */
  onDrag(canvas: Canvas, piece, group, f)

  /**
   * Registers a drag-end callback
   *
   * @param {Canvas} canvas
   * @param {Piece} piece
   * @param {Group} group
   * @param {Action} f
   */
  onDragEnd(canvas: Canvas, piece, group, f)

  /**
   * Register keyboard gestures
   *
   * @param {Canvas} canvas
   * @param {object} gestures a map of key strokes and puzzle actions
   */
  registerKeyboardGestures(canvas: Canvas, gestures)
}
