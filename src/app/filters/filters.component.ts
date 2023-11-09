import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Return } from 'src/shared/models/API-return.model';
import { Character } from 'src/shared/models/Character.model';
import { FilterService } from 'src/shared/services/filter.service';
import { RickMortyService } from 'src/shared/services/rick-morty.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  characters: any[] = [];
  episodes: any[] = [];
  locations: any[] = [];

  constructor(
    private rickMortyService: RickMortyService,
    private filterService: FilterService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.filterService.sendData('Listagem');
    this.getInfos();
  }

  getInfos() {
    this.rickMortyService.getAllCharacters()
      .subscribe((data) => this.characters = data.results);

    this.rickMortyService.getAllEpisodes()
    .subscribe((data) => this.episodes = data.results);

    this.rickMortyService.getAllLocations()
    .subscribe((data) => this.locations = data.results);
  }

  redirectTo(route: string) {
    this.router.navigate([`${route}`])
  }
}
