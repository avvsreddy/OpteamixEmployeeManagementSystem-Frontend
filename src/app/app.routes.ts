import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Report } from './Module 5/report/report';
import { NotFound } from './Components/not-found/not-found';

export const routes: Routes = [
    {path: '', component: Home, title: 'Home'},
    {path: 'home', component: Home, title: 'Home'},
    {path: 'report', component: Report, title: 'Report'},
    {path:'**', component: NotFound, title: 'Not Found'}
];
