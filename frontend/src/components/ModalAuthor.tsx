import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonList, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import authorApi from '../api/TacGia';
import { v4 } from 'uuid';
import AddAuthor from './AddAuthor';
const AuthorModal: React.FunctionComponent<any> = ({isOpen,onClose,setTacGia}) => {
    const {getAuthorLike}=authorApi();
    const [author,setAuthor]=useState<any>([{}]);
    const [addAuthorModal,setAddAuthorModal]=useState(false)
    useEffect(()=>{setAuthor([])},[])
    const handleChangeSearchbar=async(e:any)=>{
        const keyword=e.detail.value;
        if(keyword)
        {
            const res=await getAuthorLike(keyword);
            console.log(res);
            
            setAuthor([...res.data]);
            
        }
    }
    

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
                <IonButton onClick={onClose}>Close</IonButton>
              </IonButtons>
              <IonTitle >Chọn Tác Giả</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setAddAuthorModal(!addAuthorModal)}>
                    <IonIcon  icon={add}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonSearchbar onIonChange={(e)=>{handleChangeSearchbar(e)}}></IonSearchbar>
            <IonList>
                {author.map((item:any)=>{
                    return(
                        <IonRow key={v4()}>
                            <IonCol onClick={()=>{setTacGia(item)
                            onClose()}}>
                                {item.Ten}
                            </IonCol>
                        </IonRow>
                    )
                })}
            </IonList>
          </IonContent>

          <AddAuthor isOpen={addAuthorModal} onClose={()=>{setAddAuthorModal(!addAuthorModal)}}></AddAuthor>
        </IonModal>
    );
};

export default AuthorModal;