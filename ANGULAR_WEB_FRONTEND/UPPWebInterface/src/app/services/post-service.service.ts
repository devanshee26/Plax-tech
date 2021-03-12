import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPost} from '../models/ipost';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  public ip = environment.backend;
  public urls = {
    getPost: this.ip + 'blog/get',
    getPostById: this.ip + 'blog/get/',
    addPost: this.ip + 'blog/add/post',
    addComment: this.ip + 'blog/add/comment',
    deletePost: this.ip + 'blog/delete/',
    deleteComment: this.ip + 'blog/delete/comment/',
    updatePost: this.ip + 'blog/update/',
    uploadImage: this.ip + 'blog/uploadImage'
  };

  constructor(private http: HttpClient) {
  }

  public getPost(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.urls.getPost);
  }

  public getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(this.urls.getPostById + id);
  }

  public addPost(data: any): Observable<IPost> {
    return this.http.post<IPost>(this.urls.addPost, data);
  }

  public addComment(data: any): Observable<IPost> {
    return this.http.post<IPost>(this.urls.addComment, data);
  }

  public deletePost(id: string): Observable<IPost> {
    return this.http.delete<IPost>(this.urls.deletePost + id);
  }

  public deleteComment(postid: string, commentid: string): Observable<IPost> {
    return this.http.delete<IPost>(this.urls.deleteComment + postid + '/' + commentid);
  }

  public updatePost(data: any): Observable<IPost> {
    return this.http.put<any>(this.urls.updatePost + data._id, data);
  }

  public uploadImage(data: any): Observable<IPost> {
    return this.http.post<any>(this.urls.uploadImage, data);
  }
}
