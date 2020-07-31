import { IBooking } from "../../core/domain/Booking";
import Resource from "../../core/Resource";
import {
  IEmployeesFilter,
  validateEmployeesFilter,
} from "../../core/domain/Filters";
import { Guard } from "../../core/logic/Guard";

interface BookingRequest {
  comment?: string;
  duration: number;
  timestampUTC: number;
}

export interface IBookings {
  listUpcoming(): Promise<IBooking[]>;
  listRequests(): Promise<IBooking[]>;
  listFinished(): Promise<IBooking[]>;
  accept(id: string): Promise<IBooking>;
  decline(id: string): Promise<boolean>;
  cancel(id: string): Promise<boolean>;
  createRequest(
    employeesFilter: IEmployeesFilter,
    req: BookingRequest
  ): Promise<string | null>;
}

export class Bookings extends Resource implements IBookings {
  async decline(id: string): Promise<boolean> {
    const query = `
    mutation ($conferenceId: String!){
      declineConferenceRequest(conferenceId: $conferenceId)
  `;

    const res = await this._requestCaller.executeGraphQL(query, {
      conferenceId: id,
    });

    return res.isSuccess ? res.getValue().declineConferenceRequest : false;
  }

  async cancel(id: string): Promise<boolean> {
    const query = `
    mutation ($conferenceId: String!){
      cancelConference(conferenceId: $conferenceId)
  `;

    const res = await this._requestCaller.executeGraphQL(query, {
      conferenceId: id,
    });

    return res.isSuccess ? res.getValue().cancelConference : false;
  }

  async accept(id: string): Promise<IBooking> {
    const query = `
    mutation ($conferenceId: String!){
      acceptConferenceRequest(conferenceId: $conferenceId){
        _id
      }
  `;

    const res = await this._requestCaller.executeGraphQL(query, {
      conferenceId: id,
    });

    return res.isSuccess ? res.getValue().acceptConferenceRequest : null;
  }

  /**
   * ! todo
   */
  async createRequest(
    employeesFilter: IEmployeesFilter,
    req: BookingRequest
  ): Promise<string | null> {
    validateEmployeesFilter(employeesFilter);
    Guard.againstInvalidTimestamp(req.timestampUTC);

    const query = `
      mutation(
        $time: String!
        $learningNeedsComment: String!
        $duration: Int!
        $employeesFilter: EmployeesFilterInput!
      ) {
        sendEnterpriseConferenceRequest(
          time: $time
          learningNeedsComment: $learningNeedsComment
          duration: $duration
          employeesFilter: $employeesFilter
        )
      }
    `;

    const res = await this._requestCaller.executeGraphQL(query, {
      time: "" + req.timestampUTC,
      learningNeedsComment: req.comment || "Ingen kommentar",
      duration: req.duration,
      employeesFilter
    });

    if (res.isFailure) {
      return null;
    }

    return res.getValue().sendEnterpriseConferenceRequest;
  }

  listUpcoming(): Promise<IBooking[]> {
    return this._list(
      {
        accepted: true,
        finished: false,
      },
      {}
    );
  }

  listRequests(): Promise<IBooking[]> {
    return this._list(
      {
        accepted: false,
        finished: false,
      },
      {}
    );
  }

  listFinished(): Promise<IBooking[]> {
    return this._list(
      {
        accepted: true,
        finished: true,
      },
      {}
    );
  }

  private async _list(
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

    const res = await this._requestCaller.executeGraphQL(query, {
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
