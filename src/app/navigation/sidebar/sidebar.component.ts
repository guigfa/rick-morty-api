import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FilterService } from 'src/shared/services/filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isListPage: boolean;
  mode: string;
  login: true;

  constructor(private router: Router, private filterService: FilterService) {
    this.filterService.isListPage$.subscribe((val) => (this.isListPage = val));
  }

  ngOnInit(): void {
    this.updateMode();
    window.addEventListener('resize', () => this.updateMode());
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
}
