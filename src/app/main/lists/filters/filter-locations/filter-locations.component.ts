import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { LocationRickMorty } from 'src/app/shared/models/Location.model';
import { FilterService } from 'src/app/shared/services/filter.service';
import { RickMortyService } from 'src/app/shared/services/rick-morty.service';

@Component({
  selector: 'app-filter-locations',
  templateUrl: './filter-locations.component.html',
  styleUrls: ['./filter-locations.component.scss'],
})
export class FilterLocationsComponent implements OnInit, OnDestroy {
  locations: any[] = [];
  nextPage: string;
  error: boolean = false;
  filterValue: string;
  subscription: Subscription;
  handlerSplitted: string[];
  listToDisplay: string = 'Todos';
  modeToDisplay: string = 'card';
  favoritedsIds: number[] =
    JSON.parse(localStorage.getItem('ids_favoritos_local')) ?? [];
  favoritedLocations: LocationRickMorty[] =
    JSON.parse(localStorage.getItem('favoritos_local')) ?? [];

  dataSource: LocationRickMorty[] = [];
  displayedColumns: string[] = [
    'name',
    'dimension',
    'type',
    'favorited',
    'redirect',
  ];
  controlURL: string;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    dimension: new FormControl(''),
  });

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const margin = 300;

    if (scrollY + windowHeight >= documentHeight - margin) {
      if (!this.nextPage) return;
      this.fetchPages(this.nextPage), { eventEmitter: false };
    }
  }

  constructor(
    private rickMortyService: RickMortyService,
    private filterService: FilterService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.handleFilters();
  }

  handleFilters() {
    this.subscription = this.filterService
      .getToolbarValue()
      .subscribe((value) => {
        this.form.reset();
        if (value) {
          const splitted = value.split(':');
          this.handlerSplitted = splitted;
          const location: LocationRickMorty = {
            [splitted[0].trim() ?? '']: splitted[1].trim() ?? '',
          };
          this.favoriteFilter(splitted[1].trim());
          this.allFilter(location);
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
      this.dataSource = [...this.locations];
    });
  }

  filterByForm() {
    const location: LocationRickMorty = {
      name: this.form.get('name').value,
      type: this.form.get('type').value ?? null,
      dimension: this.form.get('dimension').value ?? null,
    };
    this.allFilter(location);
    this.favoriteFilterByForm(location);
  }

  favoriteFilter(name: string) {
    this.favoritedLocations =
      JSON.parse(localStorage.getItem('favoritos_local')) ?? [];
    this.favoritedLocations = this.favoritedLocations.filter((location) =>
      location.name.includes(name)
    );
  }

  favoriteFilterByForm(location: LocationRickMorty) {
    this.error = false;
    this.favoritedLocations =
      JSON.parse(localStorage.getItem('favoritos_local')) ?? [];
    this.favoritedLocations = this.favoritedLocations.filter((loc) =>
      location.name
        ? loc?.name?.toLowerCase().includes(location?.name?.toLowerCase())
        : true && location.dimension
        ? loc?.dimension?.toLowerCase().includes(location?.dimension?.toLowerCase())
        : true && location.type
        ? loc?.type?.toLowerCase().includes(location?.type?.toLowerCase())
        : true
    );
  }

  allFilter(locations: LocationRickMorty) {
    this.error = false;
    this.locations = [];
    this.rickMortyService
      .filterLocations(locations)
      .pipe(
        catchError((error) => {
          this.error = true;
          this.locations = [];
          this.dataSource = [];
          this.nextPage = '';
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.locations = [];
        data.results.forEach((result) => this.locations.push(result));
        this.nextPage = data.info.next;
        this.dataSource = [...this.locations];
      });
  }

  fetchPages(url: string) {
    if (this.listToDisplay === 'Favoritos' || this.controlURL === url) return;
    this.controlURL = url;
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: LocationRickMorty) => {
        this.locations.push(result);
      });
      this.nextPage = data.info.next;
      this.dataSource = [...this.locations];
      if (!data.info.next) {
        return;
      }
    });
  }

  favorited(id: number) {
    this.favoritedsIds.push(id);
    const location = this.locations.find((location) => location.id === id);
    this.favoritedLocations.push(location);
    this.snackBar.open(`${location.name} favoritado!`, 'X', { duration: 1000 });
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
    this.snackBar.open(`${location.name} desfavoritado!`, 'X', {
      duration: 1000,
    });
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
    this.favoritedLocations =
      JSON.parse(localStorage.getItem('favoritos_local')) ?? [];
  }

  setList(event: any) {
    this.listToDisplay = event.value === 'Todos' ? 'Todos' : 'Favoritos';
  }

  setMode(event: any) {
    this.modeToDisplay = event.value === 'table' ? 'table' : 'card';
  }

  redirectToLocation(id: number) {
    this.router.navigate([`detalhes/localizacao/${id}`]);
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
