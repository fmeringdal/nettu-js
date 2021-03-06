import { mock, reset, when, anything, instance, anyString } from "ts-mockito";
import { Bookings } from "./Bookings";
import { IRequestCaller, RequestCaller } from "../../services/RequestCaller";
import { Result } from "../../core/logic/Result";
import { IBooking } from "../../core/domain/Booking";

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

    test("Accept booking request should return accepted booking", async() => {
        const booking: IBooking = {
            _id: "2421421",
            participants: [],
            theme: ""
        }
        const res = {
            acceptConferenceRequest: booking
        }
        when(requestCallerFoo.executeGraphQL(anyString(), anything())).thenResolve(Result.ok<any>(res));
        const requestCaller = instance(requestCallerFoo);
        bookings = new Bookings(requestCaller);

        const acceptedBooking = await bookings.accept(booking._id);
        
        expect(acceptedBooking).toEqual(booking);
    });
    
    test("Decline booking request", async() => {
        const booking: IBooking = {
            _id: "2421421",
            participants: [],
            theme: ""
        }
        const res = {
            declineConferenceRequest: true
        }
        when(requestCallerFoo.executeGraphQL(anyString(), anything())).thenResolve(Result.ok<any>(res));
        const requestCaller = instance(requestCallerFoo);
        bookings = new Bookings(requestCaller);

        const operationResult = await bookings.decline(booking._id);
        
        expect(operationResult).toBe(res.declineConferenceRequest);
    });
    
    test("Cancel an accepted booking", async() => {
        const booking: IBooking = {
            _id: "2421421",
            participants: [],
            theme: ""
        }

        const res = {
            cancelConference: true
        }

        when(requestCallerFoo.executeGraphQL(anyString(), anything())).thenResolve(Result.ok<any>(res));
        const requestCaller = instance(requestCallerFoo);
        bookings = new Bookings(requestCaller);

        const operationResult = await bookings.cancel(booking._id);
        
        expect(operationResult).toBe(res.cancelConference);
    });
    
    test("Create a booking request", async() => {
        const bookingId = "1242141"
        const res = {
            sendEnterpriseConferenceRequest: bookingId
        }

        when(requestCallerFoo.executeGraphQL(anyString(), anything())).thenResolve(Result.ok<any>(res));
        const requestCaller = instance(requestCallerFoo);
        bookings = new Bookings(requestCaller);
        
        const employeesFilter = {
            tag: '2412421'
        };
        const req = {
            timestampUTC: new Date().getTime(),
            comment: "",
            duration: 60
        }
        const createdBookingId = await bookings.createRequest(employeesFilter, req);
        
        expect(createdBookingId).toBe(res.sendEnterpriseConferenceRequest);
    });
});
