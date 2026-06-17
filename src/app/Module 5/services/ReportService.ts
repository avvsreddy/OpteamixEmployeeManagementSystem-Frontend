import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { DashboardReport } from '../models/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl =
    'https://localhost:44304/api/Report';

  constructor(
    private http: HttpClient
  ) {}

  getReports(): Observable<DashboardReport> {

    return forkJoin({
      totalEmployees: this.http.get<number>(
        `${this.apiUrl}/total-employees`
      ),

      totalProjects: this.http.get<number>(
        `${this.apiUrl}/total-projects`
      ),

      totalTasks: this.http.get<number>(
        `${this.apiUrl}/total-tasks`
      ),

      completedTasks: this.http.get<number>(
        `${this.apiUrl}/completed-tasks`
      ),

      pendingTasks: this.http.get<number>(
        `${this.apiUrl}/pending-tasks`
      ),

      projectStatus: this.http.get<any>(
        `${this.apiUrl}/project-status`
      )
    }).pipe(
      map((response) => ({
        totalEmployees: response.totalEmployees,
        totalProjects: response.totalProjects,
        totalTasks: response.totalTasks,
        completedTasks: response.completedTasks,
        pendingTasks: response.pendingTasks,

        activeProjects:
          response.projectStatus.activeProjects,

        inactiveProjects:
          response.projectStatus.inactiveProjects,

        completedProjects:
          response.projectStatus.completedProjects
      })),
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