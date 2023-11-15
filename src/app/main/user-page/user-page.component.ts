import { Component } from '@angular/core';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent {
  user: any = sessionStorage.getItem('user');
  name;
  image;
  bio: string = localStorage.getItem('bio') ?? '';
  edit: boolean = false;

  constructor(private filterService: FilterService) {
    const parse = JSON.parse(this.user);
    this.name = parse.name;
    this.image = parse.image;
    this.filterService.sendListPage(false);
  }

  saveBio(bio: string) {
    this.bio = bio;
    localStorage.setItem('bio', bio);
    this.edit = false;
  }

  handleEdit() {
    this.edit = true;
  }

}
