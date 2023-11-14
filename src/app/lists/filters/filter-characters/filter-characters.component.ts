import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Return } from 'src/shared/models/API-return.model';
import { Character } from 'src/shared/models/Character.model';
import { RickMortyService } from 'src/shared/services/rick-morty.service';
import { FilterService } from 'src/shared/services/filter.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  loading: boolean = false;
  nextPage: string;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });
  filterValue: string;
  handleNewValue: string;
  subscription: Subscription;
  handlerSplitted: string[];
  listToDisplay: string = 'Todos';

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
    private router: Router,
    private filterService: FilterService,
    private snackBar: MatSnackBar
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
          const character: Character = {
            [splitted[0].trim() ?? '']: splitted[1].trim() ?? '',
          };
          console.log(splitted)
          this.filter(character);
          this.handleNewValue = JSON.stringify(character);
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
    });
  }

  filterByForm() {
    const character: Character = {
      name: this.form.get('name').value,
      status: this.form.get('status').value,
      gender: this.form.get('gender').value,
    };
    this.filter(character);
  }

  filter(character: Character) {
    this.error = false;
    this.characters = [];
    this.rickMortyService
      .filterCharacter(character)
      .pipe(
        catchError((error) => {
          this.error = true;
          this.characters = [];
          this.nextPage = '';
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.characters = [];
        console.log(data.results)
        data.results.forEach((result) => this.characters.push(result));
        this.nextPage = data.info.next;
      });
  }

  fetchPages(url: string) {
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: Character) => {
        if (this.characters.includes(result.name)) return;
        this.characters.push(result);
      });
      this.nextPage = data.info.next;
      if (!data.info.next) {
        return;
      }
    });
  }

  favorited(id: number) {
    this.favoritedsIds.push(id);
    const character = this.characters.find((character) => character.id === id);
    this.favoritedChars.push(character);
    this.snackBar.open(`${character.name} favoritado!`, 'X', {duration: 1000});
    this.setLocalStorage();
  }

  unfavorited(id: number) {
    const char = this.favoritedChars.find((char) => char.id === id)
    this.favoritedsIds = this.favoritedsIds.filter((ids) => ids !== id);
    const control: any[] = [];
    this.favoritedChars.forEach((char) =>
      char.id !== id ? control.push(char) : ''
    );
    this.favoritedChars = control;
    this.snackBar.open(`${char.name} desfavoritado!`, 'X', {duration: 1000});
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem('ids_favoritos', JSON.stringify(this.favoritedsIds));
    localStorage.setItem('favoritos', JSON.stringify(this.favoritedChars));
  }

  redirectToCharacter(id: number) {
    this.router.navigate([`/personagem/${id}`]);
  }

  back() {
    this.router.navigate(['filtrar']);
  }

  reset(){
    this.form.reset(); 
    this.getInitialCharacters();
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

  setList(event: any) {
    this.listToDisplay = event.value === 'Todos' ? 'Todos' : 'Favoritos';
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
