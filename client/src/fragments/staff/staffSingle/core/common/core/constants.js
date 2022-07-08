export function convertType(credentialType) {
   if (credentialType === 0) {
      return "Degree";
   } else if (credentialType === 1) {
      return "Clearance";
   } else if (credentialType === 2) {
      return "licence";
   }
}
