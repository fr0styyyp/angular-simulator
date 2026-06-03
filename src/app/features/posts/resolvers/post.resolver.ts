import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { PostApiService } from '../services/post-api.service';
import { IPost } from '../interfaces/IPost';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const postApiService: PostApiService = inject(PostApiService);
  return postApiService.getPostById(+route.paramMap.get('id')!);
};
