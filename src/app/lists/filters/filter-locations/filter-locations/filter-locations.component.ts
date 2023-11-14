import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    type: new FormControl(''),
    dimension: new FormControl(''),
  });
  filterValue: string;
  handleNewValue: string;
  subscription: Subscription;
  handlerSplitted: string[];
  listToDisplay: string = 'Todos';
  favoritedsIds: number[] =
    JSON.parse(localStorage.getItem('ids_favoritos_local')) ?? [];
  favoritedLocations: LocationRickMorty[] =
    JSON.parse(localStorage.getItem('favoritos_local')) ?? [];

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
    private router: Router,
    private snackBar: MatSnackBar
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
      type: this.form.get('type').value ?? null,
      dimension: this.form.get('dimension').value ?? null,
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
          this.locations = [];
          this.nextPage = '';
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.locations = [];
        data.results.forEach((result) => this.locations.push(result));
        this.nextPage = data.info.next;
      });
  }

  fetchPages(url: string) {
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: LocationRickMorty) => {
        if (this.locations.includes(result.name)) return;
        this.locations.push(result);
      });
      this.nextPage = data.info.next;
      if (!data.info.next) {
        return;
      }
    });
  }

  favorited(id: number) {
    this.favoritedsIds.push(id);
    const location = this.locations.find((location) => location.id === id);
    this.favoritedLocations.push(location);
    this.snackBar.open(`${location.name} favoritado!`, 'X', {duration: 1000});
    this.setLocalStorage();
  }

  unfavorited(id: number) {
    const location = this.favoritedLocations.find(
      (location) => location.id === id
    );
    this.favoritedsIds = this.favoritedsIds.filter((ids) => ids !== id);
    const control: any[] = [];
    this.favoritedLocations.forEach((location) =>
      location.id !== id ? control.push(location) : ''
    );
    this.favoritedLocations = control;
    this.snackBar.open(`${location.name} desfavoritado!`, 'X', {duration: 1000});
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem(
      'ids_favoritos_local',
      JSON.stringify(this.favoritedsIds)
    );
    localStorage.setItem(
      'favoritos_local',
      JSON.stringify(this.favoritedLocations)
    );
  }

  reset() {
    this.form.reset();
    this.getInitialLocations();
  }

  getStatus(status: string) {
    if (status.toLowerCase() === 'alive') {
      return 'green';
    } else if (status.toLowerCase() === 'dead') {
      return 'red';
    } else {
      return 'grey';
    }
  }

  setList(event: any) {
    this.listToDisplay = event.value === 'Todos' ? 'Todos' : 'Favoritos';
  }

  redirectToLocation(id: number) {
    this.router.navigate([`localizacao/${id}`]);
  }

  back() {
    this.router.navigate(['filtrar']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.filterService.setToolbarValue(
      this.handlerSplitted
        ? `${this.handlerSplitted[0] ?? ''}:${this.handlerSplitted[1] ?? ''}`
        : ''
    );
  }
}
