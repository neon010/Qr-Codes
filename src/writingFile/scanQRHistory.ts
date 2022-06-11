import RNFS from 'react-native-fs';

let myScanHistory={};


let scanQrCodeHistoryFile = RNFS.DocumentDirectoryPath + "scanHistory.json";



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

        const fileAlreadyExist:any = []

        Object.keys(previousData).forEach((key:any)=>{
            const scantimeDateString = new Date(data.scantime).toLocaleDateString();
            const datatime = new Date(previousData[key].time).toLocaleDateString();



            if(scantimeDateString == datatime){
                const scantimeTimeString = new Date(data.scantime).toLocaleTimeString();
                const datatimeTimeString = new Date(previousData[key].time).toLocaleTimeString();

                if(scantimeTimeString == datatimeTimeString){
                    fileAlreadyExist.push(scantimeTimeString);
                }
            }

        })



        if(fileAlreadyExist.length > 0){
            return {data:previousData, code:200}
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




export const deleteScanHistory = async (id:string):Promise<response>=>{
    try {
        const response = await getScanHistory();

        let myScanHistory:any;
    
        if(response.code === 200 && response.data){
            myScanHistory = response.data
        }else{
            throw new Error("File not found")
        }
    
        delete myScanHistory[id]

        RNFS.writeFile(scanQrCodeHistoryFile, JSON.stringify(myScanHistory), 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });

        return {data:myScanHistory, code:200}
    } catch (error) {

        return {error:"something went wrong", code:400}
    }
}