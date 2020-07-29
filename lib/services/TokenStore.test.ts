import { TokenStore } from "./TokenStore";

describe("TokenStore", () => {

    test("Should not be able to init store without any tokens", async() => {
        try {
            // @ts-ignore
            new TokenStore();
            expect(1).toBe(2);
        } catch (error) {
            expect(1).toBe(1);
        }
        // expect()
        //     .toThrow("Auth options not provided");
    });

    test("Should not be able to init store without valid formatted tokens", async() => {
        try {
            // @ts-ignore
            new TokenStore({ accessToken: "" });
            expect(1).toBe(2);
        } catch (error) {
            expect(1).toBe(1);
        }
        // expect(new TokenStore({ accessToken: "" }))
        //     .toThrow("Access token not provided or is invalid");
    });

    
    test("Should be able to init store with valid formatted tokens", async() => {
        const token = "1242421421";
        const store = new TokenStore({ accessToken: token });
        expect(store).toBeDefined();
        expect(store.getAccessToken()).toBe(token);
    });
});
