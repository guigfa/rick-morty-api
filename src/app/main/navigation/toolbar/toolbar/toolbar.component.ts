import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  showFiller: boolean = true;
  isListPage: boolean = false;
  form: FormGroup = new FormGroup({
    query: new FormControl('name'),
    value: new FormControl('')
  });

  constructor(private router: Router, private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.isListPage$.subscribe((value) => {
      this.isListPage = value;
    });
    this.form.valueChanges.subscribe(val => {
      this.filter(this.form.value)
    })
  }

  redirectTo(component: string) {
    this.router.navigate([`${component}`]);
  }

  filter(value: any) {
    value.query = 'name';    
    setTimeout(() => {
      this.filterService.setToolbarValue(`${value.query}:${value.value ?? ''}`)
    }, 300)
  }
}
