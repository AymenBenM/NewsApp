import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  news:Article[] = [];

  constructor(private storage: Storage, public toastCtrl: ToastController) { 
    this.load_news_favorites();
  }

  save_item_favorites(item:Article) {

    const existe =  this.news.find(noti => noti.title === item.title);

    if(!existe) {
      this.news.unshift(item);
      this.storage.set('favorites', this.news);
      this.presentToast('Added to favorites');
    }
    
  }

  async load_news_favorites() {
    const favorites = await this.storage.get('favorites');

    if(favorites) {
      this.news = favorites;
    }
   
  }

  delete_news_favorites(item: Article) {
    this.news = this.news.filter(noti => noti.title !== item.title);
    this.storage.set('favorites', this.news);
    this.presentToast('Deleted');
  }

  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
}
