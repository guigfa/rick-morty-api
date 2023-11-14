import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/guard/auth-guard.service';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isListPage: boolean;
  mode: string;
  login: boolean;

  constructor(private router: Router, private filterService: FilterService, private authService: AuthService) {
    this.filterService.isListPage$.subscribe((val) => (this.isListPage = val));
  }

  ngOnInit(): void {
    this.updateMode();
    window.addEventListener('resize', () => this.updateMode());
    this.filterService.getLoginPage().subscribe(val => this.login = val);
  }

  updateMode() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      this.mode = 'over';
    } else {
      this.mode = 'side';
    }
    return this.mode as MatDrawerMode;
  }

  redirectTo(component: string) {
    this.router.navigate([`${component}`]);
  }

  logout() {
      this.router.navigate(['login']);
  }
}
