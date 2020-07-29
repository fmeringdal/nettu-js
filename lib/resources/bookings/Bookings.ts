import { IBooking } from "../../core/domain/Booking";
import Resource from "../../core/Resource";

export interface IBookings {
  listUpcoming(): Promise<IBooking[]>;
  listRequests(): Promise<IBooking[]>;
  listFinished(): Promise<IBooking[]>;
  // accept
  // decline
  // create
  // sendPersonalRequest
  // sendEnterpriseRequest
}

export class Bookings extends Resource implements IBookings {
  listUpcoming(): Promise<IBooking[]> {
    return this._listBookings(
      {
        accepted: true,
        finished: false,
      },
      {}
    );
  }

  listRequests(): Promise<IBooking[]> {
    return this._listBookings(
      {
        accepted: false,
        finished: false,
      },
      {}
    );
  }

  listFinished(): Promise<IBooking[]> {
    return this._listBookings(
      {
        accepted: true,
        finished: true,
      },
      {}
    );
  }

  private async _listBookings(
    {
      accepted,
      finished,
    }: {
      accepted: boolean;
      finished: boolean;
    },
    {
      skip = 0,
    }: {
      skip?: number;
    }
  ) {
    const query = `
            query ($finished: Boolean!, $accepted: Boolean!, $skip: Int){
                me {
                    _id
                    conferences(finished: $finished, accepted: $accepted, skip: $skip){
                        _id
                    }
                }
            }
        `;

    const res = await this.requestCaller.executeGraphQL(query, {
      finished,
      accepted,
      skip,
    });
    
    if (res.isFailure) {
      return [];
    }
    const data = res.getValue();
    if (!data || !data.me || !Array.isArray(data.me.conferences)) {
      return [];
    }
    return data.me.conferences;
  }
}
