import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material.module';
import { FiltersComponent } from './lists/filters/filters.component';
import { FilterCharactersComponent } from './lists/filters/filter-characters/filter-characters.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar/toolbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FilterEpisodesComponent } from './lists/filters/filter-episodes/filter-episodes/filter-episodes.component';
import { FilterLocationsComponent } from './lists/filters/filter-locations/filter-locations/filter-locations.component';
import { DetailedCharacterComponent } from './lists/detailed-content/detailed-character/detailed-character.component';
import { DetailedEpisodeComponent } from './lists/detailed-content/detailed-episode/detailed-episode.component';
import { DetailedLocationComponent } from './lists/detailed-content/detailed-location/detailed-location.component';
import { QuizComponent } from './quiz/quiz.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

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
    UserPageComponent,
    LoginPageComponent,
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
