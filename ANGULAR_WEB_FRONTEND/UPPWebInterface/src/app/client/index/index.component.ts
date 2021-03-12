import {Component, OnInit} from '@angular/core';
import {PostServiceService} from '../../services/post-service.service';
import {IPost} from '../../models/ipost';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public posts: IPost[] = [];
  public newPosts: IPost[][] = [];
  public status: boolean;

  constructor(private postService: PostServiceService,
              private router: Router) {
    this.status = true;
  }

  ngOnInit(): void {
    this.status = true;
    this.postService.getPost().subscribe(data => {
      this.posts = data;
      while (this.posts.length) {
        this.newPosts.push(this.posts.splice(0, 3));
      }
      this.status = false;
    }, error => {
      this.router.navigate(['/internalerror']);
    });
  }
}
