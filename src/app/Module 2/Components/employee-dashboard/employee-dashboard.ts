import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';


@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EmployeeListComponent,
    AsyncPipe
  ],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css'
})
export class EmployeeDashboardComponent implements OnInit {

  employees: Employee[] = [];
  //employees$!: Observable<Employee[]>;
  totalEmployees = 0;
  totalDepartments = 0;
  activeEmployees = 0;
  cdr:ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {

    this.loadEmployees();

    //this.employees$ = this.employeeService.getEmployees();

  }

  loadEmployees(): void {

  this.employeeService
    .getEmployees()
    .subscribe({

      next: (response: Employee[]) => {

        this.employees = response;

        // alert(
        //   'Employees Loaded: ' +
        //   response.length
        // );

        this.employees = response;

        this.totalEmployees =
          response.length;

        this.activeEmployees =
          response.length;

        this.totalDepartments =
          new Set(
            response.map(
              x => x.departmentId
            )
          ).size;
          this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(error);

      }

    });

}

  onDeleteEmployee(id: number): void {

    if (!confirm('Delete Employee?')) {
      return;
    }

    this.employeeService
      .deleteEmployee(id)
      .subscribe({

        next: () => {

          this.loadEmployees();

        },

        error: (error) => {

          console.log(error);

        }

      });

  }

}