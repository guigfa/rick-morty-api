import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Return } from 'src/shared/models/API-return.model';
import { LocationRickMorty } from 'src/shared/models/Location.model';
import { FilterService } from 'src/shared/services/filter.service';
import { RickMortyService } from 'src/shared/services/rick-morty.service';

@Component({
  selector: 'app-filter-locations',
  templateUrl: './filter-locations.component.html',
  styleUrls: ['./filter-locations.component.scss'],
})
export class FilterLocationsComponent implements OnInit, OnDestroy {
  isFetching: boolean = false;
  locations: any[] = [];
  nextPage: string;
  error: boolean = false;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    dimension: new FormControl('', [Validators.required]),
  });
  filterValue: string;
  handleNewValue: string;
  subscription: Subscription;
  handlerSplitted: string[];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const margin = 300;

    if (scrollY + windowHeight >= documentHeight - margin) {
      if (!this.nextPage || this.isFetching) return;

      this.isFetching = true;

      new Promise<void>((resolve) => {
        this.fetchPages(this.nextPage);
        resolve(); // Resolve the Promise immediately
      }).then(() => {
        this.isFetching = false;
      });
    }
  }

  constructor(
    private rickMortyService: RickMortyService,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleFilters();
  }

  handleFilters() {
    this.subscription = this.filterService
      .getToolbarValue()
      .subscribe((value) => {
        if (value) {
          const splitted = value.split(':');
          this.handlerSplitted = splitted;
          const location: LocationRickMorty = {
            [splitted[0].trim() ?? '']: splitted[1].trim() ?? '',
          };
          this.filter(location);
          this.handleNewValue = JSON.stringify(location);
        } else {
          this.getInitialLocations();
        }
      });
    this.filterService.sendListPage(true);
  }

  getInitialLocations() {
    this.locations = [];
    this.rickMortyService.getAllLocations().subscribe((data) => {
      this.nextPage = data.info.next;
      data.results.forEach((result) => {
        this.locations.push(result);
      });
    });
  }

  filterByForm() {
    const location: LocationRickMorty = {
      name: this.form.get('name').value,
      type: this.form.get('status').value,
      dimension: this.form.get('gender').value,
    };
    this.filter(location);
  }

  filter(locations: LocationRickMorty) {
    this.error = false;
    this.locations = [];
    this.rickMortyService
      .filterLocations(locations)
      .pipe(
        catchError((error) => {
          this.error = true;
          this.nextPage = '';
          return EMPTY;
        })
      )
      .subscribe((data) =>
        data.results.forEach((result) => this.locations.push(result))
      );
  }

  fetchPages(url: string) {
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: Return) => {
        if (this.locations.includes(result)) return;
      });
      this.locations.push(...data.results);
      this.nextPage = data.info.next;
      if (!data.info.next) {
        return;
      }
    });
  }

  redirectToLocation(id: number) {
    this.router.navigate([`localizacao/${id}`]);
  }

  back() {
    this.router.navigate(['/filtrar']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.filterService.setToolbarValue(this.handlerSplitted ? `${this.handlerSplitted[0] ?? ''}:${this.handlerSplitted[1] ?? ''}` : '');
  }
}
