import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HomeComponent } from './home.component';

import { MovieService } from '../../shared/services/movie.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MovieService],
      imports: [HomeComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MovieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Unit test for subscribe method', fakeAsync(()=> {
    let spy = spyOn(service, 'getMovie').and.returnValue(of([]));
    let subsSpy = spyOn(service.getMovie(), 'subscribe');
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledBefore(subsSpy)
    expect(subsSpy).toHaveBeenCalled();
  }))

  it("Should load more movies", () => {
    const mock = [{
      adult:             false,
      backdrop_path:     "string",
      genre_ids:         [1,2],
      id:                1,
      original_language: "en",
      original_title:    "string",
      overview:          "string",
      popularity:        5,
      poster_path:       "string",
      release_date:      "string",
      title:             "string",
      video:             false,
      vote_average:      1,
      vote_count:        1
    }]
    component.loadMovies()

    expect(component.movies).toEqual([],mock)
  })

});
