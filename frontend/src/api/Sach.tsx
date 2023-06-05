import axios from 'axios'
import { book } from 'ionicons/icons';

export const bookApi=()=>{
    const api=axios.create({
        baseURL:'http://localhost:3000/saches'
    })
    
    const getBooks= async():Promise<any>=>{
        const result= await api.get('/');
        return result;
    }

    const getBookssortByLuotThue=async():Promise<any>=>{
        const resul=await api.get('?filter=%7B%0A%20%20%22limit%22%3A%206%2C%0A%0A%20%20%22order%22%3A%20%22LuotThue%20DESC%22%0A%20%20%0A%7D')
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })
        return resul;
    }
    
    const getBookssortByNgayPhatHanh=async():Promise<any>=>{
        const resul=await api.get('?filter=%7B%0A%20%20%22limit%22%3A6%2C%0A%20%20%22order%22%3A%20%22NgayPhatHanh%20DESC%22%0A%20%0A%7D')
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })
        return resul;
    }

    const getBookssortByLuotThich=async():Promise<any>=>{
        const resul=await api.get('?filter=%7B%0A%0A%20%20%22limit%22%3A%2010%2C%0A%0A%20%20%22order%22%3A%20%22LuotThich%20DESC%22%0A%20%0A%7D')
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })
        return resul;
    }


    const getBookWithSlug=async(slug:string):Promise<any>=>{
        const resul=await api.get(`?filter=%7B%0A%20%20%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22slug%22%3A%22${slug}%22%0A%20%20%7D%0A%7D`)
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })
        return resul;
    }

    return {
        getBooks,
        getBookssortByLuotThue,
        getBookssortByNgayPhatHanh,
        getBookssortByLuotThich,
        getBookWithSlug
    }
}
export default bookApi;