import Resource from "../../core/Resource";

interface UserDTO {
    name?: string;
    email?: string;
    phone?: string;
    description?: string;
}

export interface IUsers {
    createToken(userId: string): Promise<string>
    create(user?: UserDTO): Promise<{ userId: string }>
}

export class Users extends Resource
    implements IUsers {
    
    
    async createToken(userId: string){

        const data =  await this._requestCaller.executeRest({
            method: "POST",
            path: `/api/v1/company/users/${userId}/token`
        });

        if(data.isFailure){
            throw new Error(data.errorValue());   
        }

        return data.getValue();
    }

    async create(user?: UserDTO | undefined): Promise<{ userId: string }> {

        const data =  await this._requestCaller.executeRest({
            method: "POST",
            path: `/api/v1/company/users`,
            data: user ? {
                name: user.name ? user.name : undefined,
                email: user.email ? user.email : undefined,
                phone: user.phone ? user.phone : undefined,
                description: user.description ? user.description : undefined
            } : undefined
        });

        if(data.isFailure){
            throw new Error(data.errorValue());
            
        }

        return data.getValue();
    }
    

}