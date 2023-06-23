import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { v4 } from 'uuid';

const CardSearch: React.FunctionComponent<{ prop: any }> = ({prop}) => {
    const item:any=prop;
    return (
        <IonCard key={v4()} routerLink={`/sach/${item.slug}`}>
                            <IonRow>
                                <IonCol size='2'>
                                {item.Anh && item.Anh[0] ? (
                                <img className='image' alt="Silhouette of mountains" src={item.Anh[0]} />
                              ) : (
                                <img className='image' alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />)}
                            </IonCol>
                            <IonCol>
                            <IonCardHeader>
                                
                                <IonCardTitle className='TacGia'>{item.Ten}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {item.MoTa}
                            </IonCardContent>
                            </IonCol>
                            </IonRow>
                            <IonRow>
                            <IonCol>
                                    <IonIcon />{item.TacGia||"không rõ"}
                                </IonCol>
                                <IonCol>
                                    <IonIcon  />Lượt thích: {item.LuotThich}
                                </IonCol>
                                <IonCol>
                                    <IonIcon  />Lượt thuê: {item.LuotThue}
                                </IonCol>
                            </IonRow>
                        </IonCard>
    );
};

export default CardSearch;