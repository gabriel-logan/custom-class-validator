export function getBoolMetadata(
  metadataKey: string | symbol,
  target: object,
  propertyKey: string | symbol,
): boolean {
  return Reflect.getMetadata(metadataKey, target, propertyKey) as boolean;
}
