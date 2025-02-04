import { getBoolMetadata } from "src/utils/metadatas/getBoolMetadata";
import { isNotEmptyMetadataKey } from "src/utils/metadatas/keys";

export function validateIsNotEmpty(
  dtoFromRequest: object,
  value: unknown,
  property: string,
  errors: string[],
) {
  const isNotEmpty = getBoolMetadata(
    isNotEmptyMetadataKey,
    dtoFromRequest,
    property,
  );

  if (isNotEmpty && value === "") {
    errors.push(`Property ${property} must not be empty`);
  }
}
