import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
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
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  blogForm: FormGroup;
  id = '';
  blogTitle = '';
  blogDesc = '';
  blogImgUrl = '';
  updated: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: BlogService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBlog(this.route.snapshot.params.id);
    this.blogForm = this.formBuilder.group({
      blogTitle : [null, Validators.required],
      blogDesc : [null, Validators.required],
      blogImgUrl : [null, Validators.required]
    });
  }

  getBlog(id: any) {
    this.api.getBlog(id).subscribe((data: any) => {
      this.id = data._id;
      this.blogForm.setValue({
        blogTitle: data.blogTitle,
        blogDesc: data.blogDesc,
        blogImgUrl: data.blogImgUrl
      });
    });
  }


  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateBlog(this.id, this.blogForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['blog/details/', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  blogDetails() {
    this.router.navigate(['/blog-details', this.id]);
  }

}
