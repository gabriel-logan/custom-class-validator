import "reflect-metadata";
import { propertyMetadataKey } from "./keys";
import { getProperties } from "./getProperties";

export function defineBoolMetadata(
  metadataKey: symbol | string,
  value: unknown,
): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(metadataKey, value, target, propertyKey);

    const existingProperties = getProperties(target);

    if (!existingProperties.includes(propertyKey.toString())) {
      Reflect.defineMetadata(
        propertyMetadataKey,
        [...existingProperties, propertyKey],
        target,
      );
    }
  };
}
