import RNFS from 'react-native-fs';


let myCreateQrCodeHistory={}


let createQrCodeHistoryFile = RNFS.DocumentDirectoryPath + "createHistory.json";


interface response{
    data?:any
    code:number
    error?:any
}

export const createQrCodeHistory = async (data:any):Promise<response> =>{
    try {
        const response = await getCreateQrCodeHistory();

        let previousData:any;
    
        if(response.code === 200 && response.data){
            previousData = response.data
        }else{
            previousData = {}
        }

        const id = (Math.random()*100000000).toString();

        const myScan = {
            ...previousData,
            [id]:{
                uri:data.uri,
                content:data.content,
                time: new Date()
            }
        }

        const allScan = Object.assign(myCreateQrCodeHistory,myScan)

        RNFS.writeFile(createQrCodeHistoryFile, JSON.stringify(allScan), 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });

        return {data:allScan, code:200}
    } catch (error) {

        return {error:"something went wrong", code:400}
    }
}

export const getCreateQrCodeHistory = async ():Promise<response>=>{
    try {
        const fileInfo = await RNFS.exists(createQrCodeHistoryFile);

        if(fileInfo){
            const data = await RNFS.readFile(createQrCodeHistoryFile)

            const allScan = JSON.parse(data);

            return {data:allScan, code:200}
        }else{
            throw new Error("File not found")
        }
    } catch (error) {

        return {error:"File not Found", code:400}
    }
}

export const deleteCreatedQrHistory = async (id:string):Promise<response>=>{
    try {
        const response = await getCreateQrCodeHistory();

        let myCreateQrCodeHistory:any;
    
        if(response.code === 200 && response.data){
            myCreateQrCodeHistory = response.data
        }else{
            throw new Error("File not found")
        }
    
        delete myCreateQrCodeHistory[id]

        RNFS.writeFile(createQrCodeHistoryFile, JSON.stringify(myCreateQrCodeHistory), 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });

        return {data:myCreateQrCodeHistory, code:200}
    } catch (error) {

        return {error:"something went wrong", code:400}
    }
}

