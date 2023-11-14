import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './main/login-page/login-page.component';
import { AuthGuard } from './shared/guard.guard';
import { MainPageComponent } from './main/main-page/main-page.component';
import { FiltersComponent } from './main/lists/filters/filters.component';
import { FilterCharactersComponent } from './main/lists/filters/filter-characters/filter-characters.component';
import { FilterEpisodesComponent } from './main/lists/filters/filter-episodes/filter-episodes/filter-episodes.component';
import { FilterLocationsComponent } from './main/lists/filters/filter-locations/filter-locations/filter-locations.component';
import { DetailedCharacterComponent } from './main/lists/detailed-content/detailed-character/detailed-character.component';
import { DetailedEpisodeComponent } from './main/lists/detailed-content/detailed-episode/detailed-episode.component';
import { DetailedLocationComponent } from './main/lists/detailed-content/detailed-location/detailed-location.component';
import { QuizComponent } from './main/quiz/quiz.component';
import { UserPageComponent } from './main/user-page/user-page.component';
import { FavoritedsComponent } from './main/lists/favoriteds/favoriteds.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'filtrar', component: FiltersComponent, canActivate: [AuthGuard] },
  {
    path: 'personagens',
    component: FilterCharactersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'episodios',
    component: FilterEpisodesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'localizacoes',
    component: FilterLocationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'personagem/:id',
    component: DetailedCharacterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'episodio/:id',
    component: DetailedEpisodeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'localizacao/:id',
    component: DetailedLocationComponent,
    canActivate: [AuthGuard],
  },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'favoritos', component: FavoritedsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
