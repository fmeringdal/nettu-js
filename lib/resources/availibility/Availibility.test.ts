import { instance, mock } from "ts-mockito";
import { IRequestCaller } from "../../services/RequestCaller";
import { Availibility } from "./Availibility";
import { expectError } from "../../../test/helpers/GenericErrors";

describe("Availibility", () => {
    let requestCallerFoo: IRequestCaller = mock<IRequestCaller>();
    let availibility: Availibility;
    const validEmployeesFilter = { tag: 'math' };

    test("Dont let user check for availibility when timespan is too big", async() => {
        const requestCaller = instance(requestCallerFoo);
        availibility = new Availibility(requestCaller); 
        const ts = new Date().getTime();
        const INVALID_TIMESPANS = [
            {
                endTimestampUTC: ts,
                startTimestampUTC: ts 
            },
            {
                endTimestampUTC: ts,
                startTimestampUTC: ts+5
            },
            {
                endTimestampUTC: ts+2,
                startTimestampUTC: ts
            },
            {
                endTimestampUTC: ts+(1000*60*60*24*32), // More than 31 days larger than starttime 
                startTimestampUTC: ts
            },
            null
        ];
        INVALID_TIMESPANS.map(val => expectError(availibility.employees, validEmployeesFilter, val));
    });

});
