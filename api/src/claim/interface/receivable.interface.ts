export interface IReceivable extends Document {
    _id: string,
    placeService: string,
    cptCode: number,
    totalUnits: number,
    totalBill: number,
    renderProvider: number,
    dateOfService: Date,
    bills: string[]
}