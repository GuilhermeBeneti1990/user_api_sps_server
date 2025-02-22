import User from "../../../../domain/user/entities/User.js";
import { ROLE } from "../../../../domain/user/entities/User.js";
import UserResponseFactory from "../../../../domain/user/factories/user.response.factory.js";

jest.mock("../../../../domain/user/factories/user.response.factory.js");

describe("User Class", () => {

    it("should throw an error if name is missing", () => {
        expect(() => {
            new User("", "test@example.com", "password123");
        }).toThrowError("Name is required");
    });

    it("should throw an error if email is missing", () => {
        expect(() => {
            new User("Test User", "", "password123");
        }).toThrowError("Name is required");
    });

    it("should throw an error if password is missing", () => {
        expect(() => {
            new User("Test User", "test@example.com", "");
        }).toThrowError("Password is required");
    });

    it("should set default user type to 'user'", () => {
        const user = new User("Test User", "test@example.com", "password123");
        expect(user.type).toBe(ROLE.USER);
    });

    it("should set user type to 'admin' when toAdmin is called", () => {
        const user = new User("Test User", "test@example.com", "password123");
        user.toAdmin();
        expect(user.type).toBe(ROLE.ADMIN);
    });

    it("should call UserResponseFactory with correct arguments in userResponse", () => {
        const user = new User("Test User", "test@example.com", "password123");
        const mockResponse = { id: 1, name: "Test User", email: "test@example.com", type: ROLE.USER };
        
        UserResponseFactory.mockReturnValue(mockResponse);

        const response = user.userResponse(1, "Test User", "test@example.com", ROLE.USER);

        expect(UserResponseFactory).toHaveBeenCalledWith(1, "Test User", "test@example.com", ROLE.USER);
        expect(response).toEqual(mockResponse);
    });

});
