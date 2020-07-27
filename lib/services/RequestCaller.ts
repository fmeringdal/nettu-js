import axios, { AxiosRequestConfig } from "axios";
import { AUTHORIZATION_HEADER } from "../constants";
import { Result } from "../core/Result";
import { TokenStore } from "./TokenStore";


interface ICallParams {
    method?: string;
    data?: string;
    path: string;
}


export interface IRequestCaller {
    execute(params: ICallParams): Promise<Result<any>>
}

export class RequestCaller implements IRequestCaller {

    private readonly baseUrl: string;
    private readonly tokenStore: TokenStore;

    constructor(baseUrl: string, tokenStore: TokenStore){
        this.baseUrl = baseUrl;
        this.tokenStore = tokenStore;
    }

    async execute({
        method="GET",
        path,
        data
    }: ICallParams){
        method = method.toUpperCase();
        path = path.startsWith("/") ? path : `/${path}`;
        data = method === "GET" ? undefined : data;

        const config = {
            method: method.toUpperCase(),
            url: this.baseUrl,
            data,
            headers: {
                [AUTHORIZATION_HEADER]: this.tokenStore.getAccessToken()
            }
        } as AxiosRequestConfig;

        const res = await axios(config);
        return Result.ok<number>(res.status);
    }
}