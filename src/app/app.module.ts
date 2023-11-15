import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { FiltersComponent } from './main/lists/filters/filters.component';
import { FilterCharactersComponent } from './main/lists/filters/filter-characters/filter-characters.component';
import { MainPageComponent } from './main/main-page/main-page.component';
import { DetailedCharacterComponent } from './main/lists/detailed-content/detailed-character/detailed-character.component';
import { DetailedEpisodeComponent } from './main/lists/detailed-content/detailed-episode/detailed-episode.component';
import { DetailedLocationComponent } from './main/lists/detailed-content/detailed-location/detailed-location.component';
import { QuizComponent } from './main/quiz/quiz.component';
import { SidebarComponent } from './main/navigation/sidebar/sidebar.component';
import { UserPageComponent } from './main/user-page/user-page.component';
import { LoginPageComponent } from './main/login-page/login-page.component';
import { FavoritedsComponent } from './main/lists/favoriteds/favoriteds.component';
import { FilterEpisodesComponent } from './main/lists/filters/filter-episodes/filter-episodes.component';
import { FilterLocationsComponent } from './main/lists/filters/filter-locations/filter-locations.component';
import { ToolbarComponent } from './main/navigation/toolbar/toolbar.component';
import { TranslateGenderPipe } from './shared/pipes/translate-gender.pipe';
import { PipeModule } from './shared/pipes/pipe.module';
import { TranslateStatusPipe } from './shared/pipes/translate-status.pipe';
import { TranslateSpeciePipe } from './shared/pipes/translate-specie.pipe';

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
    FavoritedsComponent,
    TranslateGenderPipe,
    TranslateStatusPipe,
    TranslateSpeciePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [PipeModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
