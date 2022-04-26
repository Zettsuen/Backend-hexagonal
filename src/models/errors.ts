export class ExpressErrors {
    public message: any;
    public status: number;

    constructor(message:any, status:number){
        this.message = message;
        this.status = status;
    }


}