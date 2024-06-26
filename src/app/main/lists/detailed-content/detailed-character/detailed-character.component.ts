import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/shared/models/Character.model';
import { Episode } from 'src/app/shared/models/Episode.model';
import { RickMortyService } from 'src/app/shared/services/rick-morty.service';

@Component({
  selector: 'app-detailed-character',
  templateUrl: './detailed-character.component.html',
  styleUrls: ['./detailed-character.component.scss'],
})
export class DetailedCharacterComponent implements OnInit {
  characterId: number;
  character: Character;
  episodesId: any[] = [];
  nextPage: string;
  episodes: Episode[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private rickMortyService: RickMortyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.characterId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    this.getCharacter();
  }

  getCharacter() {
    this.rickMortyService
      .getCharactersById([this.characterId])
      .subscribe((data) => {
        this.character = data;
        this.fetchPages(data.episode);
      });
  }

  fetchPages(urls: string[]) {
    if (urls.length < 2) {
      this.rickMortyService
        .loadMoreData(urls[0])
        .subscribe((data) => this.episodes.push(data));
    } else {
      urls.forEach((url) => {
        const parts = url.split('/');
        const lastPart = parseInt(parts[parts.length - 1]);
        this.episodesId.push(lastPart);
      });
      this.rickMortyService
        .getEpisodeById(this.episodesId)
        .subscribe((data) => (this.episodes = data));
    }
  }

  redirectToEpisode(id: number){
    this.router.navigate([`detalhes/episodio/${id}`])
  }

  redirectTo() {
    this.router.navigate(['filtrar/personagens']);
  }
}
