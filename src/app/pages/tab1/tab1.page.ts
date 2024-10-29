import { Component, OnInit } from '@angular/core';
import { newsService } from '../../services/news.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news: Article[] = [];

  constructor(private newsService: newsService) {}

  ngOnInit(){
    this.loadnews();
  }


  loadData(event) {
    this.loadnews(event);
  }

  loadnews(event?) {
    this.newsService.getTopHeadlines().subscribe(data => {
      //console.log(data);

      if(data.articles.length === 0) {
        event.target.disabled = true;
        return;
      }

      this.news.push(...data.articles);

      if(event) {
        event.target.complete();
      }

    });
  }

}
