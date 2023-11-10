import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @HostListener('document:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollY = (event.target as Document).documentElement.scrollTop;
    console.log(scrollY)
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
  
    const margin = 300;
  
    if (scrollY + windowHeight >= documentHeight - margin) {
      console.log('a')
    }
  }

  constructor(private router: Router){}
  
  redirectTo(component: string) {
    this.router.navigate([`${component}`]);
  }
}
