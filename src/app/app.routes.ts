import { Routes } from '@angular/router';
import { Home } from './Components/home/home';

export const routes: Routes = [
    {path: '', component: Home, title: 'Home'},
    {path: 'home', component: Home, title: 'Home'},
];
