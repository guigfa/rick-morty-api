import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/shared/models/Character.model';
import { Episode } from 'src/shared/models/Episode.model';
import { RickMortyService } from 'src/shared/services/rick-morty.service';

@Component({
  selector: 'app-detailed-episode',
  templateUrl: './detailed-episode.component.html',
  styleUrls: ['./detailed-episode.component.scss']
})
export class DetailedEpisodeComponent {
  charactersId: number[] = [];
  characters: any;
  nextPage: string;
  episodeId: number;
  episode: Episode[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private rickMortyService: RickMortyService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.episodeId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getEpisode();
  }

  getEpisode() {
    this.rickMortyService.getEpisodeById([this.episodeId])
      .subscribe((data: any) => {
        this.episode = data;
        console.log(data)
        this.fetchPages(data.characters);
      });
  }

  fetchPages(urls: string[]) {
    if(urls.length < 2) {
      this.rickMortyService.loadMoreData(urls[0])
        .subscribe(data => this.episode.push(data))
    } else {
      urls.forEach(url => {
        const parts = url.split('/');
        const lastPart = parseInt(parts[parts.length - 1]);
        this.charactersId.push(lastPart);
      })
      this.rickMortyService.getCharactersById(this.charactersId)
        .subscribe(data => this.characters = data);
    }
  };

  redirectTo() {
    console.log(this.characters)
    this.router.navigate(['episodios']);
  }

  redirectToCharacter(id: number){
    this.router.navigate([`personagem/${id}`])
  }
  
  get charactersList() {
    return this.characters as Character[];
  }

  get episodeList(){
    return this.episode as Episode;
  }

}
