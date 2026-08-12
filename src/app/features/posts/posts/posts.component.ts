import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostApiService } from '../services/post-api.service';
import { IPost } from '../interfaces/IPost';
import { catchError, of, switchMap, tap } from 'rxjs';
import { IPostRespone } from '../interfaces/IPostResponse';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { postEditData } from '../types/postEditData';
import { MessageService } from '../../../message.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-posts',
  imports: [SkeletonModule, TableModule, ContextMenuModule, RouterLink, DynamicDialogModule, TranslatePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService],
})
export class PostsComponent implements OnInit {

  private postApiService: PostApiService = inject(PostApiService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  private dialogService: DialogService = inject(DialogService);
  private translateService: TranslateService = inject(TranslateService);
  private destroyRef: DestroyRef = inject(DestroyRef);

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
    reactions: { likes: 0, dislikes: 0 },
  }));

  ngOnInit(): void {
    this.buildContextMenuItems();
    this.translateService.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.buildContextMenuItems());
  }

  private buildContextMenuItems(): void {
    this.items = [
      {
        label: this.translateService.instant('posts.list.contextMenu.view'),
        icon: 'fa-solid fa-magnifying-glass',
        command: (): void => this.viewPost(this.selectedPost),
      },
      {
        label: this.translateService.instant('posts.list.contextMenu.delete'),
        icon: 'fa-solid fa-trash',
        command: (): void => this.deletePost(this.selectedPost),
      },
      {
        label: this.translateService.instant('posts.list.contextMenu.edit'),
        icon: 'fa-solid fa-pen-to-square',
        command: (): void => this.editPost(this.selectedPost),
      },
    ];
  }

  loadPosts(event: TableLazyLoadEvent): void {
    this.isDataExist = false;
    this.first = event.first ?? 0;
    this.rows = event.rows ?? this.rows;
    this.postApiService
      .getPosts(this.rows, this.first)
      .pipe(
        tap((data: IPostRespone) => {
          this.posts = data.posts;
          this.isDataExist = true;
          this.totalPosts = data.total;
        }),
        catchError((error: Error) => {
          this.messageService.showError(error.message);
          this.errorMessage = error.message;
          this.isDataExist = true;
          this.posts = [];
          return of([]);
        }),
      )
      .subscribe();
  }

  onRowDblClick(id: number): void {
    this.router.navigateByUrl(`/posts/${ id }`);
  }

  viewPost(post: IPost | null): void {
    if (post) {
      this.messageService.showInfo(this.translateService.instant('posts.list.toast.selected'));
      this.onRowDblClick(post.id);
    }
  }

  deletePost(post: IPost | null): void {
    if (post) {
      this.postApiService
        .deletePostById(post.id)
        .pipe(
          tap(() => {
            this.posts = this.posts.filter((p: IPost) => p.id !== post.id);
            this.messageService.showInfo(this.translateService.instant('posts.list.toast.deleted'));
            this.selectedPost = null;
          }),
          catchError((error: Error) => {
            this.messageService.showError(error.message);

            return of([]);
          }),
        )
        .subscribe();
    }
  }

  editPost(post: IPost | null): void {
    if (!post) {
      return;
    }

    this.dialogService
      .open(PostEditDialogComponent, {
        header: this.translateService.instant('posts.list.editDialog.header'),
        width: '50vw',
        modal: true,
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw',
        },
        data: { title: post.title, tags: post.tags, views: post.views },
      })
      ?.onClose.pipe(
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
              p.id === post.id ? { ...p, ...updatedFields } : p,
            );

            this.messageService.showInfo(this.translateService.instant('posts.list.toast.updated'));
          }
        }),
        catchError((error: Error) => {
          this.messageService.showError(error.message);

          return of([]);
        }),
      )
      .subscribe();
  }

}