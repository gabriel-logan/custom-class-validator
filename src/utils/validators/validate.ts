import "reflect-metadata";

import { BadRequestException } from "@nestjs/common";
import { isOptionalMetadataKey } from "../metadatas/keys";

import { getBoolMetadata } from "../metadatas/getBoolMetadata";
import { getProperties } from "../metadatas/getProperties";
import { validateFn } from "./validateFn";

export function validate(dtoFromRequest: unknown, prototypeDto: object) {
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

  return dtoFromRequest;
}
