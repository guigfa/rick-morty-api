import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/Character.model';
import { Episode } from '../models/Episode.model';
import { LocationRickMorty } from '../models/Location.model';
import { Return } from '../models/API-return.model';
import { enviroment } from '../enviroment/enviroment';

const characterURL = enviroment.characters;
const locationURL = enviroment.locations;
const episodeURL = enviroment.episodes;

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  
  constructor(private httpClient: HttpClient) { }
  
  getAllCharacters(url?: string): Observable<Return> {
    return url 
      ? this.httpClient.get<Return>(url) 
      : this.httpClient.get<Return>(characterURL);
  }

  getCharactersById(id: number[]): Observable<Character> {
    return this.httpClient.get<Character>(`${characterURL}/${id}`);
  }
  
  filterCharacter(character: Character): Observable<Return> {
    let params = new HttpParams();
    character.name ? params = params.append('name', character.name) : '';  
    character.status ? params = params.append('status', character.status) : ''
    character.species ? params = params.append('species', character.species) : ''
    character.type ? params = params.append('type', character.type) : ''
    character.gender ? params = params.append('gender', character.gender) : ''

    return this.httpClient.get<Return>(`${characterURL}/`, { params: params });
  }

  getAllLocations(): Observable<Return> {
    return this.httpClient.get<Return>(`${locationURL}`)
  }

  getLocationById(id: number[]): Observable<LocationRickMorty[]> {
    return this.httpClient.get<LocationRickMorty[]>(`${locationURL}/${id}`)
  }

  filterLocations(location: LocationRickMorty): Observable<Return> {
    let params = new HttpParams();
    location.name ? params = params.append('name', location.name) : '';
    location.type ? params = params.append('type', location.type): '';
    location.dimension ? params = params.append('dimension', location.dimension): '';

    return this.httpClient.get<Return>(`${locationURL}`, { params: params })
  }

  getAllEpisodes(): Observable<Return> {
    return this.httpClient.get<Return>(`${episodeURL}`)
  }

  getEpisodeById(id: number[]): Observable<Episode[]> {
    return this.httpClient.get<Episode[]>(`${episodeURL}/${id}`)
  }

  filterEpisodes(episode: Episode): Observable<Return> {
    let params = new HttpParams();
    episode.name ? params = params.append('name', episode.name) : '';
    episode.episode ? params = params.append('episode', `S0${episode.episode}`): '';

    return this.httpClient.get<Return>(`${episodeURL}`, { params: params })
  }

  loadMoreData(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }
}
