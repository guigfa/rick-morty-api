import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/shared/services/filter.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private router: Router,
    private filterService: FilterService
  ){}

  ngOnInit(): void {
    this.filterService.sendData('');
  }

  redirectTo(route: string) {
    this.router.navigate([`${route}`])
  }
}
