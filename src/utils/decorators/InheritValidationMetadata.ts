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

        Reflect.defineMetadata(
          decorator,
          metadata,
          target.prototype as object,
          property,
        );
      });
    });
  };
}
