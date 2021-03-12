import {Component, OnInit} from '@angular/core';
import {IPost} from '../../models/ipost';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostServiceService} from '../../services/post-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecaptchaService} from '../../services/recaptcha.service';
import {AuthService} from '../../services/auth.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public id: string;
  // @ts-ignore
  public post: IPost;
  public commentForm: FormGroup;
  public message: string;
  public isHuman: boolean;
  public status: boolean;

  public editorConfig: AngularEditorConfig = {
    editable: false,
    enableToolbar: false,
    showToolbar: false,
    sanitize: false
  };

  constructor(private postService: PostServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private recaptcha: RecaptchaService,
              private authService: AuthService) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.isHuman = false;
    this.message = '';
    this.commentForm = this.formBuilder.group({
      author: ['Anonymous'],
      content: ['', Validators.required]
    });
    this.status = true;
    this.postService.getPostById(this.id).subscribe(data => {
      this.post = data;
      this.post.content = this.post.content.replace('img', 'img class=\'img-fluid\'');
      this.status = false;
    }, error => {
      this.router.navigate(['/error']);
    });
  }

  ngOnInit(): void {
    this.status = true;
    this.postService.getPostById(this.id).subscribe(data => {
      this.post = data;
      this.post.content = this.post.content.replace('img', 'img class=\'img-fluid\'');
      this.status = false;
    }, error => {
      this.router.navigate(['/error']);
    });
  }

  async resolved(captchaResponse: string): Promise<void> {
    await this.sendTokenToBackend(captchaResponse);
  }

  sendTokenToBackend(token: string): void {
    this.recaptcha.sendToken(token).subscribe(
      data => {
        this.isHuman = data.success;
      }
    );
  }

  add(): void {
    if (this.commentForm.invalid) {
      return;
    } else {
      const str = localStorage.getItem('token');
      if (!str) {
        const comment = {
          _id: this.post._id,
          author: 'Anonymous',
          content: this.commentForm.controls.content.value
        };
        this.postService.addComment(comment).subscribe(data => {
          this.isHuman = false;
          this.ngOnInit();
        }, error => {
          this.router.navigate(['/internalerror']);
        });
        return;
      }
      const json = JSON.parse(str);
      if (new Date().getTime() > json.expiry) {
        localStorage.clear();
        const comment = {
          _id: this.post._id,
          author: 'Anonymous',
          content: this.commentForm.controls.content.value
        };
        this.postService.addComment(comment).subscribe(data => {
          this.isHuman = false;
          this.ngOnInit();
        }, error => {
          this.router.navigate(['/internalerror']);
        });
        return;
      }
      const body = {
        token: json.token,
      };
      this.authService.verify(body).subscribe(data => {
        const comment = {
          _id: this.post._id,
          author: data.user.name,
          content: this.commentForm.controls.content.value
        };
        console.log(comment);
        this.postService.addComment(comment).subscribe(datas => {
          this.isHuman = false;
          this.ngOnInit();
        }, error => {
          this.router.navigate(['/internalerror']);
        });
      }, error => {
        const comment = {
          _id: this.post._id,
          author: 'Anonymous',
          content: this.commentForm.controls.content.value
        };
        this.postService.addComment(comment).subscribe(data => {
          this.isHuman = false;
          this.ngOnInit();
        }, err => {
          this.router.navigate(['/internalerror']);
        });
      });
      return;
    }
  }
}
