import { dataRenderer } from "../utils/dataRenderer";
import { Members } from "../services/members";
import { getMembers } from "../helpers/members";
import { Server, Socket } from "socket.io";

export class Chat {
    #io:Server

    constructor(socket:Server){
        this.#io = socket;
        this.initialize();
    }

    initialize(){
        this.#io.on('connection', (socket:Socket) => {
            socket.on("join", async (data: string) => {
                await Join(data, socket);
            });
            socket.on("message", async (data: { memberKey: string, communitySlug: string, msg: any }) => {
                await onMessage(data, socket, this.#io);
            });
        });
    }

}



    // Cuando los usuarios se conectan al socket necesito obtener su miembro utilizando su memberKey.
    // Para ello voy a recibir su memberKey y llamaré al helper de members para obtener su miembro.

    async function Join(communitySlug: string, socket: Socket){
        console.log("Joined to " + communitySlug)
        socket.join(communitySlug);
    }

    async function onMessage(data: { memberKey: string, communitySlug: string, msg: any, secondMemberKey?: string }, socket:Socket, io:Server) {

        try{
        console.log("Message at " + data.communitySlug)
        const conditions = new Members({ memberKey: data.memberKey, communitySlug: data.communitySlug }).getMembersParams();

        const member: any = dataRenderer((await getMembers(conditions))[0])[0].member[0];

        if (member == null) {
            socket.emit("error", {
                message: "error"
            })
        }

        io.to(data.communitySlug).emit("received", {
            memberData: {
                key: member.key,
                username: member.username,
                name: member.name,
                surname: member.surname,
                avatarUrl: member.avatarUrl
    
            },
            message: data.msg
        });
    }catch(e){
        console.log(e)
    }
    }




