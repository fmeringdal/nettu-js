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
        const res = await this.requestCaller.execute({
            path: "/conferences/"+conferenceId
        });
        // const conference: IConference = {
        //     startTimeUTC: 2412421
        // } 
        return res.isFailure ? null : null;
    }
}