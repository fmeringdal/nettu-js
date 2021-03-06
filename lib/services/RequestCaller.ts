import { AxiosRequestConfig } from "axios";
import { GraphQLClient } from "graphql-request";
import { AUTHORIZATION_HEADER, BASE_URL } from "../constants";
import { Result } from "../core/logic/Result";
import { TokenStore } from "./TokenStore";


interface ICallParams {
    method?: string;
    data?: any;
    path: string;
}


export interface IRequestCaller {
    executeRest(params: ICallParams): Promise<Result<any>>
    executeGraphQL(query: string, variables?: any): Promise<Result<any>>
}

export class RequestCaller implements IRequestCaller {

    private readonly axios: any;
    private readonly baseUrl: string;
    private readonly tokenStore: TokenStore;
    private readonly graphqlClient: GraphQLClient;

    constructor(baseUrl: string, tokenStore: TokenStore, axios: any, graphqlClient: GraphQLClient){
        this.axios = axios;
        this.baseUrl = baseUrl;
        this.tokenStore = tokenStore;
        this.graphqlClient = graphqlClient;
    }
    
    async executeGraphQL(query: string, variables?: any): Promise<Result<any>> {
        try {
            const res = await this.graphqlClient.request(query, variables);
            return Result.ok<any>(res);   
        } catch (error) {
            return Result.fail<any>(error);   
        }
    }

    async executeRest({
        method="GET",
        path,
        data
    }: ICallParams){
        method = method.toUpperCase();
        path = path.startsWith("/") ? path : `/${path}`;
        data = method === "GET" ? undefined : data;

        const config = {
            method: method.toUpperCase(),
            url: this.baseUrl+path,
            data,
            headers: {
                [AUTHORIZATION_HEADER]: this.tokenStore.getAccessToken()
            }
        } as AxiosRequestConfig;
        try {
            const res = await this.axios(config);   
            return Result.ok<any>(res.data);
        } catch (error) {
            return Result.fail<string>(error.response ? error.response.data.message : "Unexpected error");
        }
    }
}