export interface Issue {
    issueId: number;
    summary: string;
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
    priorityCode: string;
    projectId: number;
}
