import { dataRenderer } from "../utils/dataRenderer";
import { Members } from "../services/members/members";
import { getMembers } from "../helpers/members";
import { Server, Socket } from "socket.io";

export class Chat {
    #io:Server

    constructor(server:any){
        this.#io = new Server(server,  {
            cors: {
              origin: 'http://localhost:8080',
              credentials: true
            }});;
        this.initialize();
    }

    initialize(){
        this.#io.on('connection', (socket:Socket) => {
            console.log("Conexion")
            socket.on("message", async (data: { memberKey: string, communitySlug: string, msg: any }) => {
                await onMessage(data, socket);
            });
        });
    }

}



    // Cuando los usuarios se conectan al socket necesito obtener su miembro utilizando su memberKey.
    // Para ello voy a recibir su memberKey y llamaré al helper de members para obtener su miembro.

    async function onMessage(data: { memberKey: string, communitySlug: string, msg: any, secondMemberKey?: string }, socket:Socket) {

        try{

        const conditions = new Members({ memberKey: data.memberKey, communitySlug: data.communitySlug }).getMembersParams();

        const member: any = dataRenderer((await getMembers(conditions))[0])[0].member[0];

        if (member == null) {
            socket.emit("error", {
                message: "error"
            })
        }
        
        socket.emit("received", {
            memberData: {
                key: member.key,
                username: member.username,
                avatarUrl: member.avatarUrl
    
            },
            message: data.msg
        });
    }catch(e){
        console.log(e)
    }
    }




