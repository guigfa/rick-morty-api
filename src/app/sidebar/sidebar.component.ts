import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/shared/services/filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isListPage: boolean;

  constructor(private router: Router, private filterService: FilterService) {
    this.filterService.isListPage$.subscribe((val) => (this.isListPage = val));
  }

  redirectTo(component: string) {
    this.router.navigate([`${component}`]);
  }
}
