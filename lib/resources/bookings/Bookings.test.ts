import { mock, reset, when, anything, instance, anyString } from "ts-mockito";
import { Bookings } from "./Bookings";
import { IRequestCaller, RequestCaller } from "../../services/RequestCaller";
import { Result } from "../../core/logic/Result";

describe("Bookings", () => {
    let requestCallerFoo: IRequestCaller = mock<IRequestCaller>();
    let bookings: Bookings;

    afterEach(() => {
        reset(requestCallerFoo);
    })


    test("List bookings, should work even if request fails", async() => {
        when(requestCallerFoo.executeGraphQL(anyString(), anything())).thenResolve(Result.fail<any>("Some Error"));
        const requestCaller = instance(requestCallerFoo);
        bookings = new Bookings(requestCaller); 

        const upcomingBookings = await bookings.listUpcoming();
        
        expect(upcomingBookings.length).toBe(0);
    });

    
    test("List bookings should return bookings from request", async() => {
        const returnedBookings = [{ _id: "3123" }, { _id: "3153" }, { _id: "3129" }];
        when(requestCallerFoo.executeGraphQL(anyString(), anything())).thenResolve(Result.ok<any>({ me: { conferences: returnedBookings}}));
        const requestCaller = instance(requestCallerFoo);
        bookings = new Bookings(requestCaller); 

        const upcomingBookings = await bookings.listUpcoming();
        const finishedBookings = await bookings.listFinished();
        const requests = await bookings.listRequests();
        
        expect(upcomingBookings.length).toBe(returnedBookings.length);
        expect(finishedBookings.length).toBe(returnedBookings.length);
        expect(requests.length).toBe(returnedBookings.length);
    });
});
