import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {DataLocalService} from '../../services/data-local.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {

  @Input() item:Article;
  @Input() i:number;
  @Input() inFavorites;

  constructor(private iab: InAppBrowser, private actionSheetCtrl:ActionSheetController, private socialSharing: SocialSharing, private datalocalService: DataLocalService) { }

  ngOnInit() {}

  openItem() {
    const browser = this.iab.create(this.item.url, '_system');
  }

  async launchMenu() {

    let saveDeleteBtn;

    if(this.inFavorites) {
      saveDeleteBtn = {
        text: 'Delete favorite',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Delete favorite');
          this.datalocalService.delete_news_favorites(this.item);
        }
      }
    }else {
      saveDeleteBtn = {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.datalocalService.save_item_favorites(this.item);
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(this.item.title, this.item.source.name, '', this.item.url);
        }
      },
      saveDeleteBtn,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
