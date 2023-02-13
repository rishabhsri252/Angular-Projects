import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Blog, Comment } from 'src/app/types/types';
import { BlogService } from 'src/app/services/blog.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RatingChangeEvent } from 'angular-star-rating';
import { getSortedComments,getAverageRating,getDeletedId } from 'src/app/utils';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})

export class DetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private blogService: BlogService,
  ) {}

  selectedBlog!: Blog;
  comments!: Comment[];
  selectedBlogId: number | string | null | undefined;
  userName = '';
  averageRating = 0;
  userRatingForm!:FormGroup;

  ngOnInit():void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      //represents blog id present in url
      this.selectedBlogId = id;
      this.getSelectedBlog();
    });
    this.userName = this.authenticationService.getUserName();
  }

  private createUserRatingForm() {
    this.userRatingForm = new FormGroup({
      myRatingControl: new FormControl(''),
    });
  }

  private getSelectedBlog() {
    this.blogService.getSelectedBlog(this.selectedBlogId).subscribe((blog) => {
      this.selectedBlog = blog;
      console.log(this.selectedBlog)
    this.comments = getSortedComments(this.selectedBlog);
    this.averageRating = getAverageRating(this.selectedBlog);
    this.createUserRatingForm();
    })
  }

  postComment(comment: string) {
    if (comment) {
      const newComment = {
        id:this.selectedBlog.comments.length + 1,
        comment: comment,
        dateOfComment: new Date(),
        author: this.userName,
      };
      this.selectedBlog.comments.push(newComment);
    }
  }

  deleteComment(commentId: number) {
    let deletedCommentId = getDeletedId(this.selectedBlog,commentId);
    this.selectedBlog.comments.splice(deletedCommentId,1);
  }

  onRatingChange = (rating_change_event: RatingChangeEvent) => {
    if (rating_change_event['rating']) {
      this.selectedBlog.ratings.push(rating_change_event['rating']);
    }
    this.averageRating = getAverageRating(this.selectedBlog);
  };
}