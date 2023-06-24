import axios from 'axios'
import { book, idCard } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { authorApi } from "./TacGia";

export const boSachApi = () => {

    const api = axios.create({
        baseURL: 'http://localhost:3000/bo-saches'
    })

    const getBoSachLike=async(key:string)=>{
        const resul=await api.get(`?filter={"where": { "Ten":{"like":"${key}","options":"i"}}}`)

        .then(res=>{         
            return res;
        })
        .catch(error=>{
            
            return error;
        })
        
        return resul;
    }


    const getBoSachWithSlug=async(slug:string)=>{
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

    const UpLoadBoSach=async(author:any)=>{
        const flag=await getBoSachWithSlug(author.slug)
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
        getBoSachLike,UpLoadBoSach
    }
}
export default boSachApi;