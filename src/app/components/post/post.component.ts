import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/types/types';
import { BlogService } from 'src/app/services/blog.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getCategories } from 'src/app/utils';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})

export class PostComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authenticationservice: AuthenticationService,
    private router: Router,
    private blogService: BlogService
  ) {}

  blogPostForm!: FormGroup;
  allBlogs: Blog[] = [];
  categories: string[] = [];
  userName: string = this.authenticationservice.getUserName();

  ngOnInit() {
    this.getBlogs();
  }

  private getBlogs() {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.allBlogs = blogs;
      this.categories = getCategories(this.allBlogs,this.categories);
      this.createBlogPostForm();
    });
  }

  getCategories() {
    this.allBlogs.forEach((value) => {
      this.categories.push(value['category']);
    });
    this.categories = this.categories.filter(
      (value: string, index: number, arr: string[]) => {
        return arr.indexOf(value) === index;
      }
    );
  }

  private createBlogPostForm() {
    let currentDate = new Date();
    this.blogPostForm = this.fb.group({
      id: [this.allBlogs.length + 1],
      title: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
      description: ['', [Validators.required]],
      author: [this.userName],
      ratings: [[]],
      category: ['', [Validators.required]],
      date: [currentDate.toISOString()],
      comments: [[]],
    });
  }

  onPost() {
    this.blogPostForm.value['thumbnail'] = this.blogPostForm.value[
      'thumbnail'
    ].replace('C:\\fakepath\\', '../../assets/thumbnails/');
    this.blogService.postBlog(this.blogPostForm.value);
    this.router.navigate(['/home']);
  }
}
