import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { MovieCardDetailsComponent } from './movie-card-details.component';

import { MovieService } from '../../shared/services/movie.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('MovieCardDetailsComponent', () => {
  let component: MovieCardDetailsComponent;
  let fixture: ComponentFixture<MovieCardDetailsComponent>;
  let service: MovieService;
  let route : ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MovieService],
      imports: [MovieCardDetailsComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MovieService);
    route = TestBed.inject(ActivatedRoute)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should count average stars', () => {
    const scores = 2.5588;
    const total = component.getStars(scores);
    expect(total).toEqual([0,0])
  });

  // it('Should unit test for subscribe method', fakeAsync(() => {
  //   let spy = spyOn(service, 'movieDetails').and.returnValue(of([]));
  //   let subsSpy = spyOn(service.movieDetails(route), 'subscribe');
  // }));
});
