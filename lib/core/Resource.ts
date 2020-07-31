import { IRequestCaller } from "../services/RequestCaller";

export default abstract class Resource {
    protected _requestCaller: IRequestCaller;
    constructor(requestCaller: IRequestCaller){
        this._requestCaller = requestCaller;
    }
}