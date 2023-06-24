import axios from 'axios'
import { book, idCard } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { authorApi } from "./TacGia";

export const bookApi = () => {
    const { getAuthorLike, getAuthorWithSlug } = authorApi()
    const api = axios.create({
        baseURL: 'http://localhost:3000/saches'
    })



    const getBooks = async (): Promise<any> => {
        const result = await api.get('/')
            .then(res => {
                return res;
            })
            .catch(error => {
                return error;
            })
        return result;
    }

   

    const getBookssortByLuotThue = async (): Promise<any> => {
        const resul = await api.get('?filter=%7B%0A%20%20%22limit%22%3A%206%2C%0A%0A%20%20%22order%22%3A%20%22LuotThue%20DESC%22%0A%20%20%0A%7D')
            .then(res => {
                return res;
            })
            .catch(error => {
                return error;
            })
        return resul;
    }

    const getBookssortByNgayPhatHanh = async (): Promise<any> => {
        const resul = await api.get('?filter=%7B%0A%20%20%22limit%22%3A6%2C%0A%20%20%22order%22%3A%20%22NgayPhatHanh%20DESC%22%0A%20%0A%7D')
            .then(res => {
                return res;
            })
            .catch(error => {
                return error;
            })
        return resul;
    }

    const getBookssortByLuotThich = async (): Promise<any> => {
        const resul = await api.get('?filter=%7B%0A%0A%20%20%22limit%22%3A%2010%2C%0A%0A%20%20%22order%22%3A%20%22LuotThich%20DESC%22%0A%20%0A%7D')
            .then(res => {
                return res;
            })
            .catch(error => {
                return error;
            })
        return resul;
    }


    const getBookWithSlug = async (slug: string): Promise<any> => {
        const resul = await api.get(`?filter=%7B%0A%20%20%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22slug%22%3A%22${slug}%22%0A%20%20%7D%0A%7D`)
            .then(res => {
                return res;
            })
            .catch(error => {
                return error;
            })
        return resul;
    }


    const searchingBook = async (search: string, pageNumber: string,sort:number) => {

        //tim author
        let page = 1;
        if (Number(pageNumber)) {
            page = Number(pageNumber)
        }
        const ans: any = await getAuthorLike(search);
        let order='';
        if(sort!=0)
        {
            order="\"order\" :"
            switch(sort){
                case(1):{
                    order+="\"LuotThich DESC\""
                    break;
                }
                case(-1):{
                    order+="\"LuotThich ASC\""
                    break;
                }
                case(2):{
                    order+="\"LuotThue DESC\""
                    break;
                }
                case(-2):{
                    order+="\"LuotThue ASC\""
                    break;
                }
                case(3):{
                    order+="\"NgayPhatHanh DESC\""
                    break;
                }
                case(-3):{
                    order+="\"NgayPhatHanh ASC\""
                    break;
                }
            }
            order+=",";
        }
        const idTacGia: string[] = []
        if (ans.data) {
            ans.data.map((item: any) => {
                idTacGia.push(item.id)
            })
        }
        const response = await api.get(`?filter={"limit": 4,${order}"skip": ${(page - 1) * 4}, "where": {"or":[ {"Ten":{"like": "${search}","options":"i"}}, {"idTacGia":{"inq": ${JSON.stringify(idTacGia)}}} ] } }`)
            .then(res => {
                return res
            })
            .catch(error => {
                return error
            })
        return response;
    }

    const getLength = async (search: string) => {
        const ans: any = await getAuthorLike(search);
        const idTacGia: string[] = []
        if (ans.data) {
            ans.data.map((item: any) => {
                idTacGia.push(item.id)
            })
        }
        const response = await api.get(`/count?where= {"or":[ {"Ten":{"like": "${search}","options":"i"}}, {"idTacGia":{"inq": ${JSON.stringify(idTacGia)}}} ] } `)
            .then(res => {
                return res
            })
            .catch(error => {
                return error
            })
        return response;
    }

    const searchingBookWithAuthorSlug = async (slugTacGia: string, pageNumber: string,sort:number) => {

        //tim author
        let page = 1;
        if (Number(pageNumber)) {
            page = Number(pageNumber)
        }
        let order='';
        if(sort!=0)
        {
            order="\"order\" :"
            switch(sort){
                case(1):{
                    order+="\"LuotThich DESC\""
                    break;
                }
                case(-1):{
                    order+="\"LuotThich ASC\""
                    break;
                }
                case(2):{
                    order+="\"LuotThue DESC\""
                    break;
                }
                case(-2):{
                    order+="\"LuotThue ASC\""
                    break;
                }
                case(3):{
                    order+="\"NgayPhatHanh DESC\""
                    break;
                }
                case(-3):{
                    order+="\"NgayPhatHanh ASC\""
                    break;
                }
            }
            order+=",";
        }
        const ans: any = await getAuthorWithSlug(slugTacGia);  
        if(ans.data)
        {    
        const response = await api.get(`?filter={"limit": 4,${order}"skip": ${(page-1)*4}, "where": {"idTacGia":"${ans.data[0].id}"} } `)
            .then(res => {
                return res
            })
            .catch(error => {
                return error
            })
            return response;
        }
        
    }


    const getLengthWithAuthor = async (slugTacGia: string) => {

        //tim author
        const ans: any = await getAuthorWithSlug(slugTacGia);
        
        if (ans.data) {
            const response = await api.get(`/count?where= { "idTacGia":"${ans.data[0].id}"} `)
            .then(res => {
                return res
            })
            .catch(error => {
                return error
            })
        return response;
        }
       
    }



    const uploadBook=async(book:any)=>{
        const flag=await getBookWithSlug(book.slug)
        if(flag.data.length==0)
        {const res=await api.post('/',book)
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
        getBooks,
        getBookssortByLuotThue,
        getBookssortByNgayPhatHanh,
        getBookssortByLuotThich,
        getBookWithSlug,
        searchingBook,
        getLength,
        uploadBook,
        searchingBookWithAuthorSlug,
        getLengthWithAuthor,
        
    }
}
export default bookApi;