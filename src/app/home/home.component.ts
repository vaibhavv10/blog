import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog/blog';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogs: Blog[] = [];
  isLoadingResults = true;

  constructor(private api: HomeService) { }

  ngOnInit() {
    this.api.getBlogs()
      .subscribe((res: any) => {
        this.blogs = res;
        console.log(this.blogs);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
