import { Component, HostListener, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.css'
})

export class ScrollTopComponent {
  windowScrolled = false;

  constructor(@Inject(DOCUMENT) private document:Document){}

  //window displacement will make it scroll up
  @HostListener('window:scroll',[])
  onWindowScroll() {
    if(window.scrollY || this.document.documentElement.scrollTop || this.document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if(this.windowScrolled && (window.scrollY || this.document.documentElement.scrollTop || this.document.body.scrollTop < 10)) {
      this.windowScrolled = false;
    }
  }

  scrollTop() {
    this.document.documentElement.scrollTo({top:0, behavior:'smooth'});
    this.document.body.scrollTo({top:0, behavior:'smooth'});
  }

}
