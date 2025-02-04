import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("post", () => {
    it("should return createUserDto correctly", () => {
      const body = {
        email: "email@email.com",
        name: "name",
        password: "password",
        thisIsNotValidated: "thisIsNotValidated",
      };

      expect(service.post(body)).toBe(body);
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

      expect(service.postWithWhitelist(body)).toBe(body);
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

      expect(service.postUpdate(id, body)).toEqual({
        id: id,
        ...body,
      });
    });
  });
});
