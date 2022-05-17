export interface IReceivable extends Document {
  _id: string;
  placeService: string;
  cptCode: string;
  totalUnits: number;
  totalBill: number;
  allowedAMT: number;
  paidAMT: number;
  renderProvider?: number;
  status?: string;
  dateOfService: Object;
  amountTotal: number;
  createdAt: Date;
  bills: string[];
}
