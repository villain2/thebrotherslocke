import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { EpisodesComponent } from "./episodes/episodes.component";
import { EpisodesDetailsComponent } from "./episodes/episodes.details.component";
import { CharactersDetailsComponent } from "./characters/characters.details.component";
import {SafeGameComponent} from "./safe-game-old/safe-game.component";

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent},
  { path: '', component: HomeComponent },
  { path: 'episodes', component: EpisodesComponent },
  { path: 'episodes/:id', component: EpisodesDetailsComponent },
  { path: 'characters/:id', component: CharactersDetailsComponent },
  { path: 'safe-game', component: SafeGameComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
