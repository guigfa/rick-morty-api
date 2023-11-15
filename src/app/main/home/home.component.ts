import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private filterService: FilterService) {
    this.handleFilters();
  }

  ngOnInit(): void {}

  handleFilters() {
    this.filterService.setToolbarValue(null);
    this.filterService.setLoginPage(false);
  }

  ngAfterViewInit(): void {
    this.filterService.sendListPage(false);
  }

  redirectTo(route: string) {
    this.router.navigate([`${route}`]);
  }
}
