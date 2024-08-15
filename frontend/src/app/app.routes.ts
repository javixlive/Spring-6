import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { MovieCardDetailsComponent } from './components/movie-card-details/movie-card-details.component';
import { AuthComponent } from './auth/auth.component';


export const routes: Routes = [

  {path: 'home', component:HomeComponent},
  {path: 'movie/:id', component:MovieCardDetailsComponent},
  {path: 'search/:text', component:SearchComponent},
  {path: 'auth', component:AuthComponent},

  {path: '', pathMatch:'full', redirectTo:'/home'},
  {path: '**',redirectTo:'/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
