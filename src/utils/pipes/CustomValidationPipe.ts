import "reflect-metadata";

import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

import { validate } from "../validators/validate";

interface ConstructorOptions {
  whitelist?: boolean;
}

/**
 * A pipe that validates the DTOs.
 * @returns The transformed value.
 * @throws An error if the validation result is not valid.
 *
 * @remarks
 * This pipe is used to validate the DTOs.
 */
export class CustomValidationPipe implements PipeTransform {
  private readonly whitelist: boolean;

  constructor({ whitelist = false }: ConstructorOptions = {}) {
    this.whitelist = whitelist;
  }

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== "body") return value;

    if (!metadata.metatype) return value;

    // Ensure that value is an instance of the DTO class
    const transformedValue = Object.assign(
      new metadata.metatype(),
      value,
    ) as unknown;

    const prototypeDto = metadata.metatype.prototype as object;

    const validationResult = validate(
      transformedValue,
      prototypeDto,
      this.whitelist,
    );

    return validationResult;
  }
}
