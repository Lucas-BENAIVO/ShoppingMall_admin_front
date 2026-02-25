// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter, Routes } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { AppSideLoginComponent } from './app/pages/authentication/side-login/side-login.component';

// const routes: Routes = [
//   { path: '', component: AppSideLoginComponent }
// ];

// bootstrapApplication(AppSideLoginComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes)
//   ]
// }).catch(err => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { AppSideLoginComponent } from './app/pages/authentication/side-login/side-login.component';
import { BoutiqueRoutes } from './app/pages/admin/boutique.routes';

// Routes globales
const routes: Routes = [
  { path: '', component: AppSideLoginComponent }, // login page
  { path: 'admin', children: BoutiqueRoutes },    // lazy-loaded admin
  { path: '**', redirectTo: '' }                  // fallback
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));