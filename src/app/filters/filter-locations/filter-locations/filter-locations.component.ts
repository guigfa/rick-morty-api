import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { Return } from 'src/shared/models/API-return.model';
import { LocationRickMorty } from 'src/shared/models/Location.model';
import { FilterService } from 'src/shared/services/filter.service';
import { RickMortyService } from 'src/shared/services/rick-morty.service';

@Component({
  selector: 'app-filter-locations',
  templateUrl: './filter-locations.component.html',
  styleUrls: ['./filter-locations.component.scss']
})
export class FilterLocationsComponent {
  isFetching: boolean = false;
  locations: any[] = [];
  nextPage: string;
  error: boolean = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(null),
    type: new FormControl(null),
    dimension: new FormControl(null),
  })

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const margin = 300; 


    if (scrollY + windowHeight >= documentHeight - margin) {
      if (!this.nextPage || this.isFetching) return;
      
      // Set a flag to indicate that a request is in progress
      this.isFetching = true;

    // Wrap the API call in a Promise
    new Promise<void>((resolve) => {
      this.fetchPages(this.nextPage);
      resolve(); // Resolve the Promise immediately
    }).then(() => {
      // Reset the flag after the request is complete
      this.isFetching = false;
    });
  }
  }

  constructor(
    private rickMortyService: RickMortyService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterService.sendData('Localizações')
    this.getInitialCharacters();
    this.filterLocationsByForm();
  }

  getInitialCharacters() {
    this.rickMortyService.getAllLocations()
      .subscribe(data => {
        this.nextPage = data.info.next
        data.results.forEach(result => {
          this.locations.push(result)
        })
      })
  }

  filterLocationsByInput(event: any) {
    let input = {name: ''}
    input.name = event
    if(event.length >= 5) this.filter(event);
  }

  filterLocationsByForm(){
    this.form.valueChanges.subscribe(() => this.filter(this.form.value))
  }

  filter(locations: LocationRickMorty) {
    this.error = false;
    this.locations = [];
    this.rickMortyService.filterLocations(locations)
    .pipe(
      catchError((error) => {
        this.error = true;
        return EMPTY;
      })
    )
    .subscribe((data) => data.results.forEach(result => this.locations.push(result)))
  };

  fetchPages(url: string) {
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: Return) => {
        if(this.locations.includes(result)) return;
      })
      this.locations.push(...data.results);
      this.nextPage = data.info.next;
      if (!data.info.next) {
        return;
      }
    });
  }

}
