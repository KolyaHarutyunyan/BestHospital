import { CircleAndTitle, Line } from '@eachbase/components'
import { Colors } from '@eachbase/utils' 
import { officesInfoFragments } from './index'

export const Documents =({})=>{
    const classes = officesInfoFragments()
    return(
        

         <div>
          <CircleAndTitle number={4} back={Colors.ThemeOrange} title={'Uploaded Documents'}/>


          <div className={classes.lineWrapper}>
                    <Line height={'343px'}/>
                    <div>

                        asdasd
                    </div>
                    
                    
                    
                    </div>

                    </div>

    
    )
}