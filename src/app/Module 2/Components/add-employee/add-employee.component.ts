import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeCreateDto } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../Models/department';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit { 

  employee: EmployeeCreateDto = {
    employeeCode: '',
    name: '',
    email: '',
    phoneNumber: '',
    departmentId: 1,
    designation: '',
    joiningDate: '',
    salary: null as any
  };

  formSubmitted = false;

  departments: Department[] = []; 

  constructor(
    private employeeService: EmployeeService,
    private departmentServices: DepartmentService,
    private router: Router
  ) { }


  
  //added now
  
  ngOnInit(): void {

    this.departmentServices.getDepartments().subscribe({
      next: (Response) => {
        console.log('Departments: ',Response);
        this.departments = Response;
      },
      error: (error) => {
        console.log('Department Error: ',error);
      }
    });
  }



  saveEmployee(): void {

    this.formSubmitted = true;

    if (!this.isFormValid()) {
      return;
    }

    this.employeeService
      .createEmployee(this.employee)
      .subscribe({

        next: () => {

          alert('Employee Added Successfully');

          this.router.navigate([
            '/employees'
          ]);

        },

        error: (error) => {

          console.log(error);

          alert('Failed to save employee');

        }

      });

  }

  isFormValid(): boolean {

    return (

      this.employee.employeeCode.trim() !== '' &&

      this.employee.name.trim() !== '' &&

      this.employee.email.trim() !== '' &&

      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        this.employee.email
      ) &&

      /^\d{10}$/.test(
        this.employee.phoneNumber
      ) &&

      this.employee.designation.trim() !== '' &&

      this.employee.joiningDate !== '' &&

      this.employee.salary > 0

    );

  }

  isValidEmail(): boolean {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    this.employee.email
  );

}

isValidPhone(): boolean {

  return /^\d{10}$/.test(
    this.employee.phoneNumber
  );

}

}