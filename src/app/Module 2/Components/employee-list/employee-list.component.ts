import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

import { Employee } from '../../Models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  @Input()
  employees: Employee[] = [];

  @Output()
  deleteEmployee =
    new EventEmitter<number>();

  constructor(
    private router: Router
  ) {}

  viewEmployee(id: number): void {

    this.router.navigate([
      '/employees/details',
      id
    ]);

  }

  editEmployee(id: number): void {

    this.router.navigate([
      '/employees/edit',
      id
    ]);

  }

  onDelete(id: number): void {

    this.deleteEmployee.emit(id);

  }

}