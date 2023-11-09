import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterService } from 'src/shared/services/filter.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  showFiller: boolean = true;
  isListPage: boolean = false;
  form: FormGroup = new FormGroup({
    query: new FormControl(null),
  });
  label: string;

  filterParams: any[] = [
    { value: 'name', label: 'Nome' },
    { value: 'status', label: 'Status' },
    { value: 'gender', label: 'Gênero' },
    { value: 'origin', label: 'Origem' },
    { value: 'name', label: 'Nome' },
    { value: 'name', label: 'Nome' },
  ];

  constructor(private router: Router, private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.dataLabel$.subscribe((value) => {
      this.label = value;
    });
    this.filterService.isListPage$.subscribe((value) => {
      this.isListPage = value;
    });
  }

  redirectTo(component: string) {
    this.router.navigate([`${component}`]);
  }

  filter(value: any) {
    this.filterService.setToolbarValue(value.target.value);
  }
}
