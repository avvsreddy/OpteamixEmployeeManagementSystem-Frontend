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

  currentPage = 1;
  itemsPerPage = 20;

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

  get paginatedEmployees(): Employee[] {
    const start = 
      (this.currentPage - 1) * this.itemsPerPage;

    const end = 
      start + this.itemsPerPage;

      return this.employees.slice(
        start,
        end
      );
  }

  get totalPages(): number {
    return Math.ceil(
      this.employees.length /
      this.itemsPerPage
    );
  }

  previousPage() {
    if(this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

}