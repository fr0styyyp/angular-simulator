import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostApiService } from '../services/post-api.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { MessageService } from '../../../message.service';
import { IPost } from '../interfaces/IPost';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  
  private fb: FormBuilder = inject(FormBuilder);
  private postApiService: PostApiService = inject(PostApiService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  
  postForm: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    body: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    tags: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    reactions: this.fb.group({
      likes: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
      dislikes: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
    }),
    views: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
    userId: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
  });
  
  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }
    
    const rawValues: IPostFormValue = this.postForm.value;
    const formattedTags: string[] = rawValues.tags.split(',').map((tag: string) => tag.trim()); 
    const postData: IPost = { ...rawValues, tags: formattedTags };
    
    this.postApiService.createPost(postData).pipe(
      tap(() => {
        this.router.navigate(['posts']);
      }),
      catchError((err) => {
        this.messageService.showError(err);
        return of([]);
      })
    ).subscribe()
  }
  
}
