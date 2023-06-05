import React, { useEffect, useState } from 'react';
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import bookApi from '../api/Sach';
import './Home.css';
import HeaderComp from '../components/Header';
import authorApi from '../api/TacGia';
import { arrowForwardCircleOutline, arrowBackCircleOutline } from 'ionicons/icons';





const Home: React.FC = () => {
  const [books, setBooks] = useState<any>([{}]);
  const [randBooks, setRandBooks] = useState<any>([{}]);
  const [randBooks2, setRandBooks2] = useState<any>([{}]);
  const [booksMostView, setBooksMostView] = useState<any>([{}]);
  const [booksNewest, setBooksNewest] = useState<any>([{}]);
  const [booksMostLike,setBooksMostLike]=useState<any>([{}]);
  const { getBooks, getBookssortByLuotThue, getBookssortByNgayPhatHanh,getBookssortByLuotThich } = bookApi()
  const { getAthorWithId } = authorApi()

  const getListBooks = async () => {
    const res = await getBooks();
    setBooks([...res.data]);
  }
  const getListBooksMostViewed = async () => {
    const res = await getBookssortByLuotThue();
    if (res.data) {
      res.data.map(async (item: any) => {
        const author = await getAthorWithId(item.idTacGia)
        if (author) {
          item.TacGia = author.data.Ten;
        }

      })
    }
    setBooksMostView([...res.data])
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
    setBooksNewest([...res.data])
  }

  const getListBooksMostLike = async () => {
    const res = await getBookssortByLuotThich();
    
    if (res.data) {
      res.data.map(async (item: any) => {
        const author = await getAthorWithId(item.idTacGia)
        if (author) {
          item.TacGia = author.data.Ten;
        }
      })
    }

    
    setBooksMostLike([...res.data])
  }

  useEffect(() => {
    getListBooks();
    getListBooksMostViewed();
    getListBooksNewest();
    getListBooksMostLike();
  }, []);
  useEffect(() => {
    const flag = books.length;
    const resul = [];
    const resul2 = [];
    if (flag > 1) {
      const flagbooks = books;
      for (let i = 0; i < 4; i++) {
        const randomNumber = Math.floor(Math.random() * flagbooks.length);
        const randomItem = flagbooks.slice(randomNumber, randomNumber + 1)[0];
        getAu(randomItem)
        resul.push(randomItem);
        flagbooks.splice(randomNumber, 1);
      }
      setRandBooks([...resul])
      for (let i = 0; i < 4; i++) {
        const randomNumber = Math.floor(Math.random() * flagbooks.length);
        const randomItem = flagbooks.slice(randomNumber, randomNumber + 1)[0];
        getAu(randomItem)
        resul2.push(randomItem);
        flagbooks.splice(randomNumber, 1);
      }
      setRandBooks2([...resul2]);
    }
  }, [books]);

  const getAu = async (randomItem: any) => {
    const author = await getAthorWithId(randomItem.idTacGia)
    if (author != false) {
      const newData = { ...randomItem, TacGia: author.data.Ten };
      setRandBooks((prev: any) =>
        prev.map((item: any) => (item.id === randomItem.id ? newData : item))
      );
    }
  }

  const onClickNextRandBook = () => {
    const flag = randBooks;
    setRandBooks([randBooks[1], randBooks2[1], randBooks[3], randBooks2[3]]);
    setRandBooks2([flag[0], randBooks2[0], flag[2], randBooks2[2]]);
  }

  const onClickBackRandBook = () => {
    const flag = randBooks;
    setRandBooks([randBooks2[0], randBooks[0], randBooks2[2], randBooks[2]]);
    setRandBooks2([randBooks2[1], flag[1], randBooks2[3], flag[3]]);
  }

  const onCLickNextBookMostViewed = () => {
    const flag = booksMostView;
    setBooksMostView([...flag.slice(1, flag.length), flag[0]])
  }

  const onCLickBackBookMostViewed = () => {
    const flag = booksMostView;
    setBooksMostView([flag[flag.length-1],...flag.slice(0, flag.length-1)])
  }


  const onCLickNextBookNewest = () => {
    const flag = booksNewest;
    setBooksNewest([...flag.slice(1, flag.length), flag[0]])
  }

  const onCLickBackBookNewest = () => {
    const flag = booksNewest;
    setBooksNewest([flag[flag.length-1],...flag.slice(0, flag.length-1)])
  }

  return (
    <IonPage >
      <HeaderComp></HeaderComp>
      <IonContent fullscreen className='content'>

        <IonItem className='listRand'>
          <IonGrid>
            <IonRow>
              <IonCol size='9'> <IonGrid>
                <IonRow>
                  {randBooks.slice(0, 2).map((item: any) => {
                    return <IonCol key={item.id}>
                      <IonCard className='card' routerLink={`/sach/${item.slug}`}>
                        <IonGrid>
                          <IonRow>
                            <IonCol size='3'>
                              <img className='image' alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                            </IonCol>
                            <IonCol className='MoTa'>
                              {item.MoTa}
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                        <IonCardHeader>
                          <IonCardTitle>{item.Ten}

                          </IonCardTitle>
                          <IonCardSubtitle>{item.TacGia || "không rõ"}</IonCardSubtitle>
                        </IonCardHeader>
                      </IonCard>

                    </IonCol>
                  })}

                </IonRow>
                <IonRow >
                  <IonCol size='2'> <IonIcon size='large' onClick={() => { onClickBackRandBook() }} icon={arrowBackCircleOutline}></IonIcon> </IonCol>
                  <IonCol size='9'></IonCol>
                  <IonCol size='1'><IonIcon size='large' onClick={() => { onClickNextRandBook() }} icon={arrowForwardCircleOutline}></IonIcon>
                  </IonCol></IonRow>
                <IonRow >
                  {randBooks.slice(2, 4).map((item: any) => {
                    return <IonCol key={item.id}>
                      <IonCard  routerLink={`/sach/${item.slug}`} className='card' >
                        <IonGrid>
                          <IonRow>
                            <IonCol size='4'>
                              <img className='image' alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                            </IonCol>
                            <IonCol className='MoTa2'>
                              {item.MoTa}
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                        <IonCardHeader>
                          <IonCardTitle>{item.Ten}
                          </IonCardTitle>
                          <IonCardSubtitle>{item.TacGia || "không rõ"}</IonCardSubtitle>
                        </IonCardHeader>
                      </IonCard>
                    </IonCol>
                  })}
                </IonRow>




              </IonGrid>
              </IonCol>
              <IonCol className='sachyeuthich'><IonList>
                <IonListHeader >
                  <IonLabel id='header'>
                  Sách được yêu thích
                  </IonLabel></IonListHeader>
                {booksMostLike.map((item:any)=>{return (
                  <IonItem  routerLink={`/sach/${item.slug}`} key={item.id}>
                  <IonAvatar slot='start'>
                  <img className='image' alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                  </IonAvatar>
                  <IonLabel id='label'>{item.Ten}</IonLabel>
                </IonItem>
                )})}
                
              </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>



        <IonItem className='HotandNew'>
          <IonGrid>
            <IonRow>
              <IonCol size='6'>
                <IonGrid id='grid'>
                  <IonRow>
                    <IonCol size='12'>
                    <IonLabel id='label'>
                      Hot
                    </IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol id='icon' size='0.5'>
                      <IonIcon onClick={()=>{onCLickBackBookMostViewed()}} icon={arrowBackCircleOutline}></IonIcon>
                    </IonCol>
                    {booksMostView.slice(0, 2).map((item: any) => {
                      return <IonCol size='5.5' key={item.id}>
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
                    <IonCol size='0.5' id='icon'>
                      <IonIcon onClick={() => { onCLickNextBookMostViewed() }} icon={arrowForwardCircleOutline}></IonIcon>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>




              <IonCol size='6'>
              <IonGrid id='grid'>
              <IonRow>
                    <IonCol size='12'>
                    <IonLabel id='label'>
                      Sách Mới Ra
                    </IonLabel>
                    </IonCol>
                  </IonRow>
                    <IonRow>  
                      <IonCol id='icon' size='0.5'>
                        <IonIcon onClick={()=>{onCLickBackBookNewest()}} icon={arrowBackCircleOutline}></IonIcon>
                      </IonCol>
                    {booksNewest.slice(0, 2).map((item: any) => {
                    return <IonCol size='5.5' key={item.id}>
                      <IonCard routerLink={`/sach/${item.slug}`} id='card'>
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
                  <IonCol size='0.5' id='icon'>
                        <IonIcon onClick={()=>{onCLickNextBookNewest()}} icon={arrowForwardCircleOutline}></IonIcon>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
              </IonCol>
              <IonCol>
              </IonCol>

            </IonRow>
          </IonGrid>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
