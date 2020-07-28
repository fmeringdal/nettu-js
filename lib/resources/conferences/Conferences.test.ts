import { mock, reset, when, anything } from "ts-mockito";
import { Conferences } from "./Conferences";
import { IRequestCaller } from "../../services/RequestCaller";
import { Result } from "../../core/logic/Result";

describe("Conference resources", () => {
    let requestCaller: IRequestCaller = mock<IRequestCaller>();
    let conferences: Conferences;
    beforeEach(() => {
        // requestCaller.call({
        //     path: ""
        // })
        conferences = new Conferences(requestCaller); 
    });

    afterEach(() => {
        reset(requestCaller);
    });

    // test("Get conference", async() => {

    //     when(requestCaller.execute(anything())).thenResolve(Result.ok<void>());

    //     const conference = await conferences.get("2421412");
        
    //     expect(conference).toBeNull();
    // });

});
