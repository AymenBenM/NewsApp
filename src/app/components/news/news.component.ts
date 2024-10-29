import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class newsComponent implements OnInit {

  @Input() news:Article[] = [];
  @Input() inFavorites = false;

  constructor() { }

  ngOnInit() {}

}
