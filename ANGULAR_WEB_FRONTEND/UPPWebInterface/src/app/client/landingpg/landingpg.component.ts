import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';
import { IPost } from '../../models/ipost';
import { Router } from '@angular/router';
import { Iproblems } from './../../models/iproblems';
import { CodingService } from 'src/app/services/coding.service';
import {Iplacement} from '../../models/iplacement';
import {PlacementService} from '../../services/placement.service';

@Component({
  selector: 'app-landingpg',
  templateUrl: './landingpg.component.html',
  styleUrls: ['./landingpg.component.css']
})
export class LandingpgComponent implements OnInit {
  public posts: IPost[] = [];
  public status: boolean;
  public problems: Iproblems[] = [];
  public statusp: boolean;
  public record: string;
  public statusplc: boolean;
  public displayedColumns: string[] = ['Title', 'Company Name', 'Location', 'History', 'URL', 'Ratings', 'Reviews', 'Experience', 'Salary', 'Qualification'];
  public dataSource: any;
  public data: Iplacement[];

  constructor(private postService: PostServiceService, private codingService: CodingService,private placementService: PlacementService,
    private router: Router) {
    this.status = true;
    this.statusp = true;
    this.record = "google";
    this.statusplc = true;
    this.data = [];
  }

  ngOnInit(): void {
    this.status = true;
    this.postService.getPost().subscribe(data => {
      this.posts = data; 
     this.posts = this.posts.slice(0,3);
      this.status = false;
    }, error => {
      this.router.navigate(['/internalerror']);
    });

    this.statusp = true;
    this.codingService.get().subscribe(data => {
      this.problems = data;
      this.problems = this.problems.slice(0,3);
      this.statusp = false;
    }, error => {
      this.router.navigate(['/internalerror']);
    });

    this.placementService.get(this.record).subscribe((value => {
      this.data = value;
      this.data = this.data.slice(0,2); 
      this.status = false;
    }));
  }

}
