import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { close } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import unidecode from 'unidecode';
import authorApi from '../api/TacGia';

const AddAuthor: React.FunctionComponent<any> = ({isOpen,onClose}) => {
    const [newAuthor,setNewAuthor]=useState({
        Ten:"",
        slug:""
    })
    const {UpLoadAuthor}=authorApi();
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
        setNewAuthor((prevAuthor) => ({
          ...prevAuthor,
          Ten: e.detail.value,
        }));
      }
      
      useEffect(()=>{
        const Slug = slugify(newAuthor.Ten);
        setNewAuthor((prevAuthor) => ({
          ...prevAuthor,
          slug: Slug,
        }));
      },[newAuthor.Ten])

      const onClickCreateAuthor=()=>{

        if(newAuthor.Ten && newAuthor.slug)
        {
          alert({
            header: 'Thông Báo',
            message: `Bạn có chắc muốn thêm Tác Giả ${newAuthor.Ten} ?!`,
            buttons: [{
              text: 'Cancel',
              role: 'cancel',
        
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                uploadAuthor()
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

      const uploadAuthor=async()=>{
        const res=await UpLoadAuthor(newAuthor);
        
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
              message: 'Thêm tác giả thành công',
              buttons: ['OK'],
            })
          }
          else{
            presentAlert({
              header: 'Thông báo',
              message: 'Thêm tác giả thất bại',
              buttons: ['OK'],
            })
          }
        }
        
      }

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
            <IonToolbar>
              <IonTitle >Thêm Tác Giả</IonTitle>
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
                    label='Tên Tác Giả' labelPlacement="stacked"></IonInput>
                </IonItem>
            </IonList>
            <IonButton onClick={()=>{onClickCreateAuthor()}} expand='block'>Thêm</IonButton>
          </IonContent>
        </IonModal>
    );
};

export default AddAuthor;