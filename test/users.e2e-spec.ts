import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("users", () => {
    it("/users (POST)", () => {
      const route = "/users";
      const statusCode = HttpStatus.CREATED;
      const body = {
        name: "test",
        email: "test@test.com",
        password: "test",
        thisIsNotValidated: "test",
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect(body);
    });

    it("/users (POST) - invalid body 1", () => {
      const route = "/users";
      const statusCode = HttpStatus.BAD_REQUEST;
      const body = {
        name: "test",
        email: "test",
        password: "test",
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect({
          message: ["Property email must be a valid email"],
          error: "Bad Request",
          statusCode: statusCode,
        });
    });

    it("/users (POST) - invalid body 2", () => {
      const route = "/users";
      const statusCode = HttpStatus.BAD_REQUEST;
      const body = {
        name: "test",
        email: "test@test.com",
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect({
          message: ["Property password is required"],
          error: "Bad Request",
          statusCode: statusCode,
        });
    });

    it("/users (POST) - invalid body 3", () => {
      const route = "/users";
      const statusCode = HttpStatus.BAD_REQUEST;
      const body = {
        name: "test",
        email: "test@test.com",
        password: 65,
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect({
          message: ["Property password must be a string"],
          error: "Bad Request",
          statusCode: statusCode,
        });
    });

    it("/users (POST) - invalid body 4", () => {
      const route = "/users";
      const statusCode = HttpStatus.BAD_REQUEST;
      const body = {
        name: "test",
        email: "test",
        password: "  ",
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect({
          message: [
            "Property email must be a valid email",
            "Property password must not be blank",
          ],
          error: "Bad Request",
          statusCode: statusCode,
        });
    });
  });

  describe("users/whitelist true", () => {
    it("/users (POST)", () => {
      const route = "/users/whitelist";
      const statusCode = HttpStatus.CREATED;
      const body = {
        name: "test",
        email: "test@test.com",
        password: "test",
        thisIsNotValidated: "test",
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect({
          name: "test",
          email: "test@test.com",
          password: "test",
        });
    });
  });

  describe("users/:id", () => {
    it("/users/:id (POST)", () => {
      const route = "/users/1";
      const statusCode = HttpStatus.OK;
      const body = {
        name: "test",
        email: "email@email.com",
        password: "test",
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect({
          id: 1,
          ...body,
        });
    });

    it("/users/:id (POST) - invalid body 1", () => {
      const route = "/users/1";
      const statusCode = HttpStatus.BAD_REQUEST;
      const body = {
        name: "test",
        email: "email",
        password: "test",
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect({
          message: ["Property email must be a valid email"],
          error: "Bad Request",
          statusCode: statusCode,
        });
    });

    it("/users/:id (POST) - dont block optional", () => {
      const route = "/users/1";
      const statusCode = HttpStatus.OK;
      const body = {
        name: "test",
        email: "email@email.com",
        aditionalField: "test",
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect({
          id: 1,
          ...body,
        });
    });

    it("/users/:id (POST) - email is required", () => {
      const route = "/users/1";
      const statusCode = HttpStatus.BAD_REQUEST;
      const body = {
        name: "test",
        password: "test",
      };

      return request(app.getHttpServer())
        .post(route)
        .send(body)
        .expect(statusCode)
        .expect({
          message: ["Property email is required"],
          error: "Bad Request",
          statusCode: statusCode,
        });
    });
  });
});
