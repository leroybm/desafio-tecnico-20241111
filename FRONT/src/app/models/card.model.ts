
export enum KanbanList {
    ToDo = 'ToDo',
    Doing = 'Doing',
    Done = 'Done'
};

export const KanbanListArray = [KanbanList.ToDo, KanbanList.Doing, KanbanList.Done];

export interface Card {
    title: string;
    content: string;
    list: KanbanList;
    id?: string | null;
    editing?: boolean;
}

// Model for the API format
export interface CardDTO {
    titulo: string;
    conteudo: string;
    lista: string;
    id?: string;
}
