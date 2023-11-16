import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router, private filterService: FilterService) {
    this.handleFilters();
  }

  handleFilters() {
    this.filterService.setToolbarValue(null);
    this.filterService.setLoginPage(false);
  }

  redirectTo(route: string) {
    this.router.navigate([`${route}`]);
  }
}
