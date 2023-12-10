import { EventEmitter, Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService{

    constructor(private http: HttpClient) { }

    listChangeEvent: EventEmitter<Post[]> = new EventEmitter
    listOfPosts: Post[] = [
        // new Post("The Verge",
        // "https://www.hostinger.ph/tutorials/wp-content/uploads/sites/2/2021/12/the-verge-website-homepage.png",
        // "The Verge is a blog focused on examining how technology will change the future.",
        // "Author: Joaquin",
        // new Date(), 0),
        // new Post("Tech Crunch",
        // "https://www.hostinger.ph/tutorials/wp-content/uploads/sites/2/2021/12/techcrunch-website-homepage.png",
        // "TechCrunch is a blog that provides technology and startup news, from the latest developments in Silicon Valley to venture capital funding.",
        // "Author: Joaquin",
        // new Date(), 0),
        // new Post("Engadget",
        // "https://www.hostinger.ph/tutorials/wp-content/uploads/sites/2/2021/12/engadget-website-homepage.png",
        // "Launched by Peter Rojas, Engadget is a technology blog providing reviews of gadgets and consumer electronics as well as the latest news in the tech world",
        // "Author: Joaquin",
        // new Date(), 0)
    ];
  
    getPost(){
        return this.listOfPosts;
    }
    setPosts(listOfPosts: Post[]) {
        this.listOfPosts = listOfPosts;
        this.listChangeEvent.emit(listOfPosts);
    }
    deletePost(index: number){
        this.listOfPosts.splice(index, 1);
        this.saveData();
    }
    addPost(post: Post){
        this.listOfPosts.push(post);
    }
    updatePost(index: number, post: Post){
        this.listOfPosts[index]=post;
        this.saveData();
    }
    getSpecPost( index: number) {
        return this.listOfPosts[index];
    }
    likePost(index: number) {
        this.listOfPosts[index].numberOflikes++;
        this.saveData();
    }
    dislikePost(index: number) {
        if (this.listOfPosts[index].numberOflikes > 0) {
            this.listOfPosts[index].numberOflikes--;
            this.saveData();
        }
    }
    addComment(index: number, comment: string) {
        this.listOfPosts[index].comments.push(comment);
        this.saveData();
    }
    getComments(index: number) {
        return this. listOfPosts[index].comments;
    }
    fetchComments(index: number): Observable<any> {
        return this.http.get(`https://joaquin-8e05a-default-rtdb.firebaseio.com/posts/${index}/comments.json`);
    }
    saveData(){
        this.http.put('https://joaquin-8e05a-default-rtdb.firebaseio.com/posts.json',this.listOfPosts)
        .subscribe((res)=>{
        console.log(res);
        })
    }
    deleteComment(postIndex: number, commentIndex: number) {
        this.listOfPosts[postIndex].comments = [
            ...this.listOfPosts[postIndex].comments.slice(0, commentIndex),
            ...this.listOfPosts[postIndex].comments.slice(commentIndex + 1)
        ];
        this.http.put(`https://joaquin-8e05a-default-rtdb.firebaseio.com/posts/${postIndex}/comments.json`, this.listOfPosts[postIndex])
          .subscribe(() => {
            console.log('Delete Comment in Firebase');
          });
    }
}