import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { PostModel } from '../post-model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  /* posts = [
    {title: 'First Post', content: 'This is the first post\'s content'},
    {title: 'Second Post', content: 'This is the second post\'s content'},
    {title: 'Third Post', content: 'This is the third post\'s content'},
  ]; */

  posts: PostModel[] = [];
  private postsSubscription: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postsSubscription = this.postsService.getPostUpdateListener()
    .subscribe((posts: PostModel[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

}
