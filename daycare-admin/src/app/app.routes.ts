import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'parents',
        loadComponent: () => import('./pages/parents/parents.component').then(m => m.ParentsComponent)
      },
      {
        path: 'children',
        loadComponent: () => import('./pages/children/children.component').then(m => m.ChildrenComponent)
      },
      {
        path: 'activities',
        loadComponent: () => import('./pages/activities/activities.component').then(m => m.ActivitiesComponent)
      },
      {
        path: 'attendance',
        loadComponent: () => import('./pages/attendance/attendance.component').then(m => m.AttendanceComponent)
      },
      {
        path: 'programs',
        loadComponent: () => import('./pages/programs/programs.component').then(m => m.ProgramsComponent)
      },
      {
        path: 'programs/add',
        loadComponent: () => import('./pages/program-edit/program-edit.component').then(m => m.ProgramEditComponent)
      },
      {
        path: 'programs/edit/:id',
        loadComponent: () => import('./pages/program-edit/program-edit.component').then(m => m.ProgramEditComponent)
      },
      {
        path: 'teachers',
        loadComponent: () => import('./pages/teachers/teachers.component').then(m => m.TeachersComponent)
      },
      {
        path: 'messages',
        loadComponent: () => import('./pages/messages/messages.component').then(m => m.MessagesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];