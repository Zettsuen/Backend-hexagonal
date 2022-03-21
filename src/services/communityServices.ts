
export class Params {
    private where: any = {};
    private include: any = {};
    private skip: any;
    private take: any;
    private orderBy: any = {};
    private requestData: any;

    constructor(requestData: any) {
        this.requestData = requestData;
        this.skip = requestData.count ?? 0;
        this.take = requestData.offset ?? 15;
        if (requestData.page != null) {
            requestData.page = isNaN(requestData.page) ? parseInt(requestData.page) : requestData.page;
            this.skip = this.take * (requestData.page - 1);
        }
    }

    getCommunityParams(requestData = this.requestData) {
        if (requestData.communitySlug != null) {
            this.where.slug = requestData.communitySlug;
        }

        if (requestData.isCourse != null) {
            this.where.is_course = requestData.isCourse;
        }

        if (requestData.isSection != null) {
            this.where.is_course = requestData.isSection;
        }

        return { 
            where: Object.keys(this.where).length > 0 ? this.where : undefined,
            include: Object.keys(this.include).length > 0 ? this.include : undefined,
            skip: this.skip,
            take: this.take,
            orderBy: Object.keys(this.orderBy).length > 0 ? this.orderBy : undefined 
        };

    }
}