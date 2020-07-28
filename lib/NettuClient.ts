import { BASE_URL } from "./constants";
import { Conferences, IConferences } from "./resources/conferences/Conferences";
import { RequestCaller } from "./services/RequestCaller";
import { TokenStore } from "./services/TokenStore";
import { IUsers, Users } from "./resources/users/Users";

interface INettuResources {
    conferences: IConferences;
    users: IUsers;
}

export default class NettuClient implements INettuResources {
    
    conferences: IConferences;
    users: IUsers;

    private constructor(resources: INettuResources){
        // init resources
        this.conferences = resources.conferences;
        this.users = resources.users;
    }

    public static create(accessToken: string){
        const authOptions = {
            accessToken
        };
        const tokenStore = new TokenStore(authOptions);
        const requestCaller = new RequestCaller(BASE_URL, tokenStore);
        
        const resources = {
            conferences: new Conferences(requestCaller),
            users: new Users(requestCaller)
        }

        return new NettuClient(resources)
    }
}