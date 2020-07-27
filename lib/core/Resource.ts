import { IRequestCaller } from "../services/RequestCaller";

export default abstract class Resource {
    requestCaller: IRequestCaller;
    constructor(requestCaller: IRequestCaller){
        this.requestCaller = requestCaller;
    }
}