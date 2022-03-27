export class ParamConfigs {

        public where: any = {};
        public include: any = {};
        public skip: any;
        public take: any;
        public orderBy: any = {};
        public data: any = {};
        public requestData: any;
    
        constructor(requestData: any) {
            this.requestData = requestData;
            this.skip = requestData.count ?? 0;
            this.take = requestData.offset ?? 15;
            if (requestData.page != null) {
                requestData.page = isNaN(requestData.page) ? parseInt(requestData.page) : requestData.page;
                this.skip = this.take * (requestData.page - 1);
            }
    
        }

         /*
    
        Función global para retornar los datos.
    
        */

    returnData(){
        return { 
            where: Object.keys(this.where).length > 0 ? this.where : undefined,
            include: Object.keys(this.include).length > 0 ? this.include : undefined,
            skip: this.skip,
            take: this.take,
            orderBy: Object.keys(this.orderBy).length > 0 ? this.orderBy : undefined 
        };
    }
}