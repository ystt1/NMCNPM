import { IonButton, IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import{bookApi} from '../api/Sach'
import { error } from 'console';
import AuthorModal from '../components/ModalAuthor';
import BoSachModal from '../components/BoSachModal';
import unidecode from 'unidecode';

const Admin: React.FC = () => {
    const {uploadBook}=bookApi();
    const [open, setOpen] = useState(false);
    const [modalBoSach, setModalBoSach] = useState(false);
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

    const[tacGia,setTacGia]=useState<any>({});
    const[boSach,setBoSach]=useState<any>({});
    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [alert]=useIonAlert()
    const [presentAlert]=useIonAlert()
    const handleSubmit = () => {
        handleUpload()
    }

    
    useEffect(()=>{
        if(tacGia.Ten && tacGia.id)
        {
        setBook({...book,idTacGia:tacGia.id})
        }
        
    },[tacGia])

    useEffect(()=>{
        if(boSach.Ten && boSach.id)
        {
        setBook({...book,idBoSach:boSach.id})
        }
        
    },[boSach])

    useEffect(()=>{
        const flag=slugify(book.Ten)
        {
            setBook({...book,slug:flag})
        }
    },[book.Ten])

    const slugify = (str: string) => {
        str = unidecode(str)
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9 -]/g, '')
        str = str.replace(/\s+/g, '-');
        str = str.replace(/-+/g, '-');
        return str;
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
        if(book.Ten && book.SoLuong && book.NXB && book.MoTa && book.Gia &&book.NgayPhatHanh && book.slug)
        {
            alert({
                header: 'Thông Báo',
                message: `Bạn có chắc muốn thêm Sách ${book.Ten} ?!`,
                buttons: [{
                  text: 'Cancel',
                  role: 'cancel',
        
                },
                {
                  text: 'OK',
                  role: 'confirm',
                  handler: () => {
                    UploadNewBook()
                  },
                },],
              })
        }
        else{
            alert({
                header: 'Thông Báo',
                message: 'Bạn chưa nhập đầy đủ thông tin!',
                buttons: ['OK'],
              })
        }
        
        
    };

    const UploadNewBook=async()=>{

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
              console.log(error);
              
            }
          }  
          const urls = await Promise.all(promises);
        await setBook({ ...book, Anh: urls })
        const res=await uploadBook({ ...book, Anh: urls });
        if (!res) {
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
                message: 'Thêm sách thành công',
                buttons: ['OK'],
              })
        }
        else{
            presentAlert({
                header: 'Thông báo',
                message: 'Thêm sách thất bại',
                buttons: ['OK'],
              })
        }}
    }

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
                        label='Tên Sách' labelPlacement="stacked"
                        onIonChange={(e) => setBook({ ...book, Ten: e.target.value })}
                        required
                    />
                    <IonInput
                        type="number"
                        value={book.SoLuong}
                        label='Số Lượng' labelPlacement="stacked"
                        onIonChange={(e) => setBook({ ...book, SoLuong: Number(e.target.value) })}
                        required
                    />
                    <IonInput
                        value={book.NXB}
                        label='Nhà xuất bản' labelPlacement="stacked"
                        onIonChange={(e) => setBook({ ...book, NXB: e.target.value })}
                        required
                    />
                    <IonTextarea
                        value={book.MoTa}
                        label='Mô tả' labelPlacement="stacked"
                        onIonChange={(e) => setBook({ ...book, MoTa: e.target.value })}
                        required
                    />
                    <IonInput
                        value={book.Gia}
                        label='Giá' labelPlacement="stacked"
                        onIonChange={(e) => setBook({ ...book, Gia: e.target.value })}
                        required
                    />
                    <IonInput
                        type="number"
                        value={book.TinhTrang}
                        label='Tình trạng' labelPlacement="stacked"
                        onIonChange={(e) => setBook({ ...book, TinhTrang: Number(e.target.value) })}
                        required
                    />
                    
                        <IonLabel>Ngày phát hành</IonLabel>
                    <IonDatetime
                        value={book.NgayPhatHanh}
                        
                        onIonChange={(e) => setBook({ ...book, NgayPhatHanh: e.target.value })}

                    />
                    
                    <IonInput
                        type="number"
                        value={book.LuotThue}
                        label='Lượt thuê' labelPlacement="stacked"
                        onIonChange={(e) => setBook({ ...book, LuotThue: Number(e.target.value) })}
                        required
                    />
                    <IonButton expand="block" onClick={() => setOpen(!open)}>
         { tacGia.Ten||"Chọn Tác Giả"}
        </IonButton>
        <IonButton expand="block" onClick={() => setModalBoSach(!modalBoSach)}>
         { boSach.Ten||"Chọn Bộ Sách"}
        </IonButton>
                    <IonInput
                        type="number"
                        value={book.LuotThich}
                        label='Lượt thích' labelPlacement="stacked"
                        onIonChange={(e) => setBook({ ...book, LuotThich: Number(e.target.value) })}
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
            <AuthorModal setTacGia={setTacGia} isOpen={open} onClose={()=>{setOpen(!open)}}></AuthorModal>
            <BoSachModal setBoSach={setBoSach} isOpen={modalBoSach} onClose={()=>{setModalBoSach(!modalBoSach)}}></BoSachModal>
        </IonPage>
    )
};

export default Admin;