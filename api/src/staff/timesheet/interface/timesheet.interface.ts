export interface ITimeSheet {
    id: string;
    staffId: string;
    payCode: string;
    description: string;
    hours: number;
    amount: number;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
}