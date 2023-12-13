import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BackEndService } from '../back-end.service';
import { DarkModeService } from '../dark-mode.service';
import { Post } from '../post.model';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private backEndService: BackEndService, 
              private postService: PostService, 
              private darkModeService: DarkModeService, 
              private router: Router){}

  ngOnInit(): void {
      this.backEndService.fetchData().subscribe((posts: Post[]) => {
          this.postService.setPosts(posts);
      });
  }
  onHomeClick() {
    this.backEndService.fetchData().subscribe();
  }
  onSave(){
    this.backEndService.saveData();
  }
  onFetch(){
    this.backEndService.fetchData();
  }
  // searchTerm: string = '';
  // searchResults: Post[] = [];

  // onSearch(event: Event) {
  //   event.preventDefault();
  //   this.postService.searchPosts(this.searchTerm).subscribe(results => {
  //     this.searchResults = results.map(item => {
  //       return {
  //         id: item.payload.doc.id,
  //         ...item.payload.doc.data() as Post
  //       }
  //     });
  //   });
  // }
}