import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    CataloguePage,
    TrainerPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
