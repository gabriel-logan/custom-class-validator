import { defineBoolMetadata } from "../metadatas/defineBoolMetadata";
import { isEmailMetadataKey } from "../metadatas/keys";

/**
 * @returns A decorator function that adds metadata about the email validation.
 */
export function IsEmail(): PropertyDecorator {
  return defineBoolMetadata(isEmailMetadataKey, true);
}
