import RNQRGenerator from 'rn-qr-generator';

export const generateQr = async (text:string) => {
    let error, uri;

    if (!text.trim()) {
        error = 'value cannot be empty';

      return;
    }

    await RNQRGenerator.generate({
      value: text,
      height: 250,
      width: 250,
      base64: true,
      backgroundColor: 'white',
      color: 'black',
      correctionLevel: 'M',
      padding: {
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
      }
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