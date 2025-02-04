import { defineBoolMetadata } from "../metadatas/defineBoolMetadata";
import { isStringMetadataKey } from "../metadatas/keys";

/**
 * A decorator function that adds metadata about the string validation.
 * @returns - A decorator function.
 */
export function IsString(): PropertyDecorator {
  return defineBoolMetadata(isStringMetadataKey, true);
}
