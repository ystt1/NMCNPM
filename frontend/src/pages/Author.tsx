import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { bookApi } from '../api/Sach'
import { v4 } from 'uuid'
import authorApi from '../api/TacGia';
import CardSearch from '../components/CardInSearch';
import HeaderComp from '../components/Header';

const Author: React.FC = () => {
    const { slugTacGia } = useParams<{ slugTacGia: string }>();
    const { pageNumber } = useParams<{ pageNumber: string }>();
    const currentNumber=Number(pageNumber)||1;
    const { getLengthWithAuthor,searchingBookWithAuthorSlug} = bookApi();
    const { getAthorWithId,getAuthorWithSlug } = authorApi()
    const [searchBook, setSearchBook] = useState<any>([{}]);
    const [totalPage,setTotalPage]=useState(0);
    useEffect(() => {
        getBooks()
        getTotalPage()
    }, [])


    useEffect(()=>{
        getBooks()
        getTotalPage()
    },[pageNumber])

    useEffect(() => {
        getTotalPage()
    }, [searchBook])

    const getTotalPage=async()=>{
        const res=await getLengthWithAuthor(slugTacGia);
        let flag=1;
        flag=Number(Math.ceil(res.data.count/4));    
        setTotalPage(flag)
    }



    const pages = []
    const start = Math.max(1, currentNumber - 2);
    const end = Math.min(totalPage, currentNumber + 2);
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }
  
   
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  
    
    if (end < totalPage) {
      if (end < totalPage - 1) {
        pages.push('...');
      }
      pages.push(totalPage);
    }
  
    const getBooks = async () => {
        const res: any = await searchingBookWithAuthorSlug(slugTacGia,pageNumber);
        const flag:any[]=[]
        const author=await getAuthorWithSlug(slugTacGia)        
        if (res.data) {
            flag.push([...res.data]);
            const updatedBooks = await Promise.all(
              flag[0].map(async (item: any) => {
                if (author) {
                  item.TacGia = author.data[0].Ten;
                }
                else{
                    item.TacGia="không rõ"
                }
                return item;
              })
            );
            setSearchBook([...updatedBooks]);
        }
    }



    
    return (
        <IonPage>
            <IonHeader style={{ height: '110px' }}>
            <HeaderComp></HeaderComp>
            </IonHeader>
            <IonContent fullscreen className='Content'>
                {searchBook.map((item: any) => {
                    return (
                        <CardSearch prop={item} key={v4()}/>
                    );
                })}
                <IonGrid >
                <IonButton  disabled={1 === currentNumber}
                routerLink={`/tac-gia/${slugTacGia}/${currentNumber-1}`}>{"<"}</IonButton>  
                {pages.map((page, index) => (
        <IonButton
          key={index}
          disabled={page === currentNumber || page === '...'}
                    routerLink={`/tac-gia/${slugTacGia}/${page}`}
        >
          {page}
        </IonButton>
      ))}
      <IonButton  disabled={totalPage === currentNumber }
      routerLink={`/tac-gia/${slugTacGia}/${currentNumber+1}`}
      >{">"}</IonButton> 
    </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Author;