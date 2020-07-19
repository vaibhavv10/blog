import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog/blog';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  blog: Blog = {
    id: '',
    blogTitle: '',
   blogDesc: '',
       blogImgUrl: '',
    created: null,
    updated: null
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: HomeService, private router: Router) { }

  ngOnInit() {
    this.getBlogDetails(this.route.snapshot.params.id);
  }

  getBlogDetails(id: any) {
    this.api.getBlog(id)
      .subscribe((data: any) => {
        this.blog = data;
        console.log(this.blog);
        this.isLoadingResults = false;
      });
  }

}
