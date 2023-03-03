import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { DetailsPage } from './pages/details/details.page';
import { LoginPage } from './pages/login/login.page';
import { TrainerPage } from './pages/trainer/trainer.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage, title: 'Login - Pokémoon Trainer' },
  {
    path: 'catalogue',
    component: CataloguePage,
    title: 'Catalogue - Pokémoon Trainer',
    canActivate: [AuthGuard],
  },
  {
    path: 'trainer',
    component: TrainerPage,
    title: 'Trainer - Pokémoon Trainer',
    canActivate: [AuthGuard],
  },
  {
    path: 'details/:pokemonId',
    component: DetailsPage,
    title: 'Details - Pokémoon Trainer',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
