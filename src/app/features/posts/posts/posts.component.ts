import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PostApiService } from '../services/post-api.service';
import { IPost } from '../interfaces/IPost';
import { catchError, of, switchMap, tap } from 'rxjs';
import { IPostRespone } from '../interfaces/IPostResponse';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { postEditData } from '../types/postEditData';
import { IPostEditFormValue } from '../interfaces/IPostEditFormValue';

@Component({
  selector: 'app-posts',
  imports: [SkeletonModule, TableModule, ToastModule, ContextMenuModule, RouterLink, DynamicDialogModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [MessageService, DialogService]
})
export class PostsComponent implements OnInit {
  
  private postApiService: PostApiService = inject(PostApiService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  private dialogService: DialogService = inject(DialogService);
  
  totalPosts!: number;
  first: number = 0;
  rows: number = 10;
  posts!: IPost[];
  selectedPost!: IPost | null;
  items!: MenuItem[];
  isDataExist: boolean = false;
  errorMessage: string | null = null;
  artificialArray: IPost[] = Array.from({ length: 5 }).map(() => ({
    id: 0,
    title: '',
    body: '',
    tags: [],
    views: 0,
    userId: 0,
    reactions: { likes: 0, dislikes: 0 }
  }));
  
  ngOnInit(): void {
    this.items = [
      { label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewPost(this.selectedPost) },
      { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deletePost(this.selectedPost) },
      { label: 'Edit', icon: 'pi pi-fw pi-times', command: () => this.editPost(this.selectedPost) },
    ];
  }
  
  loadPosts(event: TableLazyLoadEvent): void {
    this.isDataExist = false;
    this.first = event.first ?? 0;
    this.rows = event.rows ?? this.rows
    this.postApiService.getPosts(this.rows, this.first).pipe(
      tap((data: IPostRespone) => {
        this.posts = data.posts;
        this.isDataExist = true;
        this.totalPosts = data.total
      }),
      catchError((error: Error) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Ошибка загрузки постов', 
          detail: error.message 
        });
        this.errorMessage = error.message;
        this.isDataExist = true;
        this.posts = [];
        return of([]);
      })
    ).subscribe();
  }
  
  onRowDblClick(id: number): void {
    this.router.navigateByUrl(`/posts/${ id }`)
  }
  
  viewPost(post: IPost | null): void {
    if (post) {
      this.messageService.add({ severity: 'info', summary: 'Post Selected', detail: post.title });
      this.onRowDblClick(post.id);
    }
  }
  
  deletePost(post: IPost | null): void {
    if (post) {
      this.postApiService.deletePostById(post.id).pipe(
        tap(() => {
          this.posts = this.posts.filter((p) => p.id !== post.id);
          this.messageService.add({ severity: 'error', summary: 'Post Deleted', detail: post.title });
          this.selectedPost = null;
        }),
        catchError((error: Error) => {
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Ошибка удаления', 
            detail: error.message 
          });
          
          return of([]);
        })
      ).subscribe();
    }
  }
  
  editPost(post: IPost | null): void {
    if (!post) {
      return;
    }
    
    const ref = this.dialogService.open(PostEditDialogComponent, {
      header: 'Edit post',
      width: '50vw',
      modal:true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: { title: post.title, tags: post.tags, views: post.views }
    });
    
    ref?.onClose.pipe(
      switchMap((updatedFields: postEditData) => {
        if (!updatedFields) {
          return of();
        }
        
        const updatedPost: IPost = { ...post, ...updatedFields };
        return this.postApiService.updatePost(post.id, updatedPost); 
      }),
      tap((updatedFields: IPost) => {
        if (updatedFields) {
          this.posts = this.posts.map((p: IPost) => 
            p.id === post.id ? { ...p, ...updatedFields } : p
          );
          
          this.messageService.add({
            severity: 'success', 
            summary: 'Post Updated', 
            detail: updatedFields.title
          });
        }
      }),
      catchError((error: Error) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Ошибка изменения', 
          detail: error.message 
        });
        
        return of([]);
      })
    ).subscribe();
  }
  
}
