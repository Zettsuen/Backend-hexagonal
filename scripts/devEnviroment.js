const child_process = require("child_process");
const path = require("path");
const fs = require("fs");
const MARIADB_DOCKFILE_TAG = "10.5";
const MONGODB_DOCKFILE_TAG = "4.4.6";
const MARIADB_ROOT_PASSWORD = "root";
const MONGODB_ROOT_USERNAME = "root";
const MONGODB_ROOT_PASSWORD = "root";

function ensureDirectoryExist(name){
    try{
        const statCCDBDir = fs.statSync(`./${name}`);
        if(!statCCDBDir.isDirectory()){
            process.stderr.write(`The path ${path.resolve(`./${name}`)} must be a directory`)
            process.exit(1);
        }
    }catch(err){
        fs.mkdirSync(name);
    }
}

ensureDirectoryExist("ccdb-storage");
ensureDirectoryExist("comdb-storage");

const mariadbProc = child_process.execFile("docker",
    ["run", "-i", "-p", "127.0.0.1:3306:3306", "--name", "community-mariadb",
     "-e", `MYSQL_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD}`, 
     "-v", `${path.resolve("./ccdb-storage")}:/var/lib/mysql`, "--rm=true",
     "-d", `mariadb:${MARIADB_DOCKFILE_TAG}`]);

const mongodbProc = child_process.execFile("docker",
    ["run", "-i", "-p", "127.0.0.1:27017:27017", "--name", "community-mongodb",
     "-e", `MONGO_INITDB_ROOT_USERNAME=${MONGODB_ROOT_USERNAME}`, 
     "-e", `MONGO_INITDB_ROOT_PASSWORD=${MONGODB_ROOT_PASSWORD}`, 
     "-v", `${path.resolve("./comdb-storage")}:/data/db`, "--rm=true",
     "-d", `mongo:${MONGODB_DOCKFILE_TAG}`]);

process.on("beforeExit", () => {
    mariadbProc.kill("SIGTERM");
    mongodbProc.kill("SIGTERM");
});