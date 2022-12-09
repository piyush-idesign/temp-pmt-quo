
export function whatsAppApi (number){
    return `https://api.whatsapp.com/send?phone=91${number}&text=Hi%2C+Greetings`
}
const expf = {
    api: process.env.REACT_APP_API_URL,
    // api: "http://localhost:3900/api",
    apiurl: process.env.REACT_APP_URL,
    proapi: "https://pro-api.idesign.market",
    quoapi : "https://quotation-api.idesign.market",
    pmt : "https://pmt.idesign.market",
    whatsAppApi
}

export default expf;

