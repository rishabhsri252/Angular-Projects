import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/types/types';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';
import { getCategories, getSortedBlogs, getFilteredBlogs } from 'src/app/utils';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  searchInput = '';
  blogFilter = '';
  allBlogs: Blog[] = [];
  filteredBlog: Blog[] = [];
  featuredBlog: Blog[] = [];
  categories: string[] = [];

  constructor(private blogData: BlogService, private router: Router) {}

  ngOnInit() {
    this.getBlogs();
  }

  private getBlogs() {
    this.blogData.getBlogs().subscribe((blogs) => {
      this.allBlogs = getSortedBlogs(blogs);
      this.categories = getCategories(this.allBlogs, this.categories);
      this.filteredBlog = getFilteredBlogs(
        this.allBlogs,
        this.searchInput,
        this.blogFilter
      );
      this.featuredBlog = this.getfeaturedBlogs();
    }); 
  }

  onChangeFilter(event: Event) {
    this.blogFilter = (event.target as HTMLInputElement).value;
    this.filteredBlog = getFilteredBlogs(
      this.allBlogs,
      this.searchInput,
      this.blogFilter
    );
  }

  onChangeSearch() {
    this.filteredBlog = getFilteredBlogs(
      this.allBlogs,
      this.searchInput,
      this.blogFilter
    );
  }

  onSelectBlog(blog: Blog) {
    this.router.navigate(['/home/detail', blog.id]);
  }

  private getfeaturedBlogs() {
    return [...this.allBlogs]
      .sort((a, b) => {
        return Number(b.ratings.length) - Number(a.ratings.length);
      })
      .slice(0, 5);
  }

  reset(searchBoxElement: HTMLInputElement, filterElement: HTMLSelectElement) {
    searchBoxElement.value = '';
    this.searchInput = '';
    filterElement.selectedIndex = 0;
    this.blogFilter = '';
    this.filteredBlog = getFilteredBlogs(
      this.allBlogs,
      this.searchInput,
      this.blogFilter
    );
  }
}
