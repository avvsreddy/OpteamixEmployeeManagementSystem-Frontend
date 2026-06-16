import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Department } from '../Models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl =
    'https://localhost:44304/api/Departments';

  constructor(
    private http: HttpClient
  ) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(
      this.apiUrl
    );
  }
}