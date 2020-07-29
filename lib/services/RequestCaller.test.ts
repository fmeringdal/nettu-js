import { BASE_URL } from "../constants";
import { RequestCaller } from "./RequestCaller";
import { TokenStore } from "./TokenStore";

describe("Request Caller", () => {
    const mockAxios = () => ({ data: {healthy: true} });
    const mockGraphQL = {
        request: () => ({ healthy: true })
    };
    const tokenStore = new TokenStore({ accessToken: "213124" });
    const caller = new RequestCaller(BASE_URL, tokenStore, mockAxios, mockGraphQL as any)

    test("Should call rest endpoint", async() => {
        const res = await caller.executeRest({
            method: "GET",
            path: "/"
        });
        expect(res.isSuccess).toBe(true);
        expect(res.getValue()).toEqual(mockAxios().data);
    });

    
    test("Should call graphql endpoint", async() => {
        const res = await caller.executeGraphQL(`{
            me {
                _id
            }
        }`);
        expect(res.isSuccess).toBe(true);
        expect(res.getValue()).toEqual(mockGraphQL.request());
    });
});
