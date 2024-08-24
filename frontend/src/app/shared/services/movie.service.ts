import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, tap } from "rxjs";
import { TitlesResponse, Movie } from "../../interface/titles.interface";
import { MovieDetails } from "../../interface/details.interface";
import { Cast, Credits } from "../../interface/credits.interface";

import { environment } from "../../environment/environment";

//Authorization to make API request
const token = environment.TOKEN
const url = environment.URL
const headers = {Authorization:token};
//-------------------------------------
//New Data base
const urlDb = environment.URLDB

@Injectable({
    providedIn: 'root'
})

export class MovieService {

    private moviePage = 1;
    public loading = false;

    constructor(private http:HttpClient) {}

    //GET request
    getMovie():Observable<Movie[]>{

        if(this.loading) return of([]) //of emits values in a sequence
        this.loading = true
        // //----------API----------------
        // return this.http.get<TitlesResponse>(
        //     `${url}/movie/now_playing?language=es-ES&page=${this.moviePage}`,{headers}
        // ).pipe(
        // map((response:any)=> response.results),
        // tap(() => {
        //     this.moviePage += 1;
        //     this.loading = false
        // })
        // )
        //---------------------------------
        //-----------DB--------------------
        return this.http.get<TitlesResponse>(
          `${urlDb}api/Movies`
        ).pipe(
          map((response:any) => {
            return response
          }),
          tap(()=> {
            this.loading = false
          })
        )
        //////////////////////////////////
    }

    searchMovie(text:string):Observable<Movie[]> {
      //---------------API---------------------------
        // return this.http.get<TitlesResponse>(
        //     `${url}/search/movie?query=${text}&language=es-ES&page=1`,{headers}
        // ).pipe(
        //     map(res => res.results)
        // )
      //-----------------------------------------------
      return this.http.get<TitlesResponse>(
        `${urlDb}api/Movies/${text}`
      ).pipe(
        map(res => {
          console.log(res)
          return res.results
        })
      )
      /////////////////////////////////////////
    }

    //This is to find specific info on a certain movie for MovieCardDetails
    //---------------API--------------------
    // movieDetails(id:string) {
    //     return this.http.get<MovieDetails>(`${url}/movie/${id}?language=es-ES`,{headers}).pipe(
    //         catchError(err=> of(null))
    //     )
    // }
    //-----------------------------------------
    //---------------DB-----------------------
    movieDetails(id:string) {
      return this.http.get<MovieDetails>(`${urlDb}api/Movies/${id}`).pipe(
                catchError(err=> of(null))
            )
    }

    //TODO: Add another table on the DB for Cast/Credits
    movieCredits(id:string):Observable<Cast[] | null> {
        return this.http.get<Credits>(`${url}/movie/${id}/credits?language=es-ES`,{headers}).pipe(

            map(res=>res.cast),
            catchError(err=> of(null))
        )
    }

    resetMoviePage() {
        this.moviePage = 1;
    }

}

