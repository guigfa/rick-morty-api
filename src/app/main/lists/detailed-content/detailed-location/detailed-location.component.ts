import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from 'src/app/shared/models/Episode.model';
import { LocationRickMorty } from 'src/app/shared/models/Location.model';
import { RickMortyService } from 'src/app/shared/services/rick-morty.service';

@Component({
  selector: 'app-detailed-location',
  templateUrl: './detailed-location.component.html',
  styleUrls: ['./detailed-location.component.scss'],
})
export class DetailedLocationComponent implements OnInit {
  charactersId: number[] = [];
  characters: any;
  location: LocationRickMorty;
  nextPage: string;
  episodeId: number;
  episode: Episode[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private rickMortyService: RickMortyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.episodeId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getLocation();
  }

  getLocation() {
    this.rickMortyService
      .getLocationById([this.episodeId])
      .subscribe((data: any) => {
        this.location = data;
        this.fetchPages(data.residents);
      });
  }

  fetchPages(urls: string[]) {
    if (urls.length < 2) {
      this.rickMortyService
        .loadMoreData(urls[0])
        .subscribe((data) => (this.location = data));
    } else {
      urls.forEach((url) => {
        const parts = url.split('/');
        const lastPart = parseInt(parts[parts.length - 1]);
        this.charactersId.push(lastPart);
      });
      this.rickMortyService
        .getCharactersById(this.charactersId)
        .subscribe((data) => (this.characters = data));
    }
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

  redirectTo() {
    this.router.navigate(['filtrar/episodios']);
  }

  redirectToCharacter(id: number) {
    this.router.navigate([`detalhes/personagem/${id}`]);
  }
}
