import { mock, reset, when, anything, instance, anyString } from "ts-mockito";
import { Users } from "./Users";
import { IRequestCaller, RequestCaller } from "../../services/RequestCaller";
import { Result } from "../../core/logic/Result";

describe("Users", () => {
    let requestCallerFoo: IRequestCaller = mock<IRequestCaller>();
    let users: Users;

    afterEach(() => {
        reset(requestCallerFoo);
    })


    test("Create user token", async() => {
        const accessToken = "24321421412"
        when(requestCallerFoo.executeRest(anything())).thenResolve(Result.ok<any>({ accessToken }));
        const requestCaller = instance(requestCallerFoo);
        users = new Users(requestCaller); 

        const data = await users.createToken('232141241');
        
        expect(data.accessToken).toBe(accessToken);
    });

    test("Throw error message if create user token fails", async() => {
        const accessToken = "24321421412"
        const errorMsg = "Requester does not have this privilege";
        when(requestCallerFoo.executeRest(anything())).thenResolve(Result.fail<any>(errorMsg));
        const requestCaller = instance(requestCallerFoo);
        users = new Users(requestCaller); 

        await expect(users.createToken("1241412421"))
            .rejects
            .toThrow(errorMsg)
    });

    
    test("Create user without any params", async() => {
        const createdUser = { userId: "1241421421" }
        when(requestCallerFoo.executeRest(anything())).thenResolve(Result.ok<any>(createdUser));
        const requestCaller = instance(requestCallerFoo);
        users = new Users(requestCaller); 

        const data = await users.create();
        
        expect(data.userId).toBe(createdUser.userId);
    });

    test("Throw error message if create user token fails", async() => {
        const errorMsg = "Requester does not have this privilege";
        when(requestCallerFoo.executeRest(anything())).thenResolve(Result.fail<any>(errorMsg));
        const requestCaller = instance(requestCallerFoo);
        users = new Users(requestCaller); 

        await expect(users.create())
            .rejects
            .toThrow(errorMsg)
    });
});
