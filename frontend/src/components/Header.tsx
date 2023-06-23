import { IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import {book, person} from 'ionicons/icons'
import './Header.css';
import { Route } from 'react-router';
import { useHistory } from 'react-router-dom';

const HeaderComp: React.FunctionComponent = () => {
    const [searchValue,setSearchValue]=useState('');
    const history = useHistory();
    const pageNumber=1;

    return (
        <IonHeader className='header' >
        <IonGrid>
            <IonRow>
                <IonCol id='logo' size='auto'>
                    <IonItem routerLink='/' lines='none'>
                    <img id='icon' src="https://i.ibb.co/pW2xccN/thiet-ke-logo-nha-sach-book-pink.png" alt="thiet-ke-logo-nha-sach-book-pink" />
                <IonLabel>BookStore</IonLabel></IonItem>
                </IonCol>
                <IonCol size='1' id='label'><IonLabel >Thể Loại</IonLabel></IonCol>
                <IonCol size='6' id='searchbar'>
                    <IonSearchbar  onIonInput={(e)=>{
                        if(e.detail.value)
                        {setSearchValue(e.detail.value)}
                        else{setSearchValue('')}}}
                        onKeyDown={(e)=>{if(e.key==='Enter')
                        {
                            history.push(`/tim-kiem/${searchValue}/${pageNumber}`);
                        }}}
                showCancelButton='never' placeholder='Nhập tên sách hoặc tác giả'></IonSearchbar></IonCol>
                <IonCol ><img id='person' src="https://i.ibb.co/nLTD2yC/avatar-people-profile-user-icon-1320185001671922416.png" alt="avatar-people-profile-user-icon-1320185001671922416" /></IonCol>
            </IonRow>
        </IonGrid>         
        </IonHeader>
    );
};

export default HeaderComp;