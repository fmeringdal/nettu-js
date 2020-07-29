export interface ClientAuthOptions {
    accessToken: string; // This can be either a bearer token or a secret key
}

export class TokenStore {

    private accessToken: string;

    constructor(authOptions: ClientAuthOptions){
        if(!authOptions){
            throw new Error("Auth options not provided");
        }
        if(typeof authOptions.accessToken !== "string" || authOptions.accessToken === ""){
            throw new Error("Access token not provided or is invalid");
        }
        this.accessToken = authOptions.accessToken;
    }

    getAccessToken(){
        return this.accessToken;
    }
}