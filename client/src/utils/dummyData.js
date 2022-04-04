const claimsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const dummyData = {
   CLAIMS: claimsCount.map(() => ({
      _id: Math.random().toString(),
      createdDate: "10/21/2021",
      submittedDate: "03/28/2022",
      dateOfRange: "02/26/2022",
      staff: { _id: Math.random().toString(), middleName: "Alice Johansson" },
      funder: { _id: Math.random().toString(), middleName: "Blue Cross" },
      client: { _id: Math.random().toString(), middleName: "Daniel Clark" },
      totalCharge: 300,
      ammountPaid: 100,
      remaining: 300,
      status: "Submitted",
      paymentRef: "www.testlink.com",
   })),
};
