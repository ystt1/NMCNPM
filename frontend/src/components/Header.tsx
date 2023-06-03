import { IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import {book, person} from 'ionicons/icons'
import './Header.css';

const HeaderComp: React.FunctionComponent = () => {

    return (
        <IonHeader className='header'>
        <IonGrid>
            <IonRow>
                <IonCol size='auto'>
                    <IonItem routerLink='/'>
                    <IonIcon className='icon' icon={book}></IonIcon>
                <IonLabel>BookStore</IonLabel></IonItem>
                </IonCol>
                <IonCol size='1' className='label'><IonLabel >Thể Loại</IonLabel></IonCol>
                <IonCol size='6' className='searchbar'><IonSearchbar showCancelButton='never' placeholder='Nhập tên sách hoặc tác giả'></IonSearchbar></IonCol>
                <IonCol><IonIcon className='iconAvatar' icon={person}></IonIcon></IonCol>
            </IonRow>
        </IonGrid>         
        </IonHeader>
    );
};

export default HeaderComp;