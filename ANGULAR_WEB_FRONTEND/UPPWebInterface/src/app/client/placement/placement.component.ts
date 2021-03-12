import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css']
})
export class PlacementComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  navigate(): void {
    this.router.navigate(['/plcrecord']);
  }

  predict(): void {
    this.router.navigate(['/predict']);
  }
}
