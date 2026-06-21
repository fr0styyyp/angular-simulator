import { Routes } from '@angular/router';
import { postResolver } from './features/posts/resolvers/post.resolver';
import { authGuard } from './features/auth/guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/auth/auth.component').then(m => m.AuthComponent)
  },
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
    ],
    canActivate: [authGuard, adminGuard],
    canActivateChild: [authGuard, adminGuard],
  },
  {
    path: '',
    loadComponent: () => import('../home-page/home-page.component').then(m => m.HomePageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadComponent: () => import('../users-page/users-page.component').then(m => m.UsersPageComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: '**',
    loadComponent: () => import('../not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent),
    canActivate: [authGuard]
  },
];
