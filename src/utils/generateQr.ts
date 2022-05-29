import RNQRGenerator from 'rn-qr-generator';

export const generateQr = async (text:string) => {
    let error, uri;

    if (!text.trim()) {
        error = 'value cannot be empty';

      return;
    }

    await RNQRGenerator.generate({
      value: text,
      height: 300,
      width: 300,
      base64: true,
      backgroundColor: 'white',
      color: 'black',
      correctionLevel: 'M',
      // padding: {
      //   top: 0,
      //   left: 0,
      //   bottom: 0,
      //   right: 0,
      // }
    })
      .then((response) => {
        uri = response.uri;
        // console.log({uri})
      })
      .catch((err) => error= err.message);

    if(error){
        return {error};
    }else{
        return uri;
    }
  };