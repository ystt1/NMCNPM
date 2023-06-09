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

    const getAuthorLike=async(key:string)=>{
        const resul=await api.get(`?filter={"where": { "Ten":{"like":"${key}","options":"i"}}}`)
        
        .then(res=>{         
            return res;
        })
        .catch(error=>{
            
            return error;
        })
        
        return resul;
    }


    const getAuthorWithSlug=async(slug:string)=>{
        const resul=await api.get(`?filter={
            "where": {
              "slug":"${slug}"
            }
          }`)
        
        .then(res=>{         
            return res;
        })
        .catch(error=>{
            
            return error;
        })
        
        return resul;
    }


    const UpLoadAuthor=async(author:any)=>{
        const flag=await getAuthorWithSlug(author.slug)
        if(flag.data.length==0)
        {const res=await api.post('/',author)
        .then(resul=>{
            return resul
        })
        .catch(error=>{
            return error;
        })
        return res;
    }
    return false
    }


    return {
        getAuthor,getAthorWithId,getAuthorLike,getAuthorWithSlug,UpLoadAuthor
    }
}
export default authorApi;