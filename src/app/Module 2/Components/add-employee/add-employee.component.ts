import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {EmployeeCreateDto} from '../../Models/employee';
import {EmployeeService} from '../../Services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {

  employee: EmployeeCreateDto = {

    employeeCode: '',
    name: '',
    email: '',
    phoneNumber: '',
    departmentId: 1,
    designation: '',
    joiningDate: '',
    salary: 0

  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  saveEmployee(): void {

    this.employeeService
      .createEmployee(this.employee)
      .subscribe({

        next: () => {

          alert('Employee Added');

          this.router.navigate([
            '/employees'
          ]);
          console.log('Save Clicked');
        }

      });

  }

}