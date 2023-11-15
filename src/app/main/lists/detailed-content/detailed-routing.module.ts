import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../../main-page/main-page.component';
import { DetailedCharacterComponent } from './detailed-character/detailed-character.component';
import { DetailedEpisodeComponent } from './detailed-episode/detailed-episode.component';
import { DetailedLocationComponent } from './detailed-location/detailed-location.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'personagem/:id', component: DetailedCharacterComponent },
  { path: 'episodio/:id', component: DetailedEpisodeComponent },
  { path: 'localizacao/:id', component: DetailedLocationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailedRoutingModule {}
