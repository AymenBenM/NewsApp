import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { newsComponent } from './news/news.component';
import { ItemComponent } from './item/item.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    newsComponent,
    ItemComponent
  ],
  exports: [
    newsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
