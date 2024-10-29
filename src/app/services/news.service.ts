import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ResponseTopHeadlines} from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class newsService {

  headlinesPage = 0;

  categoryActual = '';
  categoryPage = 0;

  constructor(private http: HttpClient) { }

  private executeQuery<T>(query: string){
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines(){
    this.headlinesPage++;

    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
    //return this.http.get<ResponseTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=13543b43dd0f4d819b36fdda8d4cb071`);
  }

  getTopHeadlinescategory(category: string){

    if(this.categoryActual === category) {
      this.categoryPage++;
    }else {
      this.categoryPage = 1;
      this.categoryActual = category;
    }

    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=us&category=${category}&page=${this.categoryPage}`);
    //this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=13543b43dd0f4d819b36fdda8d4cb071`);
  }

}
