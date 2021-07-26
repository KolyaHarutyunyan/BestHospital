import { CircleAndTitle, Line, ValidationInput } from '@eachbase/components'
import { Colors, useGlobalStyles, ErrorText } from '@eachbase/utils'
import { officesInfoFragments } from './index'

export const Payment =({})=>{

    const classes = officesInfoFragments() 
    const globalInputs = useGlobalStyles()
    return(

        <div>
          <CircleAndTitle number={3} back={Colors.ThemeOrange} title={'Payment Information'}/>


          <div className={classes.lineWrapper}>
                    <Line height={'105px'}/>

                    <div className={classes.inputsWrapper}>
                   
                    <ValidationInput
                        style={globalInputs.simpleInput}
                        variant={"outlined"}
                        name={"paid"}
                        type={"text"}
                        label={"Paid As"}
                        // typeError={error === 'paid' ? ErrorText.field : ''}
                        // onChange={handleChange}
                        // value={ inputs.paid }
                    />
                     <ValidationInput
                        style={globalInputs.simpleInput}
                        variant={"outlined"}
                        name={"tax"}
                        type={"text"}
                        label={"Tax ID"}
                        // typeError={error === 'tax' ? ErrorText.field : ''}
                        // onChange={handleChange}
                        // value={ inputs.tax }
                    />
                     <ValidationInput
                        style={globalInputs.simpleInput}
                        variant={"outlined"}
                        name={"filling"}
                        type={"text"}
                        label={"Filling Type"}
                        // typeError={error === 'filling' ? ErrorText.field : ''}
                        // onChange={handleChange}
                        // value={ inputs.filling }
                    />
                     <ValidationInput
                        style={globalInputs.simpleInput}
                        variant={"outlined"}
                        name={"routing"}
                        type={"text"}
                        label={"Routing Number"}
                        // typeError={error === 'routing' ? ErrorText.field : ''}
                        // onChange={handleChange}
                        // value={ inputs.routing }
                    />
                     <ValidationInput
                        style={globalInputs.simpleInput}
                        variant={"outlined"}
                        name={"account"}
                        type={"text"}
                        label={"Account Number"}
                        // typeError={error === 'account' ? ErrorText.field : ''}
                        // onChange={handleChange}
                        // value={ inputs.account }
                    />
                        
                        </div> 
                    </div>
        </div>
    )
}