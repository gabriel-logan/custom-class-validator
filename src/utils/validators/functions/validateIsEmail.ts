import { validateEmail } from "multiform-validator";
import { getBoolMetadata } from "src/utils/metadatas/getBoolMetadata";
import { isEmailMetadataKey } from "src/utils/metadatas/keys";

export function validateIsEmail(
  dtoFromRequest: object,
  value: unknown,
  property: string,
  errors: string[],
) {
  const isEmail = getBoolMetadata(isEmailMetadataKey, dtoFromRequest, property);

  if (isEmail) {
    if (
      typeof value !== "string" ||
      !validateEmail(value, {
        maxLength: 255,
      }).isValid
    ) {
      errors.push(`Property ${property} must be a valid email`);
    }
  }
}
