import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersComponent } from './filters.component';
import { FilterEpisodesComponent } from './filter-episodes/filter-episodes.component';
import { FilterLocationsComponent } from './filter-locations/filter-locations.component';
import { FilterCharactersComponent } from './filter-characters/filter-characters.component';

const routes: Routes = [
 { path: '', component: FiltersComponent},
 { path: 'episodios', component: FilterEpisodesComponent },
 { path: 'localizacoes', component: FilterLocationsComponent },
 { path: 'personagens', component: FilterCharactersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltersRoutingModule {}
