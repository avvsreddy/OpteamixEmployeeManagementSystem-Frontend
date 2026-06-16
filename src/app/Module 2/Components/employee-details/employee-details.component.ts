// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';

// import { Employee } from '../../Models/employee';
// import { EmployeeService } from '../../Services/employee.service';

// @Component({
//   selector: 'app-employee-details',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './employee-details.component.html',
//   styleUrl: './employee-details.component.css'
// })
// export class EmployeeDetailsComponent implements OnInit {

//   employee!: Employee;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private employeeService: EmployeeService
//   ) { }

//   ngOnInit(): void {

//     const id = Number(
//       this.route.snapshot.paramMap.get('id')
//     );

//     console.log('Employee ID:', id);

//     this.employeeService
//       .getEmployeeById(id)
//       .subscribe(
//         (response) => {
//           console.log(response);
//           this.employee = response;
//         },
//         (error) => {
//           console.log(error);
//         }
//       );

//   }

//   goBack(): void {

//     this.router.navigate([
//       '/employees'
//     ]);

//   }

// }

//  ////////edited by me

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   ActivatedRoute,
//   Router,
//   RouterModule
// } from '@angular/router';

// import { Employee } from '../../Models/employee';
// import { EmployeeService } from '../../Services/employee.service';

// @Component({
//   selector: 'app-employee-details',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule
//   ],
//   templateUrl: './employee-details.component.html',
//   styleUrl: './employee-details.component.css'
// })
// export class EmployeeDetailsComponent implements OnInit {

//   employee: Employee | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private employeeService: EmployeeService
//   ) {}

//   ngOnInit(): void {

//     const id =
//       Number(
//         this.route.snapshot.paramMap.get('id')
//       );

//     console.log('Route ID = ', id);

//     this.employeeService
//       .getEmployeeById(id)
//       .subscribe({

//         next: (response) => {

//           console.log('Employee API Success');

//           console.log(response);

//           this.employee = response;

//         },

//         error: (error) => {

//           console.log('Employee API Error');

//           console.log(error);

//         }

//       });

//   }

//   goBack(): void {

//     this.router.navigate([
//       '/employees'
//     ]);

//   }

// } //// second code

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   ActivatedRoute,
//   Router,
//   RouterModule
// } from '@angular/router';

// import { Employee } from '../../Models/employee';
// import { EmployeeService } from '../../Services/employee.service';

// @Component({
//   selector: 'app-employee-details',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule
//   ],
//   templateUrl: './employee-details.component.html',
//   styleUrl: './employee-details.component.css'
// })
// export class EmployeeDetailsComponent implements OnInit {

//   employee: Employee | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private employeeService: EmployeeService
//   ) {}

//   ngOnInit(): void {

//     const id = Number(
//       this.route.snapshot.paramMap.get('id')
//     );

//     console.log('Route ID = ', id);

//     this.employeeService
//       .getEmployeeById(id)
//       .subscribe({

//         next: (response) => {

//           console.log('Employee API Success');

//           console.log(response);

//           this.employee = { ...response };

//         },

//         error: (error) => {

//           console.log(error);

//         }

//       });

//   }

//   goBack(): void {

//     this.router.navigate([
//       '/employees'
//     ]);

//   }

// } ///third code


import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Employee ID:', id);

    if (id > 0) {

      this.employeeService
        .getEmployeeById(id)
        .subscribe({

          next: (response) => {

            console.log('Employee Loaded');

            console.log(response);

            this.employee = response;
            this.cdr.detectChanges();

          },

          error: (error) => {

            console.log('Error Loading Employee');

            console.log(error);

          }

        });

    }

  }

  goBack(): void {

    this.router.navigate([
      '/employees'
    ]);

  }

}