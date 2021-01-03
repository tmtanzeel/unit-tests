import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from '../core/adaptors/profile.model';
import { UserProfileService } from '../core/authentication/user-profile.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles = [];
  filteredArticles=[];
  p: number = 1;

  public userProfile$: Subscription;
  public userProfile: Profile;

  constructor(
    private _articleService: ArticleService, 
    private router: Router,
    private profileservice: UserProfileService, 
  ) { 
    this.userProfile$ = this.profileservice.userProfile$.subscribe(
      userProfile$ => {
        this.userProfile = userProfile$
      }
    );
  }

  articledId : String = '';
  text='';
  resulttext="all";

  ngOnInit() {
    this._articleService.getEvents()
    .subscribe(
      res => {
        this.articles = res,
        this.filteredArticles = res},
      err => console.log(err)
    )
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.pressed(this.text);
    }
  }

  pressed(text: string) {
    this.resulttext=text;
    this.CallSearch(text);
  }

  CallSearch(text: string) {
    this.SearchFunction(text);
  }

  SearchFunction(text: string) {
    this.filteredArticles=(this.articles.filter(e => {
      return e.title.toLocaleLowerCase() === text.toLocaleLowerCase ||
      e.title.toLowerCase().indexOf(text.toLowerCase()) >= 0
    }));
  }
}
