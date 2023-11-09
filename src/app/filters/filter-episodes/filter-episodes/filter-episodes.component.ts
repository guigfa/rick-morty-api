import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    name: new FormControl(null),
    episode: new FormControl(null),
  });
  subscription: Subscription;
  handleNewValue: string;

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
    this.filterEpisodesByForm();
    this.handleFilters();
  }

  handleFilters() {
    this.subscription = this.filterService
      .getToolbarValue()
      .subscribe((value) => {
        this.filterValue = value;

        if (this.filterValue) {
          this.form.get('name').setValue(this.filterValue);
        } else {
          this.getInitialEpisodes();
        }
        this.filterService.sendData('Episódios');
        this.filterService.sendListPage(true);
      });
  }

  getInitialEpisodes() {
    this.rickMortyService.getAllEpisodes().subscribe((data) => {
      this.nextPage = data.info.next;
      data.results.forEach((result) => {
        this.episodes.push(result);
      });
    });
  }

  filterEpisodesByInput(event: any) {
    let input = { name: '' };
    input.name = event;
    if (event.length >= 5) this.filter(event);
  }

  filterEpisodesByForm() {
    this.form.valueChanges.subscribe((val) => {
      this.handleNewValue = val.name;
      this.filter(this.form.value);
    });
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
          return EMPTY;
        })
      )
      .subscribe((data) =>
        data.results.forEach((result) => {
          if (this.episodes.includes(JSON.stringify(result))) return;
          this.episodes.push(result);
        })
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

  ngOnDestroy(): void {
    this.filterService.setToolbarValue(this.handleNewValue);
    this.subscription.unsubscribe();
  }
}
