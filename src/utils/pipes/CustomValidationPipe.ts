import "reflect-metadata";

import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

import { validate } from "../validators/validate";

/**
 * A pipe that validates the DTOs.
 * @returns The transformed value.
 * @throws An error if the value is not valid.
 * @throws An error if the metadata type is not "body".
 * @throws An error if the metadata metatype is not defined.
 * @throws An error if the validation result is not valid.
 *
 * @remarks
 * This pipe is used to validate the DTOs.
 */
@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== "body") return value;

    if (!metadata.metatype) return value;

    // Ensure that value is an instance of the DTO class
    const transformedValue = Object.assign(
      new metadata.metatype(),
      value,
    ) as unknown;

    const prototypeDto = metadata.metatype.prototype as object;

    const validationResult = validate(transformedValue, prototypeDto);

    return validationResult;
  }
}
