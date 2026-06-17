import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Employee
} from '../../Models/employee';

import {
  EmployeeService
} from '../../Services/employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent
implements OnInit {

  employee!: Employee;


  formSubmitted = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.employeeService
      .getEmployeeById(id)
      .subscribe({

        next: (response) => {

          this.employee = response;

        }

      });

  }

  updateEmployee(): void {
    this.employeeService
      .updateEmployee(
        this.employee.employeeId,
        this.employee
      )
      .subscribe({

        next: () => {

          alert(
            'Employee Updated Successfully'
          );

          this.router.navigate([
            '/employees'
          ]);

        }

      });

  }

}