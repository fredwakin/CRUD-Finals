import { Component, OnInit,Input } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() post?: Post;
  @Input() index: number =0;
  isEditing: boolean[] = [];
  comment : string[]=[];
  like: number = 0;
  @ViewChild('commentInput') commentInput: any;
  @ViewChild('editCommentInput') editCommentInput: any;

  constructor(private postService: PostService, private router: Router) { }

ngOnInit(): void {
    this.postService.fetchComments(this.index).subscribe(comments => {
        this.comment = comments;
    });
    console.log(this.post);
}
delete(){
  this.postService.deletePost(this.index);
}
onEdit(){
  
  this.router.navigate(['/post-edit', this.index]);
}
onlikes(){
  this.postService.likePost(this.index)
}
ondislikes(){
  this.postService.dislikePost(this.index)
}
onAddComment(newComment: string) {
  this.postService.addComment(this.index, newComment);
  this.comment = this.postService.getComments(this.index);
}
onDeleteComment(commentIndex: number) {
    this.postService.deleteComment(this.index, commentIndex);
}
}
