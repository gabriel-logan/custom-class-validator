import "reflect-metadata";

import { getProperties } from "../metadatas/getProperties";

export class BaseClass {} // nosonar

/**
 * @param baseClass The class to inherit the metadata from.
 * @returns A class decorator function that inherits the metadata from the base class.
 */
export function InheritValidationMetadata(
  baseClass: typeof BaseClass,
): ClassDecorator {
  return (target) => {
    const basePrototype = baseClass.prototype;
    const properties = getProperties(basePrototype);

    properties.forEach((property) => {
      const decorators = Reflect.getMetadataKeys(basePrototype, property) as
        | symbol[]
        | string[];

      decorators.forEach((decorator) => {
        const metadata = Reflect.getMetadata(
          decorator,
          basePrototype,
          property,
        ) as unknown;

        const targetPrototype = target.prototype as object;

        if (decorator === "swagger/apiModelProperties") {
          const updatedMetadata = { ...(metadata as object), required: false };

          Reflect.defineMetadata(
            decorator,
            updatedMetadata,
            targetPrototype,
            property,
          );
        } else {
          Reflect.defineMetadata(
            decorator,
            metadata,
            targetPrototype,
            property,
          );
        }
      });
    });
  };
}
