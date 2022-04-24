export const dummyData = {
   CLAIMS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => ({
      _id: Math.random().toString(),
      dateRange: { early: "10/21/2021", latest: "03/28/2022" },
      staff: { _id: Math.random().toString(), firstName: "Alice", lastName: "Johansson" },
      funder: { _id: Math.random().toString(), firstName: "Blue", lastName: "Cross" },
      client: { _id: Math.random().toString(), firstName: "Daniel", lastName: "Clark" },
      totalCharge: 300,
      amountPaid: 100,
      remaining: 300,
      status: "Submitted",
      paymentRef: "www.testlink.com",
      receivables: [1, 2, 3].map(() => ({
         _id: Math.random().toString(),
         dateOfService: { start: "10/21/2021", end: "03/28/2022" },
         placeService: "In Home (02)",
         cptCode: "H2001",
         modifier: "HM",
         totalUnits: 8,
         totalBill: 1000,
         renderingProvider: "12312312",
         bills: [1, 2, 3].map(() => ({
            _id: Math.random().toString(),
            dateOfService: "10/21/2022",
            timeOfService: "09:00 AM - 10:00 AM",
            units: 4,
            signature: "file_pdf.pdf",
         })),
      })),
   })),

   INVOICES: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => ({
      _id: Math.random().toString(),
      dateRange: { early: "10/21/2021", latest: "03/28/2022" },
      client: { _id: Math.random().toString(), firstName: "Daniel", lastName: "Clark" },
      totalHours: 30,
      totalAmount: 300,
      invoiceDate: "03/28/2022",
      status: "Submitted",
      totalTime: "4",
      dueDate: { start: "10/21/2021", end: "03/28/2022" },
      pdfDocument: "pdf_doc.pdf",
      receivables: [1, 2, 3, 4, 5, 6, 7].map(() => ({
         _id: Math.random().toString(),
         staffMember: {
            _id: Math.random().toString(),
            firstName: "Alice",
            lastName: "Johansson",
         },
         dateOfService: "10/21/2022",
         serviceCode: "12345",
         timeOfService: { startTime: "09:00 AM", endTime: "10:00 AM" },
         hours: 2,
         totalAmount: 500,
         copay: 300,
         priorPaid: 500,
         currentBalance: 500,
         bill: {
            _id: Math.random().toString(),
            dateOfService: "10/21/2022",
            timeOfService: "09:00 AM - 10:00 AM",
            units: 4,
            signature: "file_pdf.pdf",
         },
      })),
   })),

   CLAIM_PAYMENTS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => ({
      _id: Math.random().toString(),
      funder: { _id: Math.random().toString(), firstName: "Blue", lastName: "Cross" },
      client: { _id: Math.random().toString(), firstName: "Daniel", lastName: "Clark" },
      totalBilled: 100,
      totalCollected: 300,
      status: "Submitted",
      paymentRef: "123456",
      paymentType: "CHECK",
      claims: [1, 2, 3, 4 ].map(() => ({
         _id: Math.random().toString(),
         dateRange: { early: "10/21/2021", latest: "03/28/2022" },
         staff: { _id: Math.random().toString(), firstName: "Alice", lastName: "Johansson" },
         funder: { _id: Math.random().toString(), firstName: "Blue", lastName: "Cross" },
         client: { _id: Math.random().toString(), firstName: "Daniel", lastName: "Clark" },
         totalCharge: 300,
         amountPaid: 100,
         remaining: 300,
         status: "Submitted",
         paymentReference: "www.testlink.com",
         receivables: [1, 2, 3, 4, 5].map(() => ({
            _id: Math.random().toString(),
            dateOfService: { start: "10/21/2021", end: "03/28/2022" },
            placeService: "In Home (02)",
            cptCode: "H2001",
            modifier: "HM",
            totalUnits: 8,
            allowedUnits: 8,
            totalBill: 1000,
            clientResp: "12312312",
            bills: [1, 2, 3].map(() => ({
               _id: Math.random().toString(),
               dateOfService: "10/21/2022",
               timeOfService: "09:00 AM - 10:00 AM",
               units: 4,
               signature: "file_pdf.pdf",
            })),
         })),
      })),
   })),

   INVOICE_PAYMENTS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => ({
      _id: Math.random().toString(),
      client: { _id: Math.random().toString(), firstName: "Daniel", lastName: "Clark" },
      totalBilled: 100,
      totalCollected: 300,
      status: "Submitted",
      paymentRef: "www.testlink.com",
      paymentType: "CHECK",
      invoices: [1, 2, 3, 4].map(() => ({
         _id: Math.random().toString(),
         dateRange: { early: "10/21/2021", latest: "03/28/2022" },
         client: { _id: Math.random().toString(), firstName: "Daniel", lastName: "Clark" },
         totalHours: 30,
         totalAmount: 300,
         invoiceDate: "03/28/2022",
         status: "Submitted",
         totalTime: "4",
         dueDate: { start: "10/21/2021", end: "03/28/2022" },
         pdfDocument: "pdf_doc.pdf",
         receivables: [1, 2, 3, 4, 5].map(() => ({
            _id: Math.random().toString(),
            staffMember: {
               _id: Math.random().toString(),
               firstName: "Alice",
               lastName: "Johansson",
            },
            dateOfService: "10/21/2022",
            serviceCode: "12345",
            timeOfService: { startTime: "09:00 AM", endTime: "10:00 AM" },
            hours: 2,
            totalAmount: 500,
            copay: 300,
            priorPaid: 500,
            currentBalance: 500,
            bill: {
               _id: Math.random().toString(),
               dateOfService: "10/21/2022",
               timeOfService: "09:00 AM - 10:00 AM",
               units: 4,
               signature: "file_pdf.pdf",
            },
         })),
      })),
   })),
};
