export interface IClaim extends Document {
    id: string,
    status: string,
    client: string,
    staff: string,
    funder: string,
    totalCharge: number,
    ammountPaid: number,
    submittedDate: Date,
    paymentRef: string,
    link: string,
    date: Date,
    createdDate: Date,
    receivable: string[]
}