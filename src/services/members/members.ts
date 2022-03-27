import { ParamConfigs } from '../Params';

export class Members extends ParamConfigs{

    constructor(requestData:any){
       super(requestData)
    }

    getMembersParams(requestData = this.requestData) {

        /*

        Metodo para hacer GET a /members

        - memberKey --> Key del miembro
        - communitySlug --> Slug de la comunidad

        Este metodo incluye el modelo Member para la relación

        */

        if(requestData.memberKey != null){
            this.where.member = {key: requestData.memberKey}
        }

        if(requestData.memberKey != null){
            this.where.community = {slug: requestData.communitySlug}
        }

        this.include.member = true;

        return this.returnData();
    }
}