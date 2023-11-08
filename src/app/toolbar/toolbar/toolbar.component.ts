import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  showFiller: boolean = true;

  constructor(private router: Router){}
  openUserMenu() {
    
  }

  redirectTo(component: string) {
    this.router.navigate([`${component}`])
  }
}
