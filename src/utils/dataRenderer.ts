const { toCamelCase} = require('js-convert-case');


/*
    Está función sirve para renderizar los datos. Los datos que puede recibir son un array o un objeto. Dependiendo del tipo
    de dato inicial que reciba hará una acción u otra para poder tratarlo. Una vez está tratando el tipo de dato principal
    hara lo siguiente:
    
    1 - Convertir los parametros de cada objeto en cammelCase
    2 - Eliminar el ID y el deleted_at
    3 - hacer parseJSON a todos los campos que se requiera (Empiezan por { o por [ )
    4 - Convierte a fecha todos los campos que acaben en At o contengan "date"
    5 - Convierte en Boolean todos los campos que empiezen por is
    
    Estas normas generales deben ser aplicadas en DB.

*/
export const dataRenderer = (data : any) => {

    const resultToSend = []

    if(Array.isArray(data)){  

    for(let row of data){
        for(let values in row){
            const newValues = toCamelCase(values);
            row[newValues] = row[values];
            delete row[values];
            values = newValues;
            
            if(values === "id" || values === "deletedAt"){
                delete row[values];
            }
            if(typeof row[values] === "string" && row[values].indexOf("{") === 0){
                row[values] = parseJSONFromLongText(row[values])
            }
            if(typeof row[values] === "string" && row[values].indexOf("[") === 0){
                row[values] = parseJSONFromLongText(row[values])
            }
            if((values.endsWith("At") || values.indexOf("date") === 0) && row[values] != null){
                row[values] = row[values].getTime();
            }
            if(values.indexOf("is") === 0){
                row[values] = !!row[values];
            }
        }
        resultToSend.push({row});
    }
}else{
    for(let values in data){

        const newValues = toCamelCase(values);
            data[newValues] = data[values];
            delete data[values];
            values = newValues;

        if(values === "id" || values === "deletedAt"){
            delete data[values];
        }
        if(typeof data[values] === "string" && data[values].indexOf("{") === 0){
            data[values] = parseJSONFromLongText(data[values])
        }
        if(typeof data[values] === "string" && data[values].indexOf("[") === 0){
            data[values] = parseJSONFromLongText(data[values])
        }
        if((values.endsWith("At") || values.indexOf("date") === 0) && data[values] != null){
            data[values] = data[values].getTime();
        }
        if(values.indexOf("is") === 0){
            data[values] = !!data[values];
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