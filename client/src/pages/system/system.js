import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SystemItem } from "@eachbase/fragments";
import { mileagesActions, systemActions, payrollActions } from "@eachbase/store";

export const System = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(systemActions.getCredentialGlobal());
      dispatch(systemActions.getServices({ limit: 7, skip: 0 }));
      dispatch(systemActions.getDepartments());
      dispatch(systemActions.getJobs());
      dispatch(systemActions.getPlaces());
      dispatch(payrollActions.getPayCodeGlobal());
      dispatch(payrollActions.getOvertimeSettingsGlobal());
      dispatch(mileagesActions.getMileages());
   }, []);

   return <SystemItem />;
};
