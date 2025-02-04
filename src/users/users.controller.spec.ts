import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("post", () => {
    it("should return createUserDto correctly", () => {
      const body = {
        email: "email@email.com",
        name: "name",
        password: "password",
        thisIsNotValidated: "thisIsNotValidated",
      };

      expect(controller.post(body)).toBe(body);
    });
  });

  describe("post/whitelist", () => {
    it("should return createUserDto correctly", () => {
      const body = {
        email: "email@email.com",
        name: "name",
        password: "password",
        thisIsNotValidated: "thisIsNotValidated",
      };

      expect(controller.postWithWhitelist(body)).toBe(body);
    });
  });

  describe("post/:id", () => {
    it("should return updateUserDto correctly", () => {
      const body = {
        email: "email@email.com",
        name: "name",
        password: "password",
        thisIsNotValidated: "thisIsNotValidated",
      };

      const id = 1;

      expect(controller.postUpdate(id, body)).toEqual({
        id: id,
        ...body,
      });
    });
  });
});
