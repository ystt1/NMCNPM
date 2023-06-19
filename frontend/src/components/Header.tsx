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
                <IonCol size='auto'>
                    <IonItem routerLink='/'>
                    <IonIcon className='icon' icon={book}></IonIcon>
                <IonLabel>BookStore</IonLabel></IonItem>
                </IonCol>
                <IonCol size='1' className='label'><IonLabel >Thể Loại</IonLabel></IonCol>
                <IonCol size='6' className='searchbar'>
                    <IonSearchbar  onIonInput={(e)=>{
                        if(e.detail.value)
                        {setSearchValue(e.detail.value)}
                        else{setSearchValue('')}}}
                        onKeyDown={(e)=>{if(e.key==='Enter')
                        {
                            history.push(`/tim-kiem/${searchValue}/${pageNumber}`);
                        }}}
                showCancelButton='never' placeholder='Nhập tên sách hoặc tác giả'></IonSearchbar></IonCol>
                <IonCol><IonIcon className='iconAvatar' icon={person}></IonIcon></IonCol>
            </IonRow>
        </IonGrid>         
        </IonHeader>
    );
};

export default HeaderComp;