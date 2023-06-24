import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonList, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import boSachApi from '../api/BoSach';
import { v4 } from 'uuid';
import AddBoSach from './AddBoSach';
const BoSachModal: React.FunctionComponent<any> = ({isOpen,onClose,setBoSach}) => {
    const {getBoSachLike}=boSachApi();
    const [author,setAuthor]=useState<any>([{}]);
    const [modalAddBoSach,setModalAddBoSach]=useState<any>(false)
    useEffect(()=>{setAuthor([])},[])
    const handleChangeSearchbar=async(e:any)=>{
        const keyword=e.detail.value;
        if(keyword)
        {
            const res=await getBoSachLike(keyword);
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
              <IonTitle >Chọn Bộ Sách</IonTitle>
              <IonButtons slot="end">
                <IonButton  onClick={()=>{setModalAddBoSach(!modalAddBoSach)}}>
                    <IonIcon icon={add}></IonIcon>
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
                            <IonCol onClick={()=>{setBoSach(item)
                            onClose()}}>
                                {item.Ten}
                            </IonCol>
                        </IonRow>
                    )
                })}
            </IonList>
          </IonContent>
          <AddBoSach isOpen={modalAddBoSach} onClose={()=>{setModalAddBoSach(!modalAddBoSach)}}></AddBoSach>
        </IonModal>
        
    );
};

export default BoSachModal;