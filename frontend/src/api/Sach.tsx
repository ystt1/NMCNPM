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

    


    return {
        getBooks
    }
}
export default bookApi;