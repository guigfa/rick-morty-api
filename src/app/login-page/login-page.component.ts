import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/guard/auth-guard.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginImages = [
    {value: 'https://images.squarespace-cdn.com/content/v1/528252b7e4b00150d03a4848/1503802785970-D7NOQ9UQNLYAY1F6MJAP/RickAndMorty_ScaredMorty1500.png'},
    {value:'https://images.squarespace-cdn.com/content/v1/528252b7e4b00150d03a4848/1503802785970-D7NOQ9UQNLYAY1F6MJAP/RickAndMorty_ScaredMorty1500.png'}, 
    {value:'https://images.squarespace-cdn.com/content/v1/528252b7e4b00150d03a4848/1503802785970-D7NOQ9UQNLYAY1F6MJAP/RickAndMorty_ScaredMorty1500.png'},
    {value:'https://images.squarespace-cdn.com/content/v1/528252b7e4b00150d03a4848/1503802785970-D7NOQ9UQNLYAY1F6MJAP/RickAndMorty_ScaredMorty1500.png'},
    {value: 'https://images.squarespace-cdn.com/content/v1/528252b7e4b00150d03a4848/1503802785970-D7NOQ9UQNLYAY1F6MJAP/RickAndMorty_ScaredMorty1500.png'}
  ]

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((v) =>
      sessionStorage.setItem('user', JSON.stringify(this.form.value))
    );
  }

  handleImage(img: string) {
    this.form.get('image').setValue(img);
  }

  send() {
    console.log(this.name)
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
