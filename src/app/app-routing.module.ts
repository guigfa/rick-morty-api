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
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from 'src/shared/guard.guard';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'inicio', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'filtrar', component: FiltersComponent, canActivate: [AuthGuard] },
  { path: 'personagens', component: FilterCharactersComponent, canActivate: [AuthGuard] },
  { path: 'episodios', component: FilterEpisodesComponent, canActivate: [AuthGuard] },
  { path: 'localizacoes', component: FilterLocationsComponent, canActivate: [AuthGuard] },
  { path: 'personagem/:id', component: DetailedCharacterComponent, canActivate: [AuthGuard] },
  { path: 'episodio/:id', component: DetailedEpisodeComponent, canActivate: [AuthGuard] },
  { path: 'localizacao/:id', component: DetailedLocationComponent, canActivate: [AuthGuard] },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UserPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
