import { Routes } from '@angular/router';
import { postResolver } from './features/posts/resolvers/post.resolver';

export const routes: Routes = [
  {
    path: 'posts',
    children: [
      {
        path: 'create',
        loadComponent: () => import('./features/posts/create-post/create-post.component').then(m => m.CreatePostComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./features/posts/post-detail/post-detail.component').then(m => m.PostDetailComponent),
        resolve: {
          post: postResolver
        }
      },
      {
        path: '',
        loadComponent: () => import('./features/posts/posts/posts.component').then(m => m.PostsComponent),
      },
    ]
  },
  {
    path: '',
    loadComponent: () => import('../home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('../users-page/users-page.component').then(m => m.UsersPageComponent)
  },
  {
    path: '**',
    loadComponent: () => import('../not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
];
