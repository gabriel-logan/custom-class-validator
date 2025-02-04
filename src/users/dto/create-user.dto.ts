import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "src/utils/decorators/IsEmail";
import { IsNotBlank } from "src/utils/decorators/IsNotBlank";
import { IsNotEmpty } from "src/utils/decorators/IsNotEmpty";
import { IsString } from "src/utils/decorators/IsString";

// If any decorator is used like in `thisIsNotValidated` field, it will not be validated and will not be required in @Body().
// This is a limitation of javascript runtime, because types do not exist in runtime.

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    format: "email",
  })
  @IsEmail()
  email: string;

  @IsNotBlank()
  @ApiProperty()
  @IsString()
  password: string;

  thisIsNotValidated: string;
}
