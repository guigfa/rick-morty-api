import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from 'src/shared/models/Character.model';
import { Episode } from 'src/shared/models/Episode.model';
import { LocationRickMorty } from 'src/shared/models/Location.model';
import { FilterService } from 'src/shared/services/filter.service';
import { RickMortyService } from 'src/shared/services/rick-morty.service';

@Component({
  selector: 'app-favoriteds',
  templateUrl: './favoriteds.component.html',
  styleUrls: ['./favoriteds.component.scss']
})
export class FavoritedsComponent {
  characters: Character[] = JSON.parse(localStorage.getItem('favoritos')) ?? '';
  episodes: Episode[] = JSON.parse(localStorage.getItem('favoritos_eps')) ?? '';;
  locations: LocationRickMorty[] = JSON.parse(localStorage.getItem('favoritos_local')) ?? '';;
  errorCharacter: boolean = false;
  errorLocation: boolean = false;
  errorEpisode: boolean = false;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private rickMortyService: RickMortyService,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterService.sendListPage(false);
    this.getInfos();
  }

  getInfos() {
    this.errorCharacter = this.characters.length !== 0 ? false : true;
    this.errorEpisode = this.episodes.length !== 0 ? false : true;
    this.errorLocation = this.locations.length !== 0 ? false : true;
  }

  reset() {
    this.getInfos();
    this.form.reset();
  }

  back() {
    this.router.navigate(['inicio']);
  }

  redirectTo(route: string) {
    this.router.navigate([`${route}`]);
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
