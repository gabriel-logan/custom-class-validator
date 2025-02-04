import { defineBoolMetadata } from "../metadatas/defineBoolMetadata";
import { isOptionalMetadataKey } from "../metadatas/keys";

/**
 * A decorator function that adds metadata about the optional validation.
 * @returns A decorator function.
 * This decorator is used to mark a property as optional.
 */
export function IsOptional(): PropertyDecorator {
  return defineBoolMetadata(isOptionalMetadataKey, true);
}
