import { Injectable } from '@angular/core';
import { Blog } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogsApiUrl = '../assets/blogs.json';
  constructor(private http: HttpClient ) {}

  getBlogs() {
    return this.http
    .get(this.blogsApiUrl, { responseType: 'text' })
    .pipe(map((res) => JSON.parse(res) as Blog[]));
}

  getSelectedBlog(selectedBlogId:number | string | null | undefined) {
    let selectedBlogUrl = '../assets/blogs_'+selectedBlogId+'.json';
    return this.http
    .get(selectedBlogUrl, { responseType: 'text' })
    .pipe(map((res) => JSON.parse(res) as Blog));
  }

 postBlog(newBlog: Blog) {
    //this won't work since we are using a service instead of actual API
    return this.http.post(this.blogsApiUrl,newBlog,);
  }
}