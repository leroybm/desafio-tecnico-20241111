import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards/cards.service';
import { Card, KanbanList, KanbanListArray } from '../../models/card.model';
import {
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { flatMap } from 'lodash';
import { ConfirmDialogComponent } from '../../components/common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_TIMING } from '../../constants/timings.constants';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit {
  readonly lists = KanbanListArray;
  cards: { [K in KanbanList]: Card[] } = {
    [KanbanList.ToDo]: [],
    [KanbanList.Doing]: [],
    [KanbanList.Done]: [],
  };

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cardsService: CardsService,
    public loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe((cards) => {
      cards
        .filter((card) => card?.list)
        .forEach((card) => {
          this.cards[card.list as KanbanList].push(card);
        });
    });
  }

  // TODO Need to scroll to card
  newCard() {
    this.cards[KanbanList.ToDo].push({
      title: '',
      content: '',
      list: KanbanList.ToDo,
      editing: true,
      id: null,
    } as Card);
  }

  handleEdit(card: Card) {
    if (card.id) {
      this.cardsService.updateCard(card).subscribe((updatedCard) => {
        this.handleApiChange(updatedCard);
        this.snackBar.open('Card updated successfully', 'Close', { duration: SNACKBAR_TIMING })
      });
    } else {
      this.cardsService.createCard(card).subscribe((newCard) => {
        this.handleApiChange(newCard);
        this.snackBar.open('Card created successfully', 'Close', { duration: SNACKBAR_TIMING })
      });
    }
  }

  handleDelete(card: Card) {
    if (card.id === null) {
      return this.removeCardFromList(card);
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirm Deletion', content: 'Are you sure you want to delete this card?' },
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (!confirm) return;

      if (!card.id) {
        return this.removeCardFromList(card);
      }

      this.cardsService.deleteCard(card.id).subscribe(() => {
        this.removeCardFromList(card);
        this.snackBar.open('Card deleted successfully', 'Close', { duration: SNACKBAR_TIMING })
      });
    });
  }

  handleMove({ card, direction }: { card: Card, direction: number }) {
    // Move card up/down the Kanban list by the direction value
    const currentIndex = KanbanListArray.indexOf(card.list);
    const targetList = KanbanListArray[currentIndex + direction];

    if (targetList) {
      this.handleEdit({ ...card, list: targetList });
    }
  }

  handleApiChange(newCard: Card) {
    const oldCard = this.getCardById(newCard.id as string);

    if (oldCard) {
      // Update existing card
      if (oldCard.list === newCard.list) {
        this.cards[newCard.list].map((card) =>
          card.id === newCard.id ? newCard : card
        );
      } else {
        this.removeCardFromList(oldCard);
        this.cards[newCard.list].push(newCard);
      }
    } else {
      // Create new card
      this.removeCardFromList({ list: KanbanList.ToDo, id: null } as Card);
      this.cards[newCard.list as KanbanList].push(newCard);
    }
  }

  getCardById(id: string): Card | undefined {
    return flatMap(this.cards).find((card) => card.id === id);
  }

  removeCardFromList(card: Card) {
    this.cards[card.list] = this.cards[card.list].filter(
      (c) => c.id !== card.id
    );
  }

  // TODO Fix this, the current index is always 0
  handleDrop(event: CdkDragDrop<Card[]>) {
    // console.log(event);
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }
  }
}
