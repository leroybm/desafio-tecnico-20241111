import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Card, KanbanListArray } from '../../../models/card.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { cloneDeep, isEqual } from 'lodash';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kanban-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './kanban-card.component.html',
  styleUrl: './kanban-card.component.scss',
})
export class KanbanCardComponent implements OnChanges {
  readonly KanbanList = KanbanListArray;
  @Input() card: Card = {} as Card;
  // Internal copy of card, as to avoid external mutation
  innerCard: Card = {} as Card;
  @Input() editing: boolean = false;
  @Output() onEdit = new EventEmitter<Card>();
  @Output() onDelete = new EventEmitter<Card>();
  @Output() onMove = new EventEmitter<{ card: Card, direction: number }>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!isEqual(changes['card'].currentValue, changes['card'].previousValue)) {
      this.innerCard = cloneDeep(changes['card'].currentValue);
    }
  }

  handleEdit() {
    if (this.editing) {
      this.onEdit.emit({
        ...this.innerCard,
        editing: false,
      });
      this.editing = false;
    } else {
      this.editing = true;
    }
  }

  handleDelete() {
    this.onDelete.emit(this.innerCard);
  }

  handleMove(direction: number) {
    this.onMove.emit({ card: this.innerCard, direction });
  }
}
