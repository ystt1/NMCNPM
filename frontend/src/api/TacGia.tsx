import axios from 'axios'
import { book } from 'ionicons/icons';

export const authorApi=()=>{
    const api=axios.create({
        baseURL:'http://localhost:3000/tacgia'
    })
    
    const getAuthor= async():Promise<any>=>{
        const result= await api.get('/');
        return result;
    }

    const getAthorWithId=async(id:string):Promise<any>=>{
        const resul=await api.get(`/${id}`)
        .then(res=>{
            return res;
        })
        .catch(error=>{
            
            return false;
        })
        
        return resul;
    }

    


    return {
        getAuthor,getAthorWithId
    }
}
export default authorApi;