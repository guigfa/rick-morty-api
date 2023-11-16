import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  showFiller: boolean = true;
  isListPage: boolean = false;
  form: FormGroup = new FormGroup({
    query: new FormControl('name'),
    value: new FormControl('')
  });
  subscription: Subscription

  constructor(private router: Router, private filterService: FilterService) {}

  ngOnInit(): void {
    this.subscription = this.filterService.getToolbarValue().subscribe(val => {
      const splitted = val?.split(':');
      if(!val || !splitted[1].trim()) return;
      this.form.get('value').setValue(val ?? '');
    })
    this.filterService.isListPage$.subscribe((value) => {
      this.isListPage = value;
    });
    this.form.valueChanges.subscribe(val => {
      this.filter(this.form.value)
    })
  }

  filter(value: any) {
    value.query = 'name';    
    setTimeout(() => {
      this.filterService.setToolbarValue(`${value.query}:${value.value ?? ''}`);
    }, 300);
    this.subscription.unsubscribe();
  }

  redirectTo(component: string) {
    this.router.navigate([`${component}`]);
  }


  ngOnDestroy(): void  {
    const end = {
      query: 'name',
      value: ''
    };
    this.form.reset();
    this.filter(end);
  }
}
