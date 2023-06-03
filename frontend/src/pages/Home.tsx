import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import bookApi from '../api/Sach';
import './Home.css';
import HeaderComp from '../components/Header';
import authorApi from '../api/TacGia';
import { arrowForwardCircleOutline, arrowBackCircleOutline } from 'ionicons/icons';





const Home: React.FC = () => {
  const [books, setBooks] = useState<any>([{}]);
  const [randBooks, setRandBooks] = useState<any>([{}]);
  const [randBooks2, setRandBooks2] = useState<any>([{}]);
  const { getBooks } = bookApi()
  const { getAthorWithId } = authorApi()

  const getListBooks = async () => {
    const res = await getBooks();
    setBooks([...res.data]);
  }

  useEffect(() => {
    getListBooks();
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
                      <IonCard className='card' >
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
                      <IonCard className='card' >
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
                <IonListHeader id='header'>Sách được yêu thích</IonListHeader>
              </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>

        <IonItem className='HotandNew'>
          <IonGrid>
            <IonRow>
              <IonCol>
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
