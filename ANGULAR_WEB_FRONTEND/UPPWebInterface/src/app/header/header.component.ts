import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {InterfaceService} from '../services/interface.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @ts-ignore
  public isExpert: boolean;

  constructor(private router: Router,
              private interfaceService: InterfaceService) {
    this.interfaceService.isUserLoggedIn.subscribe(value => {
      this.isExpert = value;
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear();
    this.interfaceService.isUserLoggedIn.next(false);
    this.router.navigate(['/index']);
  }

}
