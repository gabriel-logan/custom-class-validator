import { propertyMetadataKey } from "./keys";

export function getProperties(target: object): string[] {
  return (Reflect.getMetadata(propertyMetadataKey, target) as string[]) || [];
}
