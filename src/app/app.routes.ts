import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index';
import { AboutComponent } from './pages/about/about';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];
