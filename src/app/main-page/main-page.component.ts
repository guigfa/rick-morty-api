import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/shared/services/filter.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private filterService: FilterService) {
    this.handleFilters();
  }

  ngOnInit(): void {}

  handleFilters() {
    this.filterService.setToolbarValue(null);
  }

  ngAfterViewInit(): void {
    this.filterService.sendListPage(false);
  }

  redirectTo(route: string) {
    this.router.navigate([`${route}`]);
  }
}
