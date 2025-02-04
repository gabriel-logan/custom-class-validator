import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "src/utils/decorators/IsEmail";
import { IsNotBlank } from "src/utils/decorators/IsNotBlank";
import { IsNotEmpty } from "src/utils/decorators/IsNotEmpty";
import { IsString } from "src/utils/decorators/IsString";

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
}
