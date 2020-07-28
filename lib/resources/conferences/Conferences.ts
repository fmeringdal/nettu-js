import Resource from "../../core/Resource";

export interface IConference {
  _id: string;
}

export interface IConferences {
  get(conferenceId: string): Promise<IConference | null>;
  listUpcoming(): Promise<IConference[]>;
  listRequests(): Promise<IConference[]>;
  listFinished(): Promise<IConference[]>;
}

export class Conferences extends Resource implements IConferences {
  listUpcoming(): Promise<IConference[]> {
    return this._listConferences(
      {
        accepted: true,
        finished: false,
      },
      {}
    );
  }

  listRequests(): Promise<IConference[]> {
    return this._listConferences(
      {
        accepted: false,
        finished: false,
      },
      {}
    );
  }

  listFinished(): Promise<IConference[]> {
    return this._listConferences(
      {
        accepted: true,
        finished: true,
      },
      {}
    );
  }

  async get(conferenceId: string) {
    const query = `
            query ($conferenceId: String!, $companyName: String){
                conference(conferenceId: $conferenceId, companyName: $companyName){
                    _id
                }
            }
        `;

    const res = await this.requestCaller.executeGraphQL(query, {
      conferenceId,
      // companyName: null
    });

    return res.isFailure ? null : null;
  }

  private async _listConferences(
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
    if(res.isFailure){
        return [];
    }
    const data = res.getValue();
    if(!data || !data.me || !Array.isArray(data.me.conferences)){
        return [];
    }
    return data.me.conferences;
  }
}
