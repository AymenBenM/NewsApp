import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { newsService } from '../../services/news.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static:true}) segment: IonSegment;

  categories:any = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  items: Article[] = [];

  constructor(private itemsService: newsService) {}

  ngOnInit(){
    this.segment.value = this.categories[0];
    this.loadNews(this.categories[0]);
  }

  changeCategory(event){
    this.items = [];
    this.loadNews(event.detail.value);
  }

  loadNews(category:string, event?) {
    this.itemsService.getTopHeadlinescategory(category).subscribe((resp) => {
      console.log(resp);
      this.items.push(...resp.articles);

      if(event) {
        event.target.complete();
      }

    });
  }

  loadData(event) {
    this.loadNews(this.segment.value, event);
  }

}
