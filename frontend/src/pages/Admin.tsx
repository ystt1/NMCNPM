import { IonButton, IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import{bookApi} from '../api/Sach'
import { error } from 'console';

const Admin: React.FC = () => {
    const {uploadBook}=bookApi();
    const [book, setBook] = useState<any>({
        Ten: '',
        SoLuong: 0,
        NXB: '',
        MoTa: '',
        Gia: '',
        TinhTrang: 0,
        NgayPhatHanh: '',
        LuotThue: 0,
        idTacGia: '',
        idBoSach: '',
        LuotThich: 0,
        slug: '',
        Anh: [],
    });




    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const handleSubmit = () => {
        handleUpload()
    }

    const handleFileChange = (event: any) => {
        const files = event.target.files;
        const images = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].type === 'image/jpeg') {
                images.push(files[i]);
            }
        }
        setSelectedFiles(images);
    };


    const handleUpload = async () => {
        const promises: any = [];
        for (const file of selectedFiles) {
            const data = new FormData();
            data.append("image", file);
            try {
              const response = await axios.post(
                "https://api.imgbb.com/1/upload",
                data,
                {
                  params: { key: "436ee0891a4518d6ca8dbb2e7117688d" }
                }
              );
              promises.push(response.data.data.url);
            } catch (error) {
              console.error(error);
            }
          }  
          const urls = await Promise.all(promises);
        await setBook({ ...book, Anh: urls })
        const res=await uploadBook({ ...book, Anh: urls });
        console.log(res);  
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Quản lý</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form>
                
                    <IonInput
                        value={book.Ten}
                        placeholder="Tên sách"
                        onIonChange={(e) => setBook({ ...book, Ten: e.target.value })}
                        required
                    />
                    <IonInput
                        type="number"
                        value={book.SoLuong}
                        placeholder="Số lượng"
                        onIonChange={(e) => setBook({ ...book, SoLuong: Number(e.target.value) })}
                        required
                    />
                    <IonInput
                        value={book.NXB}
                        placeholder="Nhà xuất bản"
                        onIonChange={(e) => setBook({ ...book, NXB: e.target.value })}
                        required
                    />
                    <IonTextarea
                        value={book.MoTa}
                        placeholder="Mô tả"
                        onIonChange={(e) => setBook({ ...book, MoTa: e.target.value })}
                        required
                    />
                    <IonInput
                        value={book.Gia}
                        placeholder="Giá"
                        onIonChange={(e) => setBook({ ...book, Gia: e.target.value })}
                        required
                    />
                    <IonInput
                        type="number"
                        value={book.TinhTrang}
                        placeholder="Tình trạng"
                        onIonChange={(e) => setBook({ ...book, TinhTrang: Number(e.target.value) })}
                        required
                    />
                    <IonDatetime
                        value={book.NgayPhatHanh}
                        placeholder="Ngày phát hành"
                        onIonChange={(e) => setBook({ ...book, NgayPhatHanh: e.target.value })}

                    />
                    <IonInput
                        type="number"
                        value={book.LuotThue}
                        placeholder="Lượt thuê"
                        onIonChange={(e) => setBook({ ...book, LuotThue: Number(e.target.value) })}
                        required
                    />
                    <IonInput
                        value={book.idTacGia}
                        placeholder="ID tác giả"
                        onIonChange={(e) => setBook({ ...book, idTacGia: e.target.value })}
                        
                    />
                    <IonInput
                        value={book.idBoSach}
                        placeholder="ID bộ sách"
                        onIonChange={(e) => setBook({ ...book, idBoSach: e.target.value })}
                        
                    />
                    <IonInput
                        type="number"
                        value={book.LuotThich}
                        placeholder="Lượt thích"
                        onIonChange={(e) => setBook({ ...book, LuotThich: Number(e.target.value) })}
                        required
                    />
                    <IonInput
                        value={book.slug}
                        placeholder="Slug"
                        onIonChange={(e) => setBook({ ...book, slug: e.target.value })}
                        required
                    />
                    <input
                        type="file"
                        accept="image/jpeg, image/jpg"
                        multiple={true}
                        onChange={handleFileChange}
                    />
                    <IonButton onClick={handleSubmit}>Lưu</IonButton>
                </form>

            </IonContent>
        </IonPage>
    )
};

export default Admin;