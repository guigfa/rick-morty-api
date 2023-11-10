import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material.module';
import { FiltersComponent } from './filters/filters.component';
import { FilterCharactersComponent } from './filters/filter-characters/filter-characters/filter-characters.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { FilterEpisodesComponent } from './filters/filter-episodes/filter-episodes/filter-episodes.component';
import { FilterLocationsComponent } from './filters/filter-locations/filter-locations/filter-locations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailedCharacterComponent } from './detaileds/detailed-character/detailed-character.component';
import { DetailedEpisodeComponent } from './detaileds/detailed-episode/detailed-episode.component';
import { DetailedLocationComponent } from './detaileds/detailed-location/detailed-location.component';
import { QuizComponent } from './quiz/quiz.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    FilterCharactersComponent,
    MainPageComponent,
    ToolbarComponent,
    FilterEpisodesComponent,
    FilterLocationsComponent,
    DetailedCharacterComponent,
    DetailedEpisodeComponent,
    DetailedLocationComponent,
    QuizComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
