import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  post(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  postWithWhitelist(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  postUpdate(id: number, updateUserDto: UpdateUserDto) {
    return { id, ...updateUserDto };
  }
}
