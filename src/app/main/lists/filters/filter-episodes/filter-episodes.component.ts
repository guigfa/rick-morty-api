import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Episode } from 'src/app/shared/models/Episode.model';
import { FilterService } from 'src/app/shared/services/filter.service';
import { RickMortyService } from 'src/app/shared/services/rick-morty.service';

@Component({
  selector: 'app-filter-episodes',
  templateUrl: './filter-episodes.component.html',
  styleUrls: ['./filter-episodes.component.scss'],
})
export class FilterEpisodesComponent implements OnInit, OnDestroy {
  episodes: any[] = [];
  nextPage: string;
  error: boolean = false;
  subscription: Subscription;
  handlerSplitted: string[];
  listToDisplay: string = 'Todos';
  modeToDisplay: string = 'card';
  favoritedsIds: number[] =
    JSON.parse(localStorage.getItem('ids_favoritos_eps')) ?? [];
  favoritedEps: Episode[] =
    JSON.parse(localStorage.getItem('favoritos_eps')) ?? [];
  controlURL: string;
  displayedColumns = ['name', 'temp', 'airdate', 'favorited', 'redirect'];
  dataSource: Episode[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl(null),
    episode: new FormControl(null),
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
    private snackBar: MatSnackBar
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
          const episode: Episode = {
            [splitted[0].trim() ?? '']: splitted[1].trim() ?? '',
          };
          this.favoriteFilter(splitted[1].trim());
          this.allFilter(episode);
        } else {
          this.getInitialEpisodes();
        }
      });
    this.filterService.sendListPage(true);
  }

  getInitialEpisodes() {
    this.episodes = [];
    this.rickMortyService.getAllEpisodes().subscribe((data) => {
      this.nextPage = data.info.next;
      data.results.forEach((result) => {
        this.episodes.push(result);
      });
      this.dataSource = [...this.episodes];
    });
  }

  filterByForm() {
    const episode: Episode = {
      name: this.form.get('name').value,
      episode: this.form.get('episode').value,
    };
    this.allFilter(episode);
    this.favoriteFilterByForm(episode);
  }

  favoriteFilter(name: string) {
    this.favoritedEps = JSON.parse(localStorage.getItem('favoritos_eps')) ?? [];
    this.favoritedEps = this.favoritedEps.filter((ep) =>
      ep.name.includes(name)
    );
  }

  favoriteFilterByForm(episode: Episode) {
    this.error = false;
    this.favoritedEps = JSON.parse(localStorage.getItem('favoritos_eps')) ?? [];
    this.favoritedEps = this.favoritedEps.filter((ep) =>
      episode.episode
        ? ep?.episode?.toLowerCase().includes(`s0${episode?.episode}`)
        : true && episode.name
        ? ep?.name?.toLowerCase().includes(episode?.name?.toLowerCase())
        : true
    );
  }

  allFilter(episodes: Episode) {
    this.error = false;
    this.episodes = [];
    this.rickMortyService
      .filterEpisodes(episodes)
      .pipe(
        catchError((error) => {
          this.error = true;
          this.episodes = [];
          this.dataSource = [];
          this.nextPage = '';
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.episodes = [];
        data.results.forEach((result) => this.episodes.push(result));
        this.nextPage = data.info.next;
        this.dataSource = [...this.episodes];
      });
  }

  fetchPages(url: string) {
    if (url === this.controlURL || this.listToDisplay === 'Favoritos') return;
    this.controlURL = url;
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: Episode) => {
        this.episodes.push(result);
      });
      this.nextPage = data.info.next;
      this.dataSource = [...this.episodes];
      if (!data.info.next) {
        return;
      }
    });
  }

  favorited(id: number) {
    this.favoritedsIds.push(id);
    const episode = this.episodes.find((episode) => episode.id === id);
    this.favoritedEps.push(episode);
    this.snackBar.open(`${episode.name} favoritado!`, 'X', { duration: 1000 });
    this.setLocalStorage();
  }

  unfavorited(id: number) {
    const ep = this.favoritedEps.find((ep) => ep.id === id);
    this.favoritedsIds = this.favoritedsIds.filter((ids) => ids !== id);
    const control: any[] = [];
    this.favoritedEps.forEach((char) =>
      char.id !== id ? control.push(char) : ''
    );
    this.favoritedEps = control;
    this.snackBar.open(`${ep.name} desfavoritado!`, 'X', { duration: 1000 });
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem(
      'ids_favoritos_eps',
      JSON.stringify(this.favoritedsIds)
    );
    localStorage.setItem('favoritos_eps', JSON.stringify(this.favoritedEps));
  }

  setList(event: any) {
    this.listToDisplay = event.value === 'Todos' ? 'Todos' : 'Favoritos';
  }

  setMode(event: any) {
    this.modeToDisplay = event.value === 'table' ? 'table' : 'card';
  }

  reset() {
    this.form.reset();
    this.getInitialEpisodes();
    this.favoritedEps = JSON.parse(localStorage.getItem('favoritos_eps')) ?? [];
  }

  redirectToEpisode(id: number) {
    this.router.navigate([`detalhes/episodio/${id}`]);
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
