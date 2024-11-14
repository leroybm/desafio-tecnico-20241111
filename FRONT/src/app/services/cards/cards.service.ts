import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, ENDPOINTS } from '../../constants/api.constants';
import { map, Observable } from 'rxjs';
import { Card, CardDTO, KanbanList } from '../../models/card.model';

/**
 * TODO
 *  tests
 *  error handling
 *  docs
 */

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  readonly endpoint = `${BASE_URL}${ENDPOINTS.cards}`;

  constructor(private httpClient: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.httpClient
      .get<CardDTO[]>(this.endpoint)
      .pipe(map((cardDTOList) => cardDTOList.map(this.cardDTOtoCard)));
  }

  createCard(card: Card): Observable<Card> {
    return this.httpClient
      .post<CardDTO>(this.endpoint, this.cardToCardDTO(card))
      .pipe(map(this.cardDTOtoCard));
  }

  updateCard(card: Card): Observable<Card> {
    return this.httpClient
      .put<CardDTO>(`${this.endpoint}/${card.id}`, this.cardToCardDTO(card))
      .pipe(map(this.cardDTOtoCard));
  }

  deleteCard(cardId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.endpoint}/${cardId}`);
  }

  cardDTOtoCard(cardDTO: CardDTO): Card {
    return {
      title: cardDTO.titulo,
      content: cardDTO.conteudo,
      list: KanbanList[cardDTO.lista as keyof typeof KanbanList],
      id: cardDTO.id,
    };
  }

  cardToCardDTO(card: Card): CardDTO {
    const cardDTO: CardDTO = {
      titulo: card.title,
      conteudo: card.content,
      lista: card.list,
    };

    if (card.id) {
      cardDTO.id = card.id
    }

    return cardDTO;
  }
}
