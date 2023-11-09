import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Return } from 'src/shared/models/API-return.model';
import { Character } from 'src/shared/models/Character.model';
import { RickMortyService } from 'src/shared/services/rick-morty.service';
import { Gender } from 'src/shared/enums/genders.enum';
import { FilterService } from 'src/shared/services/filter.service';

@Component({
  selector: 'app-filter-characters',
  templateUrl: './filter-characters.component.html',
  styleUrls: ['./filter-characters.component.scss']
})
export class FilterCharactersComponent implements OnInit {
  characters: any[] = [];
  favoritedsIds: number[] = [];
  favoritedChars: Character[] = [];
  error: boolean = false;
  loading: boolean = false;
  nextPage: string;
  form: FormGroup = new FormGroup({
    name: new FormControl(null),
    status: new FormControl(null),
    gender: new FormControl(null),
    species: new FormControl(null),
    type: new FormControl(null),
  })
  filterValue: string;

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
    private router: Router,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterService.getToolbarValue()
      .subscribe((value) => this.filterValue = value);
      if(this.filterValue) {
        this.form.get('name').setValue(this.filterValue);
        this.filter(this.form.value);
      } else {
        this.getInitialCharacters();
        this.filterCharactersByForm();
      }
      
    this.filterService.sendData('Personagens');
  }

  getInitialCharacters() {
    this.rickMortyService.getAllCharacters()
      .subscribe(data => {
        data.results.forEach(result => {
          this.characters.push(result)
          this.nextPage = data.info.next;
        })
      })
  }

  filterCharactersByInput(event: any) {
    let value = event.target.value;
    let input = {name: ''}
    input.name = value
    if(value.length >= 5) this.filter(input);
  }

  filterCharactersByForm(){
    this.characters = [];
    this.form.valueChanges.subscribe(() => this.filter(this.form.value))
  }

  filter(character: Character) {
    this.error = false;
    this.characters = [];
    this.rickMortyService.filterCharacter(character)
    .pipe(
      catchError((error) => {
        this.error = true;
        console.log(this.error)
        return EMPTY;
      }
      )
    )
    .subscribe((data) => {
      data.results.forEach(result => this.characters.push(result))
      this.nextPage = data.info.next;
    })
  };

  fetchPages(url: string) {
    this.rickMortyService.loadMoreData(url).subscribe((data: any) => {
      data.results.forEach((result: Return) => {
        if(this.characters.includes(result)) return;
      })
      this.characters.push(...data.results);
      this.nextPage = data.info.next;
      if (!data.info.next) {
        return;
      }
    });
  };

  favorited(id: number) {
    this.favoritedsIds.push(id);
    const character = this.characters.find(character => character.id === id);
    this.favoritedChars.push(character);
  }


  unfavorited(id: number) {
    this.favoritedsIds = this.favoritedsIds.filter(ids => ids !== id);
    this.favoritedChars = this.favoritedChars.filter(character => {
      character.id !== id
    });
  }

  redirectToCharacter(id: number) {
    this.router.navigate([`/personagem/${id}`]);
  }

  get GenderEnum() {
    return Gender;
  }
}
