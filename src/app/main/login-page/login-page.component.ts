import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/guard/auth-guard.service';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginImages = [
    {
      value:
        'https://rickandmortyapi.com/api/character/avatar/306.jpeg',
      selected: false,
    },
    {
      value:
        'https://rickandmortyapi.com/api/character/avatar/48.jpeg',
      selected: false,
    },
    {
      value:
        'https://rickandmortyapi.com/api/character/avatar/80.jpeg',
      selected: false,
    },
    {
      value:
        'https://rickandmortyapi.com/api/character/avatar/28.jpeg',
      selected: false,
    },
    {
      value:
        'https://rickandmortyapi.com/api/character/avatar/43.jpeg',
      selected: false,
    },
  ];

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router, private filterService: FilterService) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((v) =>
      sessionStorage.setItem('user', JSON.stringify(this.form.value))
    );

    this.filterService.setLoginPage(true);
    this.filterService.sendListPage(false);
  }

  onImageClick(index: number) {
    this.loginImages.forEach((image, i) => {
      if (i !== index) {
        image.selected = false;
      }
    });

    this.loginImages[index].selected = !this.loginImages[index].selected;
  }

  handleImage(img: string, index: number) {
    this.onImageClick(index);
    if (this.loginImages.some((img) => img.selected)) {
      this.form.get('image').setValue(img);
    } else {
      this.form.get('image').setValue(null);
    }
  }

  send(event: any) {
    event.preventDefault();
    if (this.authService.authenticate(this.name, this.image)) {
      this.router.navigate(['inicio']);
    }
  }

  get image() {
    return this.form.get('image').value;
  }

  get name() {
    return this.form.get('name').value;
  }
}
