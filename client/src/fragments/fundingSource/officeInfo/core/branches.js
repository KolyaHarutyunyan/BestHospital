import { CircleAndTitle } from '@eachbase/components'
import { Colors } from '@eachbase/utils' 
import { FundingSourceTable } from '@eachbase/fragments'
export const Branches =({}) =>{
    return(
        <div>
         
         <div>
         <CircleAndTitle number={5} back={Colors.ThemeOrange} title={'Branches'}/>

         </div>


         <div style={{marginLeft:'45px',marginTop:'24px'}}>
         
         <FundingSourceTable />
         
         </div>
          
        </div>
    )
}