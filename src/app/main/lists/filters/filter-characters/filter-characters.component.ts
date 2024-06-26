import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Character } from 'src/app/shared/models/Character.model';
import { FilterService } from 'src/app/shared/services/filter.service';
import { RickMortyService } from 'src/app/shared/services/rick-morty.service';

@Component({
  selector: 'app-filter-characters',
  templateUrl: './filter-characters.component.html',
  styleUrls: ['./filter-characters.component.scss'],
})
export class FilterCharactersComponent implements OnInit, OnDestroy {
  characters: any[] = [];
  favoritedsIds: number[] =
    JSON.parse(localStorage.getItem('ids_favoritos')) ?? [];
  favoritedChars: Character[] =
    JSON.parse(localStorage.getItem('favoritos')) ?? [];
  error: boolean = false;
  nextPage: string;
  filterValue: string;
  subscription: Subscription;
  handlerSplitted: string[];
  listToDisplay: string = 'Todos';
  modeToDisplay: string = 'card';
  displayedColumns = [
    'name',
    'status',
    'gender',
    'origin',
    'created',
    'favorited',
    'redirect',
  ];
  dataSource: Character[] = [];
  controlURL: string;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    gender: new FormControl(''),
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
    private router: Router,
    private filterService: FilterService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
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
          const character: Character = {
            [splitted[0].trim() ?? '']: splitted[1].trim() ?? '',
          };
          this.favoriteFilter(splitted[1].trim());
          this.allFilter(character);
        } else {
          this.getInitialCharacters();
        }
      });
    this.filterService.sendListPage(true);
  }

  getInitialCharacters() {
    this.characters = [];
    this.rickMortyService.getAllCharacters().subscribe((data) => {
      data.results.forEach((result) => {
        this.characters.push(result);
        this.nextPage = data.info.next;
      });
      this.dataSource = [...this.characters];
    });
  }

  filterByForm() {
    const character: Character = {
      name: this.form.get('name').value,
      status: this.form.get('status').value,
      gender: this.form.get('gender').value,
    };
    this.allFilter(character);
    this.favoriteFilterByForm(character);
  }

  favoriteFilter(name: string) {
    this.favoritedChars = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    this.favoritedChars = this.favoritedChars.filter((char) =>
      char.name.includes(name)
    );
  }

  favoriteFilterByForm(character: Character) {
    this.error = false;
    this.favoritedChars = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    this.favoritedChars = this.favoritedChars.filter((char) =>
      character.name
        ? char?.name?.toLowerCase().includes(character?.name?.toLowerCase())
        : true && character.gender
        ? char.gender
            .toLowerCase()
            .includes(character?.gender?.toLocaleLowerCase())
        : true && character.status
        ? char.status
            .toLowerCase()
            .includes(character?.status?.toLocaleLowerCase())
        : true
    );
  }

  allFilter(character: Character) {
    this.error = false;
    this.characters = [];
    this.rickMortyService
      .filterCharacter(character)
      .pipe(
        catchError((error) => {
          this.error = true;
          this.characters = [];
          this.nextPage = '';
          this.dataSource = [];
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.characters = [];
        data.results.forEach((result) => this.characters.push(result));
        this.nextPage = data.info.next;
        this.dataSource = [...this.characters];
      });
  }

  fetchPages(url: string) {
    if (this.controlURL === url || this.listToDisplay === 'Favoritos') return;
    this.controlURL = url;
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: Character) => {
        this.characters.push(result);
      });
      this.nextPage = data.info.next;
      this.dataSource = [...this.characters];
      if (!data.info.next) {
        return;
      }
    });
  }

  favorited(id: number) {
    this.favoritedsIds.push(id);
    const character = this.characters.find((character) => character.id === id);
    this.favoritedChars.push(character);
    this.snackBar.open(`${character.name} favoritado!`, 'X', {
      duration: 1000,
    });
    this.setLocalStorage();
  }

  unfavorited(id: number) {
    const char = this.favoritedChars.find((char) => char.id === id);
    this.favoritedsIds = this.favoritedsIds.filter((ids) => ids !== id);
    const control: any[] = [];
    this.favoritedChars.forEach((char) =>
      char.id !== id ? control.push(char) : ''
    );
    this.favoritedChars = control;
    this.snackBar.open(`${char.name} desfavoritado!`, 'X', { duration: 1000 });
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem('ids_favoritos', JSON.stringify(this.favoritedsIds));
    localStorage.setItem('favoritos', JSON.stringify(this.favoritedChars));
  }

  redirectToCharacter(id: number) {
    this.router.navigate([`detalhes/personagem/${id}`]);
  }

  back() {
    this.router.navigate(['filtrar']);
  }

  reset() {
    this.form.reset();
    this.favoritedChars = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    this.getInitialCharacters();
    this.error = false;
  }

  getStatus(status: string) {
    if (status?.toLowerCase() === 'alive') {
      return 'green';
    } else if (status?.toLowerCase() === 'dead') {
      return 'red';
    } else {
      return 'grey';
    }
  }

  setList(event: any) {
    this.listToDisplay = event.value === 'Todos' ? 'Todos' : 'Favoritos';
  }

  setMode(event: any) {
    this.modeToDisplay = event.value === 'table' ? 'table' : 'card';
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
