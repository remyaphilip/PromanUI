export interface Issuecsv {
    issueId: number;
    summary: string;
    creationDate: Date;
    description: string;
  //  type: string;
   // category: string;
    dueDate: Date;
    reportedById: number;
    assignToId: number;
   // estimate: number;
    //timespent: number
    statusCode: string
    severityCode: number;
    priorityCode: string;
    startDate: Date;
    endDate: Date;
    projectId: number;
}

