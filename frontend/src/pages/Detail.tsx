import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {bookApi} from '../api/Sach'
import {authorApi} from '../api/TacGia'
import HeaderComp from '../components/Header';
import './Detail.css'
import { arrowBackCircleOutline } from 'ionicons/icons';

const Detail: React.FC = () => {
    const img=['https://i.pinimg.com/736x/11/e4/4d/11e44d85743b28fa62121b5ae71a914b.jpg','https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/anh-doremon.jpg?fit\u003d1080%2C2160\u0026ssl\u003d1','https://haycafe.vn/wp-content/uploads/2022/02/Anh-Avatar-Doremon-dep-ngau-cute.jpg','https://haycafe.vn/wp-content/uploads/2022/03/Hinh-ve-Doremon.jpg']
    const { slug } = useParams<{ slug: string }>();
    const {getBookWithSlug,getBookssortByNgayPhatHanh}=bookApi()
    const {getAthorWithId}=authorApi()
    const [bookFound,setBookFound]=useState<any>({});
    const [url,setUrl]=useState(img[0])
    const [bookSuggest,setBookSuggest]=useState<any>([{}]);
   


    useEffect(()=>{
        getBookbySlug();
        getListBooksNewest();
    },[])

    const getBookbySlug=async()=>{
        const resul=await getBookWithSlug(slug);
        if(resul.data)
        {
            const author=await getAthorWithId(resul.data[0].idTacGia)
            
            
            if(author)
            {
                resul.data[0].TacGia=author.data.Ten;
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
                                    <IonLabel>
                                    {bookFound.TacGia||"Tác Giả"}
                                    </IonLabel>
                                    <IonLabel>
                                    {bookFound.Gia||"Giá"}
                                    </IonLabel>
                                    <IonLabel>
                                    Thể Loại:
                                    </IonLabel>
                                    <IonItem>
                                        {img.map((item:any)=>{
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
                      return <IonCol size='3' key={item.id}>
                        <IonCard  routerLink={`/sach/${item.slug}`} id='card'>
                          <IonGrid>
                            <IonRow>
                              <IonCol size='5.5'>
                                <img id='image' alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
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