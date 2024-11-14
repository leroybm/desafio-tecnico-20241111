import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban.routes';
import { KanbanComponent } from './kanban.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { KanbanCardComponent } from '../../components/common/kanban-card/kanban-card.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    KanbanComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    KanbanCardComponent,
    CdkDropList,
    CdkDrag
  ],
})
export class KanbanModule { }
