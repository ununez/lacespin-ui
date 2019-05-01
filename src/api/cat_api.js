 import axios from 'axios';

 async function  getResponse(url){

    const result=await axios.get(url);
        try{
            return result;
        }
        catch{
            return result;
        }
}



export {getResponse}