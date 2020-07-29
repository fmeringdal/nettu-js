import { Result } from "./Result";
import { assert } from "console";

describe("Result logic", () => {

    test("ok operations", async() => {
        const res = Result.ok<string>("test"); 
        expect(res.getValue()).toBe("test");
        expect(res.isFailure).toBe(false);
        expect(res.isSuccess).toBe(true);
        expect(res.errorValue()).toBe(null);
    });

    
    test("fail operations", async() => {
        const res = Result.fail<string>("error message"); 
        expect(res.isFailure).toBe(true);
        expect(res.isSuccess).toBe(false);
        expect(res.errorValue()).toBe("error message");

        try {
            res.getValue();
            expect(1).toBe(2);
        } catch (error) {
            expect(error.message).toBe("Can't get the value of an error result. Use 'errorValue' instead.");
        }
    });

    test("combine operations", async() => {
        const errRes = Result.fail<string>("error message");
        const err2Res = Result.fail<string>("error message");
        const okRes = Result.ok<string>("ok message");
        const ok2Res = Result.ok<string>("ok message");
        
        expect(Result.combine([errRes, err2Res]).isFailure).toBe(true);
        expect(Result.combine([errRes, okRes]).isFailure).toBe(true);
        expect(Result.combine([okRes, ok2Res]).isSuccess).toBe(true);
    });
});
