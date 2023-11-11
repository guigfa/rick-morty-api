import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Return } from 'src/shared/models/API-return.model';
import { Episode } from 'src/shared/models/Episode.model';
import { FilterService } from 'src/shared/services/filter.service';
import { RickMortyService } from 'src/shared/services/rick-morty.service';

@Component({
  selector: 'app-filter-episodes',
  templateUrl: './filter-episodes.component.html',
  styleUrls: ['./filter-episodes.component.scss'],
})
export class FilterEpisodesComponent implements OnInit, OnDestroy {
  episodes: any[] = [];
  nextPage: string;
  loading: boolean = false;
  error: boolean = false;
  filterValue: string;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    episode: new FormControl('', [Validators.required]),
  });
  subscription: Subscription;
  handleNewValue: string;
  handlerSplitted: string[];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const margin = 300;

    if (scrollY + windowHeight >= documentHeight - margin) {
      if (!this.nextPage) return;
      this.loading = true;
      this.fetchPages(this.nextPage), { eventEmitter: false };
    }
  }

  constructor(
    private rickMortyService: RickMortyService,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleFilters();
  }

  handleFilters() {
    this.subscription = this.filterService
      .getToolbarValue()
      .subscribe((value) => {
        if (value) {
          const splitted = value.split(':');
          this.handlerSplitted = splitted;
          const episode: Episode = {
            [splitted[0].trim() ?? '']: splitted[1].trim() ?? '',
          };
          this.filter(episode);
          this.handleNewValue = JSON.stringify(episode);
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
    });
  }

  filterByForm() {
    const episode: Episode = {
      name: this.form.get('name').value,
      episode: this.form.get('episode').value,
    };
    this.filter(episode);
  }

  filter(episodes: Episode) {
    this.error = false;
    this.episodes = [];
    this.rickMortyService
      .filterEpisodes(episodes)
      .pipe(
        catchError((error) => {
          this.error = true;
          console.log(this.error);
          this.nextPage = '';
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.nextPage = data.info.next
        data.results.forEach((result) => {
          if (this.episodes.includes(result)) return;
          this.episodes.push(result);
        })
      }
      );
  }

  fetchPages(url: string) {
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: Return) => {
        if (this.episodes.includes(result)) return;
      });
      this.episodes.push(...data.results);
      this.nextPage = data.info.next;
      if (!data.info.next) {
        return;
      }
    });
  }

  redirectToEpisode(id: number) {
    this.router.navigate([`episodio/${id}`]);
  }

  back(){
    this.router.navigate(['episodios']);
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
