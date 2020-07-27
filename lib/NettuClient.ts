
export interface ClientAuthOptions {
    accessToken: string; // This can be either a bearer token or a secret key
}

class NettuClientTokens {

    private accessToken: string;

    constructor(authOptions: ClientAuthOptions){
        if(!authOptions){
            throw new Error("Auth options not provided");
        }
        if(typeof authOptions.accessToken !== "string"){
            throw new Error("Access token not provided");
        }
        this.accessToken = authOptions.accessToken;
    }

    getAccessToken(){
        return this.accessToken;
    }
}

export default class NettuClient {

    tokens: NettuClientTokens;

    constructor(authOptions: ClientAuthOptions){
        this.tokens = new NettuClientTokens(authOptions);
    }
}