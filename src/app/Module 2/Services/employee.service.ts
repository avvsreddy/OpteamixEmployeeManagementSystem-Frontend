import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  Employee,
  EmployeeCreateDto
} from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl =
    'https://localhost:44304/api/Employees';

  constructor(
    private http: HttpClient
  ) {}

  // GET ALL EMPLOYEES

  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(
      this.apiUrl
    );

  }

  // GET EMPLOYEE BY ID

  getEmployeeById(
    id: number
  ): Observable<Employee> {

    return this.http.get<Employee>(
      `${this.apiUrl}/${id}`
    ).pipe(
      catchError(this.handleError)
    );

  }

  // CREATE

  createEmployee(
    employee: EmployeeCreateDto
  ): Observable<Employee> {

    return this.http.post<Employee>(
      this.apiUrl,
      employee
    ).pipe(
      catchError(this.handleError)
    );

  }

  // UPDATE

  updateEmployee(
    id: number,
    employee: any
  ): Observable<Employee> {

    return this.http.put<Employee>(
      `${this.apiUrl}/${id}`,
      employee
    ).pipe(
      catchError(this.handleError)
    );

  }

  // DELETE

  deleteEmployee(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    ).pipe(
      catchError(this.handleError)
    );

  }

  private handleError(error: any) {

    console.error(error);

    return throwError(
      () => error
    );

  }

}