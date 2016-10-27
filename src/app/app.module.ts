import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { routing,
  appRoutingProviders }  from './app.routing';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterDirective } from './footer.directive';
import { FooterComponent } from './footer/footer.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { EpisodesDetailsComponent } from './episodes/episodes.details.component';
import { CharactersComponent } from './characters/characters.component';
import { CharactersDetailsComponent } from './characters/characters.details.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ProfileComponent,
    FooterDirective,
    FooterComponent,
    EpisodesComponent,
    EpisodesDetailsComponent,
    CharactersComponent,
    CharactersDetailsComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    JsonpModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
