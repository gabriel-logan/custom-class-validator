import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

import { InheritValidationMetadata } from "src/utils/decorators/InheritValidationMetadata";
import { IsString } from "src/utils/decorators/IsString";
import { IsOptional } from "src/utils/decorators/IsOptional";
import { IsRequired } from "src/utils/decorators/IsRequired";

@InheritValidationMetadata(CreateUserDto)
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  // The @IsOptional() is needed because this field is not extended from the CreateUserDto class
  // So it is considered required by default when using some decorators like @IsString() for example
  @IsOptional()
  @ApiProperty({ required: false })
  aditionalField?: string;

  // Overriding the email field to make it required in this case
  // The @IsRequired() is needed for the class that extends a PartialType and has a field that is required
  // Any other field extended is considered optional by default
  @IsRequired()
  @ApiProperty({ required: true })
  email: string;
}
