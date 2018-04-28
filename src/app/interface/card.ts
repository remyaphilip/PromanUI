export interface Card {
    description: string,
    status: string,
    priority: string,
    reportedById: number,
    assignedToId: number,
    timeTracking: number,
    projectId: number,
    summary: string,
    startDate: Date,
    endDate: Date,
    creationDateTime: DateTimeFormat,
    listId: number;
}
