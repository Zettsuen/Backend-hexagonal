
export const dataRenderer = (data : any) => {

    const resultToSend = []

    if(Array.isArray(data)){

    for(let row of data){
        for(let values in row){
            if(values === "id"){
                delete row[values];
            }
            if(typeof row[values] === "string" && row[values].indexOf("{") === 0){
                row[values] = parseJSONFromLongText(row[values])
            }
            if(typeof row[values] === "string" && row[values].indexOf("[") === 0){
                row[values] = parseJSONFromLongText(row[values])
            }
        }
        resultToSend.push(row);
    }
}else{
    for(let values in data){
        if(values === "id"){
            delete data[values];
        }
        if(typeof data[values] === "string" && data[values].indexOf("{") === 0){
            data[values] = parseJSONFromLongText(data[values])
        }
        if(typeof data[values] === "string" && data[values].indexOf("[") === 0){
            data[values] = parseJSONFromLongText(data[values])
        }
    }

    resultToSend.push(data);
}

    return resultToSend;
}

export function parseJSONFromLongText(value:string|{[x:string]: any}){
    if(value === "[]"){
        return null;
    }else if(typeof(value) === "string"){
        try{
            return JSON.parse(value);
        }catch(err){
            return value;
        }
    }else{
        return value;
    }
}