import { validateIsString } from "./functions/validateIsString";
import { validateIsEmail } from "./functions/validateIsEmail";
import { validateIsNotEmpty } from "./functions/validateIsNotEmpty";
import { validateIsNotBlank } from "./functions/validateIsNotBlank";

export function validateFn(
  dtoFromRequest: object,
  property: string,
  errors: string[],
) {
  const value = (dtoFromRequest as { [key: string]: unknown })[property];

  validateIsString(dtoFromRequest, value, property, errors);
  validateIsEmail(dtoFromRequest, value, property, errors);
  validateIsNotEmpty(dtoFromRequest, value, property, errors);
  validateIsNotBlank(dtoFromRequest, value, property, errors);
}
