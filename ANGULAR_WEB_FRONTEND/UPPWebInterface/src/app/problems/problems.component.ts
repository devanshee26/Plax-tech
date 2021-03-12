import {Component, OnInit} from '@angular/core';
import {CodingService} from '../services/coding.service';
import {Router} from '@angular/router';
import {Iproblems} from '../models/iproblems';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

  public problems: Iproblems[] = [];
  public status: boolean;

  constructor(private codingService: CodingService,
              private router: Router) {
    this.status = true;
  }

  ngOnInit(): void {
    this.status = true;
    this.codingService.get().subscribe(data => {
      this.problems = data;
      this.status = false;
    }, error => {
      this.router.navigate(['/internalerror']);
    });
  }

}
