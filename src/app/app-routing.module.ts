import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './main/login-page/login-page.component';
import { AuthGuard } from './shared/guard.guard';
import { MainPageComponent } from './main/main-page/main-page.component';
import { QuizComponent } from './main/quiz/quiz.component';
import { UserPageComponent } from './main/user-page/user-page.component';
import { FavoritedsComponent } from './main/lists/favoriteds/favoriteds.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: MainPageComponent, canActivate: [AuthGuard] },
  {
    path: 'filtrar',
    loadChildren: () =>
      import('./main/lists/filters/filters-routing.module').then(
        (m) => m.FiltersRoutingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'detalhes',
    loadChildren: () =>
      import('./main/lists/detailed-content/detailed-routing.module').then(
        (m) => m.DetailedRoutingModule
      ), canActivate: [AuthGuard]
  },

  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UserPageComponent, canActivate: [AuthGuard] },
  {
    path: 'favoritos',
    component: FavoritedsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
