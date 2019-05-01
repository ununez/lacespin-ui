import axios from 'axios';

async function Send_Info(info,url){
    const result = await axios.post(url,info);
    try{
        return result;
    }
    catch{
        return result;
    }

}

export {Send_Info}