import { ParamConfigs } from './Params';

export class Communities extends ParamConfigs{

    constructor(requestData:any){
       super(requestData)
    }

    getCommunityParams(requestData = this.requestData) {

        /*

        Metodo para hacer GET a /communities

        - communitySlug --> Slug de la comunidad
        - communityKey --> Key de la comunidad
        - communityID --> ID de la comunidad a obtener
        - isCourse --> Boolean para filtrar por cursos
        - isSection --> Boolean para filtrar por secciones

        */

        if(requestData.communityID != null){
            this.where.id = requestData.communityID
        }

        if (requestData.communitySlug != null) {
            this.where.slug = requestData.communitySlug;
        }

        if (requestData.isCourse != null) {
            this.where.is_course = requestData.isCourse;
        }

        if (requestData.isSection != null) {
            this.where.is_course = requestData.isSection;
        }

        return this.returnGetData();
    }
}