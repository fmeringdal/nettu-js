import { BASE_URL } from "./constants";
import { Conferences, IConferences } from "./resources/conferences/Conferences";
import { RequestCaller } from "./services/RequestCaller";
import { TokenStore } from "./services/TokenStore";

interface INettuResources {
    conferences: IConferences;
}

export default class NettuClient implements INettuResources {
    
    conferences: IConferences;

    private constructor(resources: INettuResources){
        // init resources
        this.conferences = resources.conferences;
    }

    public static new(accessToken: string){
        const authOptions = {
            accessToken
        };
        const tokenStore = new TokenStore(authOptions);
        const requestCaller = new RequestCaller(BASE_URL, tokenStore);
        
        const resources = {
            conferences: new Conferences(requestCaller)
        }

        return new NettuClient(resources)
    }
}