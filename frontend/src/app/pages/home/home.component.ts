import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieService } from '../../shared/services/movie.service';
import { Movie } from '../../interface/titles.interface';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  movies:Movie[]=[];
  loadedMoviesIds = new Set<number>();
  //Allows to work directly with the DOM for infinite scroll
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    //when position is bigger it will load more titles
    if(pos > max) {
      this.loadMoreMovies();
    }
  }

  constructor(private moviesSvc:MovieService){
    this.moviesSvc.resetMoviePage();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      this.loadMovies();
  }

  loadMovies() {
    this.moviesSvc.getMovie().subscribe(res => {
      this.movies = res;
      this.updateLoadedMovieIds();
    })
  }

  //should it load more movies
  loadMoreMovies() {
    this.moviesSvc.getMovie().subscribe(res => {
      const newMovies = res.filter(movie => !this.loadedMoviesIds.has(movie.movieId));
      this.movies.push(...newMovies);
      this.updateLoadedMovieIds();
    })
  }

  updateLoadedMovieIds() {
    this.movies.forEach(movie => this.loadedMoviesIds.add(movie.movieId))
  }

}
