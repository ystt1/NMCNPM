import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Card = (props: any) => {
    const { item }: any = props;
    return (
        <IonCard className='card'>
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
    )
};

export default Card;