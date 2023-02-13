import { Blog } from './types/types';

export function getSortedComments(selectedBlog: Blog) {
  return selectedBlog.comments.sort(
    (a: { dateOfComment: Date }, b: { dateOfComment: Date }) => {
      return Number(a.dateOfComment) - Number(b.dateOfComment);
    }
  );
}

export function getAverageRating(selectedBlog: Blog) {
  console.log("Average rating : " , selectedBlog)
  let sumOfRatings = 0;
  for (let rating of selectedBlog.ratings) {
    sumOfRatings += rating;
  }
  return Math.round(sumOfRatings / selectedBlog.ratings.length);
}

export function getDeletedId(selectedBlog: Blog, id: number) {
  return selectedBlog.comments.findIndex((ob: { id: number }) => {
    return ob.id === id;
  });
}

export function getCategories(allBlogs: Blog[], categories: string[]) {
  allBlogs.forEach((value: Blog) => {
    categories.push(value['category']);
  });
  categories = categories.filter(
    (value: string, index: number, arr: string[]) => {
      return arr.indexOf(value) === index;
    }
  );
  return categories;
}

export function getSortedBlogs(allBlogs: Blog[]) {
  return allBlogs.sort(
    (a: { creationDate: Date }, b: { creationDate: Date }) => {
      return Number(b.creationDate) - Number(a.creationDate);
    }
  );
}

export function getFilteredBlogs(
  allBlogs: Blog[],
  searchInput: string,
  blogFilter: string
) {
  return allBlogs.filter((value: Blog) => {
    return (
      value['title'].toLowerCase().includes(searchInput.toLowerCase()) &&
      value.category.includes(blogFilter)
    );
  });
}
