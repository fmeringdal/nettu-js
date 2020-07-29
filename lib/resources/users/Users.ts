import Resource from "../../core/Resource";

export interface IUsers {
    createToken(userId: string): Promise<string>
}

export class Users extends Resource
    implements IUsers {
    
    async createToken(userId: string){

        const data =  await this.requestCaller.executeRest({
            method: "POST",
            path: `/api/v1/company/users/${userId}/token`
        });

        if(data.isFailure){
            throw new Error(data.errorValue());   
        }

        return data.getValue();
    }

    async create({
        name="",
        email="",
        phone="",
        description=""
    }={}){

        const data =  await this.requestCaller.executeRest({
            method: "POST",
            path: `/api/v1/company/users`,
            data: {
                name,
                email,
                phone,
                description
            }
        });

        if(data.isFailure){
            throw new Error(data.errorValue());
            
        }

        return data.getValue();
    }
}