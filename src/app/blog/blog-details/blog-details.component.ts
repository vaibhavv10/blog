import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from './../../services/blog.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  blog: Blog = {
    id: '',
    blogTitle: '',
    blogDesc: '',
    blogImgUrl: '',
    created: null,
    updated: null
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: BlogService, private router: Router) { }

  ngOnInit() {
    this.getBlogDetails(this.route.snapshot.params.id);
  }

  getBlogDetails(id: any) {
    this.api.getBlog(id)
      .subscribe((data: any) => {
        this.blog = data;
        this.blog.id = data._id;
        console.log(this.blog);
        this.isLoadingResults = false;
      });
  }

  deleteBlog(id: any) {
    this.isLoadingResults = true;
    this.api.deleteBlog(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/blog']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
