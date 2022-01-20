import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit {

  items = Array.from(new Array(100)).map((_, index) => {
    return index;
  });

  page = 1;

  paginationConfig: PaginationInstance = {
    id: 'project-pagination',
    itemsPerPage: 10,
    currentPage: 1
  } 

  constructor() { }

  ngOnInit(): void {
  }

}
