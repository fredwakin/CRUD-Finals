import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackEndService {
  router: any;

  constructor(private postService: PostService, 
              private http: HttpClient) { }

  saveData(){
    const listOfPosts: Post[] = this.postService.getPost();
    this.http.put('https://joaquin-8e05a-default-rtdb.firebaseio.com/posts.json', listOfPosts)
    .subscribe((res)=>{
    console.log(res);
    this.postService.setPosts(listOfPosts);
    })
  }
  fetchData(): Observable<Post[]> {
    return this.http.get<Post[]>('https://joaquin-8e05a-default-rtdb.firebaseio.com/posts.json')
      .pipe(tap((listOfPosts: Post[]) => {
        console.log(listOfPosts)
  
        listOfPosts.forEach(post => {
          if (!Array.isArray(post.comments)) {
            post.comments = [];
          }
        });
        this.postService.setPosts(listOfPosts);
        this.postService.listChangeEvent.emit(listOfPosts);
      }));
  }
}
