import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const PageNotFound: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                
            </IonHeader>
            <IonContent className="ion-padding">
                Page Not Found
            </IonContent>
        </IonPage>
    );
};

export default PageNotFound;