import { Card } from './card';
export interface List {
    listId: number;
    listName: string;
    projectId: number;
    card: Card[];
}
