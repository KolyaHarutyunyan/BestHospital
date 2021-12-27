export interface IReceivable extends Document {
    _id: string,
    placeService: string,
    cptCode: number,
    totalUnits: number,
    totalBill: number,
    renderProvider?: number,
    status?: string,
    dateOfService: Object,
    createdAt: Date,
    bills: string[]
}
