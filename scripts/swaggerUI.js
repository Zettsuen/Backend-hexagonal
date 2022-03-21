const child_process = require("child_process");
const path = require("path");
const fs = require("fs");

const dockerProc = child_process.execFile("docker",
    ["run", "-i", "-p", "127.0.0.1:8091:8080", "--name", "community-swaggerui",
     "-e", `SWAGGER_JSON=/swagger.yml`,  "--rm=true",
     "-v", `${path.resolve("./openapi.yml")}:/swagger.yml`, `swaggerapi/swagger-ui`]);

dockerProc.stdout.on("exit", (code, signal) => {
    if(code !== 0){
        console.log(`Swagger ended with code ${code} and signal ${signal}`);
    }
});

setTimeout(() => {
    console.log("Swagger UI should be ready on http://localhost:8091");
    if(process.platform === "darwin"){
        child_process.execFile("open", ["http://localhost:8091"]);
    }
}, 3000);

process.on("beforeExit", () => {
    child_process.execFile("docker",
        ["rm", "community-swaggerui"]);
})