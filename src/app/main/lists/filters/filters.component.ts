import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter.service';
import { RickMortyService } from 'src/app/shared/services/rick-morty.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  characters: any[] = [];
  episodes: any[] = [];
  locations: any[] = [];
  errorCharacter: boolean = false;
  errorLocation: boolean = false;
  errorEpisode: boolean = false;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private rickMortyService: RickMortyService,
    private filterService: FilterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filterService.sendListPage(false);
    this.getInfos();
  }

  getInfos() {
    this.errorCharacter = false;
    this.errorEpisode = false;
    this.errorLocation = false;

    this.rickMortyService
      .getAllCharacters()
      .subscribe((data) => (this.characters = data.results));

    this.rickMortyService
      .getAllEpisodes()
      .subscribe((data) => (this.episodes = data.results));

    this.rickMortyService
      .getAllLocations()
      .subscribe((data) => (this.locations = data.results));
  }

  filterAll() {
    this.errorCharacter = false;
    this.errorEpisode = false;
    this.errorLocation = false;

    this.rickMortyService
      .filterCharacter(this.form.value)
      .pipe(
        catchError((error) => {
          this.errorCharacter = true;
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.characters = data.results;
      });

    this.rickMortyService
      .filterEpisodes(this.form.value)
      .pipe(
        catchError((error) => {
          this.errorEpisode = true;
          return EMPTY;
        })
      )
      .subscribe((data) => (this.episodes = data.results));

    this.rickMortyService
      .filterLocations(this.form.value)
      .pipe(
        catchError((error) => {
          this.errorLocation = true;
          return EMPTY;
        })
      )
      .subscribe((data) => (this.locations = data.results));
  }

  reset() {
    this.getInfos();
    this.form.reset();
  }

  back() {
    this.router.navigate(['inicio']);
  }

  redirectTo(route: string) {
    this.router.navigate([`${route}`], { relativeTo: this.activatedRoute });
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
}
