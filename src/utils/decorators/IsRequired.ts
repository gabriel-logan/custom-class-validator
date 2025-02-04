import { defineBoolMetadata } from "../metadatas/defineBoolMetadata";
import { isRequiredMetadataKey } from "../metadatas/keys";

/**
 * A decorator function that adds metadata about the required validation.
 * @returns - A decorator function.
 * - This decorator is used to mark a property as required.
 * If used in conjunction with IsOptional,
 * the property will be optional even if it is marked as required.
 * - !!! Be careful !!!
 */
export function IsRequired(): PropertyDecorator {
  return defineBoolMetadata(isRequiredMetadataKey, true);
}
