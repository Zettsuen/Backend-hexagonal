import { ParamConfigs } from './Params';

export class Members extends ParamConfigs{

    constructor(requestData:any){
       super(requestData)
    }

    getMembersParams(requestData = this.requestData) {

        /*

        Metodo para hacer GET a /members

        - memberKey --> Key del miembro
        - communitySlug --> Slug de la comunidad
        - userID --> ID del usuario

        Este metodo incluye el modelo Member para la relación

        */

        if(requestData.memberKey != null){
            this.where.member = {key: requestData.memberKey}
        }

        if(requestData.memberKey != null){
            this.where.community = {slug: requestData.communitySlug}
        }

        if(requestData.userID != null){
            this.where.member = {user_id: requestData.userID}
        }

        this.include.member = true;

        return this.returnGetData();
    }
}