import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { Return } from 'src/shared/models/API-return.model';
import { Episode } from 'src/shared/models/Episode.model';
import { RickMortyService } from 'src/shared/services/rick-morty.service';

@Component({
  selector: 'app-filter-episodes',
  templateUrl: './filter-episodes.component.html',
  styleUrls: ['./filter-episodes.component.scss']
})
export class FilterEpisodesComponent {
  episodes: any[] = [];
  nextPage: string;
  loading: boolean = false;
  error: boolean = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(null),
    episode: new FormControl(null),
  })

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const margin = 300; 


    if (scrollY + windowHeight >= documentHeight - margin) {
      if(!this.nextPage) return;
      this.loading = true;
      this.fetchPages(this.nextPage), {eventEmitter: false}; 
    }
  }

  constructor(
    private rickMortyService: RickMortyService,
    
  ) {}

  ngOnInit(): void {
    this.getInitialCharacters();
    this.filterEpisodesByForm();
    this.form.valueChanges.subscribe(v => console.log(v))
  }

  getInitialCharacters() {
    this.rickMortyService.getAllEpisodes()
      .subscribe(data => {
        this.nextPage = data.info.next;
        data.results.forEach(result => {
          this.episodes.push(result)
        })
      })
  }

  filterEpisodesByInput(event: any) {
    let input = {name: ''}
    input.name = event
    if(event.length >= 5) this.filter(event);
  }

  filterEpisodesByForm(){
    this.form.valueChanges.subscribe(() => this.filter(this.form.value))
  }

  filter(episodes: Episode) {
    this.error = false;
    this.episodes = [];
    this.rickMortyService.filterEpisodes(episodes)
    .pipe(
      catchError((error) => {
        this.error = true;
        console.log(this.error)
        return EMPTY;
      }
      )
    )
    .subscribe((data) => data.results.forEach(result => this.episodes.push(result)))
  };

  fetchPages(url: string) {
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: Return) => {
        if(this.episodes.includes(result)) return;
      })
      this.episodes.push(...data.results);
      this.nextPage = data.info.next;
      if (!data.info.next) {
        console.log('Todos os resultados coletados:', this.episodes);
      }
    });
  }

}
