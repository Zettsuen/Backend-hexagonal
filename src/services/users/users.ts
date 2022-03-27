import { ParamConfigs } from '../Params';

export class Users extends ParamConfigs{

    constructor(requestData:any){
       super(requestData)
    }

    getUsersParams(requestData = this.requestData) {

        /*

        Metodo para hacer GET a /users

        - userKey --> Key del usuario

        */

        if(requestData.userKey != null){
            this.where.key = requestData.userKey
        }

        return this.returnData();
    }
}