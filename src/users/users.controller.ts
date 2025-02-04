import { Body, Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CustomValidationPipe } from "src/utils/pipes/CustomValidationPipe";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  post(@Body(CustomValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.post(createUserDto);
  }

  @Post(":id")
  postUpdate(
    @Param("id", ParseIntPipe) id: number,
    @Body(CustomValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.postUpdate(id, updateUserDto);
  }
}
