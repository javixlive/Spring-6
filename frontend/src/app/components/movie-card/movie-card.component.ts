import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Movie } from '../../interface/titles.interface';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})

export class MovieCardComponent {

  @Input() movies?:Movie[]

  constructor(private router:Router) {}
  onMovieClick(movie:Movie){
    this.router.navigate(['/movie', movie.id])
  }

}
