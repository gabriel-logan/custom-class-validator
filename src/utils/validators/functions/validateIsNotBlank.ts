import { getBoolMetadata } from "src/utils/metadatas/getBoolMetadata";
import { isNotBlankMetadataKey } from "src/utils/metadatas/keys";

export function validateIsNotBlank(
  dtoFromRequest: object,
  value: unknown,
  property: string,
  errors: string[],
) {
  const isNotBlank = getBoolMetadata(
    isNotBlankMetadataKey,
    dtoFromRequest,
    property,
  );

  if (isNotBlank && typeof value === "string" && value.trim() === "") {
    errors.push(`Property ${property} must not be blank`);
  }
}
