import { Routes } from '@angular/router';
import { KanbanComponent } from './pages/kanban/kanban.component';

export const routes: Routes = [
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'kanban', loadChildren: () => import('./pages/kanban/kanban.module').then(m => m.KanbanModule) },
    { path: '', redirectTo: '/kanban', pathMatch: 'full' }
];
