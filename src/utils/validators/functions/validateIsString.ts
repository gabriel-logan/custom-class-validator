import { getBoolMetadata } from "src/utils/metadatas/getBoolMetadata";
import { isStringMetadataKey } from "src/utils/metadatas/keys";

export function validateIsString(
  dtoFromRequest: object,
  value: unknown,
  property: string,
  errors: string[],
) {
  const isString = getBoolMetadata(
    isStringMetadataKey,
    dtoFromRequest,
    property,
  );

  // IsString Validation
  if (isString && typeof value !== "string") {
    errors.push(`Property ${property} must be a string`);
  }
}
