import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthComponent } from './auth.component';

import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [AuthComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a user', () => {
    const form = <NgForm>{
      value: {
        email: "email",
        password: "password"
      }
    }
    component.onSubmit(form);
    expect(component.isLoginMode).toBeTruthy()
  })

});
