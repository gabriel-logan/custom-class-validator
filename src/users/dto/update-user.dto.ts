import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

import { InheritValidationMetadata } from "src/utils/decorators/InheritValidationMetadata";
import { IsString } from "src/utils/decorators/IsString";
import { IsOptional } from "src/utils/decorators/IsOptional";

@InheritValidationMetadata(CreateUserDto)
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  aditionalField?: string;
}
