import { Tooltip } from "@material-ui/core";

export const SimpleToolTip =({title, content})=>{
  return(
  <Tooltip title={title} placement="left-end">
    {content}
  </Tooltip>
  )
}