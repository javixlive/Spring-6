import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, tap } from "rxjs/operators";
import { combineLatest } from 'rxjs';

import { MovieService } from '../../shared/services/movie.service';
import { PipesModule } from '../../pipes/pipes.module';
import { Cast } from '../../interface/credits.interface';
import { MovieDetails } from '../../interface/details.interface';

import { TitlesResponse, Movie } from "../../interface/titles.interface";

import { environment } from "../../environment/environment";


const urlDb = environment.URLDB

@Component({
  selector: 'app-movie-card-details',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './movie-card-details.component.html',
  styleUrl: './movie-card-details.component.css'
})

export class MovieCardDetailsComponent implements OnInit {

  movie?:MovieDetails;
  cast : Cast[] = [];
  constructor(private activatedRoute:ActivatedRoute, private movieSvc:MovieService, private http: HttpClient){}

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  //combine all the data from details and credits of the movie
  ngOnInit() {
    const {id} = this.activatedRoute.snapshot.params;
    // combineLatest([
    //   this.movieSvc.movieDetails(id),
    //   this.movieSvc.movieCredits(id)
    // ]).subscribe(([movie,cast])=> {
    //   if(movie === null || cast === null ) {
    //     console.error('Movie Not Found.');
    //     return;
    //   }
    //   this.movie = movie;
    //   this.cast = cast
    // })
    this.movieSvc.movieDetails(id).subscribe(movie => {
      if(movie === null) {
        console.error('Movie Not Found.');
        return;
      }
      this.movie = movie;
    })

  }

  addToFavorites() {
    const {id} = this.activatedRoute.snapshot.params;
    var movieId = JSON.stringify(id)

    if(this.isLocalStorageAvailable) {
        const userData: {
          userEmail: string;
          userId: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        //TODO: work on adding favorites
        return this.http.post(
          `${urlDb}api/Favorites`,
          {
            userId: userData.userId,
            movieId: movieId
          }
        ).pipe(
          tap(resData => {
            console.log(resData)
          }))
      }
      return "Error"
  }

  //get avg stars
  getStars(voteAverage:number) {
    const starsCount = Math.floor(voteAverage);
    return Array(starsCount).fill(0);
  }

  //buttons for returning and add to favorites
  return() {
    window.history.back()
  }

}
