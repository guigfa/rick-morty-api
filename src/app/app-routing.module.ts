import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { FilterCharactersComponent } from './filters/filter-characters/filter-characters/filter-characters.component';
import { FilterEpisodesComponent } from './filters/filter-episodes/filter-episodes/filter-episodes.component';
import { FilterLocationsComponent } from './filters/filter-locations/filter-locations/filter-locations.component';
import { DetailedCharacterComponent } from './detaileds/detailed-character/detailed-character.component';
import { FiltersComponent } from './filters/filters.component';
import { DetailedEpisodeComponent } from './detaileds/detailed-episode/detailed-episode.component';
import { QuizComponent } from './quiz/quiz.component';
import { DetailedLocationComponent } from './detaileds/detailed-location/detailed-location.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: MainPageComponent },
  { path: 'filtrar', component: FiltersComponent },
  { path: 'personagens', component: FilterCharactersComponent },
  { path: 'episodios', component: FilterEpisodesComponent },
  { path: 'localizacoes', component: FilterLocationsComponent },
  { path: 'personagem/:id', component: DetailedCharacterComponent },
  { path: 'episodio/:id', component: DetailedEpisodeComponent },
  { path: 'localizacao/:id', component: DetailedLocationComponent },
  { path: 'quiz', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
