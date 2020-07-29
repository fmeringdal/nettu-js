import { BASE_URL } from "./constants";
import { Bookings, IBookings } from "./resources/bookings/Bookings";
import { RequestCaller } from "./services/RequestCaller";
import { TokenStore } from "./services/TokenStore";
import { IUsers, Users } from "./resources/users/Users";
import axios from "axios";
import { GraphQLClient } from "graphql-request";

interface INettuResources {
    bookings: IBookings;
    users: IUsers;
}

export default class NettuClient implements INettuResources {
    
    bookings: IBookings;
    users: IUsers;

    private constructor(resources: INettuResources){
        // init resources
        this.bookings = resources.bookings;
        this.users = resources.users;
    }

    public static create(accessToken: string){
        const authOptions = {
            accessToken
        };
        const tokenStore = new TokenStore(authOptions);
        const graphqlClient = new GraphQLClient(BASE_URL+"/graphql", {
            headers: {
                token: tokenStore.getAccessToken()
            }
        });
        const requestCaller = new RequestCaller(BASE_URL, tokenStore, axios, graphqlClient);
        
        const resources = {
            bookings: new Bookings(requestCaller),
            users: new Users(requestCaller)
        }

        return new NettuClient(resources)
    }
}