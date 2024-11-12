import { Routes } from '@angular/router';
import { KanbanComponent } from './pages/kanban/kanban.component';

export const routes: Routes = [
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'kanban', component: KanbanComponent },
    { path: '', redirectTo: '/kanban', pathMatch: 'full' }
];
