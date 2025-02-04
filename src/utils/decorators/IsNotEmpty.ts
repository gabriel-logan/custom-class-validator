import { defineBoolMetadata } from "../metadatas/defineBoolMetadata";
import { isNotEmptyMetadataKey } from "../metadatas/keys";

/**
 * A decorator function that adds metadata about the not empty validation.
 * @returns A decorator function.
 */
export function IsNotEmpty(): PropertyDecorator {
  return defineBoolMetadata(isNotEmptyMetadataKey, true);
}
