import {useGlobalStyles} from "@eachbase/utils";

export const CreateWrapperHead = ({children}) => {
    const globalStyle = useGlobalStyles()

    return (
        <div className={globalStyle.createOfficeTableHead}>
            {children}
        </div>
    )
}