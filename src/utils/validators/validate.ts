import "reflect-metadata";

import { BadRequestException } from "@nestjs/common";
import { isOptionalMetadataKey } from "../metadatas/keys";

import { getBoolMetadata } from "../metadatas/getBoolMetadata";
import { getProperties } from "../metadatas/getProperties";
import { validateFn } from "./validateFn";

export function validate(
  dtoFromRequest: unknown,
  prototypeDto: object,
  whitelist: boolean,
) {
  if (typeof dtoFromRequest !== "object" || dtoFromRequest === null) {
    throw new Error("DTO must be an object");
  }

  const propertiesFromRequest = Object.keys(dtoFromRequest);

  const allStaticPropertiesDto = getProperties(prototypeDto);

  const errors: string[] = [];

  for (const property of allStaticPropertiesDto) {
    const isOptional = getBoolMetadata(
      isOptionalMetadataKey,
      dtoFromRequest,
      property,
    );

    if (!isOptional && !propertiesFromRequest.includes(property)) {
      errors.push(`Property ${property} is required`);
    }
  }

  if (errors.length === 0) {
    for (const property of propertiesFromRequest) {
      validateFn(dtoFromRequest, property, errors);
    }
  }

  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }

  // If whitelist is true, return only the properties that are in the DTO
  const returnedValue = whitelist
    ? Object.fromEntries(
        Object.entries(dtoFromRequest).filter(([key]) =>
          allStaticPropertiesDto.includes(key),
        ),
      )
    : dtoFromRequest;

  return returnedValue;
}
