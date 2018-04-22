export interface Issue {
    issueId: number;
    title: string;
    creationDate: Date;
    description: string;
    type: string;
    category: string;
    dueDate: Date;
    reportedById: number;
    assignToId: number;
    estimate: number;
    timespent: number
    statusCode: string
    severityCode: number;
    priorityCode: number
    projectId: number;
}
