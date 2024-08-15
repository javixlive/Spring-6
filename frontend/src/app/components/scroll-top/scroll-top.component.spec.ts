import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTopComponent } from './scroll-top.component';
import { CommonModule, DOCUMENT } from '@angular/common';

describe('ScrollTopComponent', () => {
  let component: ScrollTopComponent;
  let fixture: ComponentFixture<ScrollTopComponent>;
  let document: Document

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    document = TestBed.inject(DOCUMENT);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be able to tell when the windows is scrolled', async() => {
    component.onWindowScroll()
    expect(component.windowScrolled).toBeFalsy();
  })

  it('Should be able to tell when the windows is scrolled top', async() => {
    component.scrollTop()
    //height is 1225 because of header
    expect(document.documentElement.clientHeight).toEqual(1225);
  })
});
