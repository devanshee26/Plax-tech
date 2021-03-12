import {Component} from '@angular/core';
import {InterfaceService} from './services/interface.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UPPWebInterface';

  constructor(private interfaceService: InterfaceService) {
    const str = localStorage.getItem('token');
    if (!str) {
      this.interfaceService.isUserLoggedIn.next(false);
    } else {
      const json = JSON.parse(str);
      if (new Date().getTime() > json.expiry) {
        localStorage.clear();
        this.interfaceService.isUserLoggedIn.next(false);
      } else {
        this.interfaceService.isUserLoggedIn.next(true);
      }
    }
  }
}
