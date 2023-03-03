import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LoginComponent } from './components/login/login.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { TrainerService } from './services/trainer.service';
import { PokemonService } from './services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { DetailsComponent } from './components/details/details.component';
import { DetailsPage } from './pages/details/details.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    CataloguePage,
    TrainerPage,
    DetailsPage,
    LoginComponent,
    CatalogueComponent,
    TrainerComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    LoginFormComponent,
    DetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [AuthService, TrainerService, PokemonService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
