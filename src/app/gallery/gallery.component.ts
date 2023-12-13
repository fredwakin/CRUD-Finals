import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPost();
  }
}
