export const ActiveInactiveStatus =(type) =>{
  return type === 'Active' ? 'ACTIVE':
      type === 'Inactive' ? 'INACTIVE' :
      type === 'On Hold' ? 'HOLD' :
      type === 'Terminated' ? 'TERMINATE' : ''

}