import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {

  index: number=0;
  form!: FormGroup;
  editMode= false;
    constructor( private postService: PostService, 
                 private router: Router, 
                 private actRoute: ActivatedRoute,
                 private backEndService: BackEndService){}

  ngOnInit(): void {
    let title = '';
    let image = '';
    let description = '';
    this.actRoute.params.subscribe((params: Params) => {
      if(params['index']){
        console.log(params['index']);
this.index = params['index'];
        const postSpec = this.postService.getSpecPost(this.index);
          title = postSpec.title;
          image = postSpec.image;
          description = postSpec.description;
          this.editMode=true;
      }
    })

    this.form  = new FormGroup({
      title: new FormControl (title, [Validators.required]),
      image: new FormControl (image, [Validators.required]),
      description: new FormControl (description, [Validators.required])
    })
  }

  onSubmit(){
    const title = this.form.value.title;
    const image = this.form.value.image;
    const description = this.form.value.description;


    const post: Post = new Post(
      title, image, description, 'Erlfred', new Date(), 0, 0
    );

    if(this.editMode==false){
      this.postService.addPost(post);
    }
    else{
      this.postService.updatePost(this.index, post);
    }
    this.backEndService.saveData();
    this.router.navigate(['/post-list'])
  }
  onCancel() {
    this.router.navigate(['/post-list']);
  }
  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
  const file: File | null = event.target instanceof HTMLInputElement && event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;

  if (file) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.form.patchValue({
        image: e.target.result,
      });
      this.imagePreview = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
}