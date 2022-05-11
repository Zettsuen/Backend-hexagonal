import { Server} from "socket.io";


export class Sockets {
    #io:Server

    constructor(server:any){
        this.#io = new Server(server,  {
            cors: {
              origin: 'http://localhost:8080',
              credentials: true
            }});
    }

    getSocket(){
        return this.#io;
    }

}