import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';

import { ReportService } from '../services/ReportService';
import { DashboardReport } from '../models/Report';

@Component({
  selector: 'app-report',
  imports: [AsyncPipe],
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report implements OnInit {

 private reportService = inject(ReportService);

  report: DashboardReport = {
    totalEmployees: 0,
    totalProjects: 0,
    totalTasks: 0,
    activeProjects: 0,
    inactiveProjects: 0,
    completedProjects: 0,
    completedTasks: 0,
    pendingTasks: 0
  };

  errMsg = '';

  selectedSection = '';

  ngOnInit(): void {
    this.reportService
      .getReports()
      .pipe(
        catchError(err => {
          this.errMsg =
            err?.message ||
            'Failed to load reports';

          return of(this.report);
        })
      )
      .subscribe(data => {
        this.report = data;
      });
  }

  drillDown(section: string): void {
    this.selectedSection =
      this.selectedSection === section
        ? ''
        : section;
  }
}