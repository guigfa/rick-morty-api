import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Character } from 'src/shared/models/Character.model';
import { Episode } from 'src/shared/models/Episode.model';
import { LocationRickMorty } from 'src/shared/models/Location.model';
import { FilterService } from 'src/shared/services/filter.service';
import { RickMortyService } from 'src/shared/services/rick-morty.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rick-morty-test';
  isListPage: boolean;
  test: any[] = [];

  constructor(
    private rickMortyService: RickMortyService,
    private router: Router,
    private filterService: FilterService
  ) {}

  fetchPages(url: string) {
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      this.test.push(...data.results);

      if (data.info.next) {
        this.fetchPages(data.info.next);
      } else {
        return;
      }
    });
  }

  ngOnInit(): void {}
}
