import { defineBoolMetadata } from "../metadatas/defineBoolMetadata";
import { isNotBlankMetadataKey } from "../metadatas/keys";

/**
 * A decorator function that adds metadata about the not blank validation.
 * @returns A decorator function.
 */
export function IsNotBlank(): PropertyDecorator {
  return defineBoolMetadata(isNotBlankMetadataKey, true);
}
