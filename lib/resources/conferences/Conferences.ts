import Resource from "../../core/Resource";

export interface IConference {
    startTimeUTC: number
}

export interface IConferences {
    get(conferenceId: string): Promise<IConference | null>
}

export class Conferences extends Resource
    implements IConferences {
    
    async get(conferenceId: string){

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
        console.log(res);

        return res.isFailure ? null : null;
    }
}