export enum ClaimStatus {
  NOTCLAIMED = 'NOTCLAIMED',
  CLAIMED = 'CLAIMED',
  INCOMPLETE = 'INCOMPLETE',
  COMPLETE = 'COMPLETE',
  PARTIAL = 'PARTIAL',
}
export enum InvoiceStatus {
  NOTINVOICED = 'NOTINVOICED',
  INVOICED = 'INVOICED',
  COMPLETE = 'COMPLETE',
  PARTIAL = 'PARTIAL',
}
export enum BillingStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}
export enum TransactionType {
  PAYERPAID = 'PAYERPAID',
  CLIENTRESP = 'CLIENTRESP',
  CLIENTPAID = 'CLIENTPAID',
}
