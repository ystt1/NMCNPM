import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {bookApi} from '../api/Sach'
import {authorApi} from '../api/TacGia'
import HeaderComp from '../components/Header';
import './Detail.css'
import { arrowBackCircleOutline } from 'ionicons/icons';
import { v4 } from 'uuid';

const Detail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const {getBookWithSlug,getBookssortByNgayPhatHanh}=bookApi()
    const {getAthorWithId}=authorApi()
    const [bookFound,setBookFound]=useState<any>({});
    const [url,setUrl]=useState("https://ionicframework.com/docs/img/demos/card-media.png")
    const [bookSuggest,setBookSuggest]=useState<any>([{}]);
    const history = useHistory();
    const pageNumber=1;


    useEffect(()=>{
        getBookbySlug();
        getListBooksNewest();
        
    },[])
    useEffect(()=>{
      if(bookFound.Anh)
      {
        setUrl(bookFound.Anh[0]);
      }
      else
      {
        setUrl("https://ionicframework.com/docs/img/demos/card-media.png")
      }
    },[bookFound])

    const getBookbySlug=async()=>{
        const resul=await getBookWithSlug(slug);
        if(resul.data)
        {
            const author=await getAthorWithId(resul.data[0].idTacGia)        
            if(author)
            {
                resul.data[0].TacGia=author.data.Ten;
                resul.data[0].slugTacGia=author.data.slug;
            }
            setBookFound(resul.data[0]);
        }
    }
  
    

    const getListBooksNewest = async () => {
        const res = await getBookssortByNgayPhatHanh();
        if (res.data) {
          res.data.map(async (item: any) => {
            const author = await getAthorWithId(item.idTacGia)
            if (author) {
              item.TacGia = author.data.Ten;
            }
    
          })
        }
        setBookSuggest([...res.data])
      }

    const bigImage=(url:string)=>
    {
        return(
            <img id='image' alt="Silhouette of mountains" src={url} />
        )
    }

  

   
    
  const handleOnclickAuthor=()=>{
    if(bookFound.TacGia && bookFound.slugTacGia)
    { 
      history.push(`tac-gia/${bookFound.slugTacGia}/${pageNumber}`)
    }
  }

    return (
        <IonPage>
            <HeaderComp/>
            <IonContent fullscreen className="content">
                <IonItem className='item-content'>
                <IonGrid >
                    <IonRow>
                        <IonCol size='7.5' id='col1'>
                            <IonGrid>
                            <IonRow>
                                <IonCol size='3' id='col1'>
                                    <IonItem id='itemImg'>
                                    {bigImage(url)}
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonLabel id='labelName'>
                                    {bookFound.Ten||"Tên sách"}
                                    </IonLabel>

                                    {(bookFound.TacGia&&bookFound.slugTacGia&&
                                    (
                                        <IonItem routerLink={`/tac-gia/${bookFound.slugTacGia}/${pageNumber}`}>
                                          <IonLabel>
                                          {bookFound.TacGia}
                                          </IonLabel>
                                    </IonItem>
                                    )) || (<IonLabel>
                                    Không rõ
                              </IonLabel>)}
                                    
                               
                                    <IonLabel>
                                    {bookFound.Gia||"Giá"}
                                    </IonLabel>
                                    <IonLabel>
                                    Thể Loại:
                                    </IonLabel>
                                    <IonItem>
                                        {bookFound.Anh&&bookFound.Anh.map((item:any)=>{
                                            return(
                                                <img id='img' key={item} src={item} onClick={()=>{setUrl(item)}} ></img>
                                            )
                                        })}
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol><IonButton color='success'>Đặt trước</IonButton></IonCol>
                                <IonCol>Lượt thích</IonCol>
                                <IonCol>Lượt Thuê: {bookFound.LuotThue}</IonCol>
                            </IonRow>
                            </IonGrid>
                        </IonCol >
                        <IonCol>
                           <h1>Mô tả</h1>
                            <IonLabel id='label' className='wrap'>  
                            {bookFound.MoTa||"Mô tả"}                    
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                </IonItem>





                <IonItem className='suggestBook'>
                <IonGrid id='grid'>
                  <IonRow>
                    <IonCol size='12'>
                    <IonLabel id='label'>
                      Sách gợi ý
                    </IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    
                    {bookSuggest.slice(0, 4).map((item: any) => {
                      return <IonCol size='3' key={v4()}>
                        <IonCard  routerLink={`/sach/${item.slug}`} id='card'>
                          <IonGrid>
                            <IonRow>
                              <IonCol size='5.5'>
                              {item.Anh && item.Anh[0] ? (
                                <img className='image' alt="Silhouette of mountains" src={item.Anh[0]} />
                              ) : (
                                <img className='image' alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />)}
                              </IonCol>
                              <IonCol id='MoTa'>
                                {item.MoTa}
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                          <IonCardHeader>
                            <IonCardTitle>{item.Ten}
                            </IonCardTitle>
                            <IonRow>
                              <IonCol>
                                <IonCardSubtitle>{item.TacGia || "không rõ"}</IonCardSubtitle>
                              </IonCol>
                              <IonCol>
                                <IonCardSubtitle>Lượt Thuê:{item.LuotThue}</IonCardSubtitle>
                              </IonCol>
                            </IonRow>
                          </IonCardHeader>
                        </IonCard>
                      </IonCol>
                    })}
                    </IonRow>
                    </IonGrid>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Detail;