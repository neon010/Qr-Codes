import RNFS from 'react-native-fs';

let myScanHistory={};
let myCreateQrCodeHistory={}

let scanQrCodeHistoryFile = RNFS.DocumentDirectoryPath + "scanHistory.json";
let createQrCodeHistoryFile = RNFS.DocumentDirectoryPath + "createHistory.json";


interface response{
    data?:any
    code:number
    error?:any
}

export const addScanHistory = async (data:any):Promise<response> =>{
    try {
        const response = await getScanHistory();

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
                content:data.content,
                time: new Date()
            }
        }

        const allScan = Object.assign(myScanHistory,myScan)

        RNFS.writeFile(scanQrCodeHistoryFile, JSON.stringify(allScan), 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });

        // FileSystem.writeAsStringAsync(filename, 
        //     JSON.stringify(allBook), 
        //     {encoding:FileSystem.EncodingType.UTF8}
        // )

        return {data:allScan, code:200}
    } catch (error) {

        return {error:"something went wrong", code:400}
    }
}

export const getScanHistory = async ():Promise<response> => {
    try {
        const fileInfo = await RNFS.exists(scanQrCodeHistoryFile);

        if(fileInfo){
            const data = await RNFS.readFile(scanQrCodeHistoryFile)
            const allScan = JSON.parse(data);
            return {data:allScan, code:200}
        }else{
            throw new Error("File not found")
        }
    } catch (error) {

        return {error:"File not Found", code:400}
    }
}

export const createQrCodeHistory = async (data:any):Promise<response> =>{
    try {
        const response = await getScanHistory();

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

        // FileSystem.writeAsStringAsync(filename, 
        //     JSON.stringify(allBook), 
        //     {encoding:FileSystem.EncodingType.UTF8}
        // )

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