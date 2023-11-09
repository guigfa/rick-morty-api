import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    name: new FormControl(null),
    type: new FormControl(null),
    dimension: new FormControl(null),
  });
  filterValue: string;
  handleNewValue: string;
  subscription: Subscription;

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
    this.filterLocationsByForm();
    this.handleFilters();
  }

  handleFilters() {
    this.subscription = this.filterService
      .getToolbarValue()
      .subscribe((value) => {
        this.filterValue = value;
        if (this.filterValue) {
          this.form.get('name').setValue(this.filterValue);
        } else {
          this.getInitialLocations();
        }
      });
    this.filterService.sendData('Localizações');
    this.filterService.sendListPage(true);
  }

  getInitialLocations() {
    this.rickMortyService.getAllLocations().subscribe((data) => {
      this.nextPage = data.info.next;
      data.results.forEach((result) => {
        this.locations.push(result);
      });
    });
  }

  filterLocationsByInput(event: any) {
    let input = { name: '' };
    input.name = event;
    if (event.length >= 5) this.filter(event);
  }

  filterLocationsByForm() {
    this.form.valueChanges.subscribe((val) => {
      this.handleNewValue = val.name;
      this.filter(this.form.value);
    });
  }

  filter(locations: LocationRickMorty) {
    this.error = false;
    this.locations = [];
    this.rickMortyService
      .filterLocations(locations)
      .pipe(
        catchError((error) => {
          this.error = true;
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
    this.filterService.setToolbarValue(this.handleNewValue);
    this.subscription.unsubscribe();
  }
}
