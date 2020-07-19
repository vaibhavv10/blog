import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BlogService } from '../../services/blog.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})
export class BlogAddComponent implements OnInit {
  blogForm: FormGroup;
  blogTitle = '';
  blogDesc = '';
  blogImgUrl = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();


  constructor(
    private router: Router,
    private api: BlogService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.blogForm = this.formBuilder.group({
      blogTitle : [null, Validators.required],
      blogDesc : [null, Validators.required],
      blogImgUrl : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addBlog(this.blogForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/blog/details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }


}
