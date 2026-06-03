import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPostRespone } from '../interfaces/IPostResponse';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  
  private http: HttpClient = inject(HttpClient);
  
  private readonly apiUrl: string = 'https://dummyjson.com/posts';
  
  getPosts(limit: number, skip: number): Observable<IPostRespone> {
    return this.http.get<IPostRespone>(`${ this.apiUrl }?limit=${ limit }&skip=${ skip }`);
  }
  
  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.apiUrl }/${ id }`);
  }
  
  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.apiUrl }/add`, post);
  }
  
  updatePost(id: number, post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${ this.apiUrl }/${ id }`, post);
  }
  
  deletePostById(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.apiUrl }/${ id }`);
  }
  
}
