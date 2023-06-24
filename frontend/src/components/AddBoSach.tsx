import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { close } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import unidecode from 'unidecode';
import boSachApi from '../api/BoSach';

const AddBoSach: React.FunctionComponent<any> = ({isOpen,onClose}) => {
    const [newBoSach,setNewBoSach]=useState({
        Ten:"",
        slug:""
    })
    const {UpLoadBoSach}=boSachApi();
    const [alert]=useIonAlert();
    const [presentAlert]=useIonAlert();
    const slugify=(str:string)=> {
      str=unidecode(str)
        str = str.replace(/^\s+|\s+$/g, ''); 
        str = str.toLowerCase(); 
        str = str.replace(/[^a-z0-9 -]/g, '') 
        str = str.replace(/\s+/g, '-'); 
        str = str.replace(/-+/g, '-'); 
        return str; 
      }

      const handleChange=(e:any)=>{
        setNewBoSach((prevAuthor) => ({
          ...prevAuthor,
          Ten: e.detail.value,
        }));
      }
      
      useEffect(()=>{
        const Slug = slugify(newBoSach.Ten);
        setNewBoSach((prevAuthor) => ({
          ...prevAuthor,
          slug: Slug,
        }));
      },[newBoSach.Ten])

      const onClickCreateBoSach=()=>{
    
        
        if(newBoSach.Ten && newBoSach.slug)
        {
          alert({
            header: 'Thông Báo',
            message: `Bạn có chắc muốn thêm Bộ Sách ${newBoSach.Ten} ?!`,
            buttons: [{
              text: 'Cancel',
              role: 'cancel',
        
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                uploadBoSach()
              },
            },],
          })
        }
        else{ 
          
          alert({
          header: 'Thông Báo',
          message: 'Bạn chưa nhập tên!',
          buttons: ['OK'],
        })
        }
      }

      const uploadBoSach=async()=>{
        const res=await UpLoadBoSach(newBoSach);
        
        if(!res)
        {
          presentAlert({
            header: 'Thông báo',
            message: 'Tên bạn nhập có thể dẫn đến trùng dữ liệu vui lòng đổi tên khác',
            buttons: ['OK'],
          })
          
        }
        else{
          if(res.status)
          {
            presentAlert({
              header: 'Thông báo',
              message: 'Thêm bộ sách thành công',
              buttons: ['OK'],
            })
          }
          else{
            presentAlert({
              header: 'Thông báo',
              message: 'Thêm bộ sách thất bại',
              buttons: ['OK'],
            })
          }
        }
        
      }

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
            <IonToolbar>
              <IonTitle >Thêm Bộ Sách</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={onClose}>
                    <IonIcon  icon={close}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
                <IonItem>
                    <IonInput  onIonChange={(e)=>handleChange(e)}  
                    label='Tên Bộ Sách' labelPlacement="stacked"></IonInput>
                </IonItem>
            </IonList>
            <IonButton onClick={()=>{onClickCreateBoSach()}} expand='block'>Thêm</IonButton>
          </IonContent>
        </IonModal>
    );
};

export default AddBoSach;