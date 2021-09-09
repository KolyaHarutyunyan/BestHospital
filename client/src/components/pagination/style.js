import { makeStyles } from '@material-ui/core/styles';
import {Backgrounds as Background, Colors} from "@eachbase/utils";

export const paginationStyle = makeStyles ((theme) => ({
  PaginationWrapper: {
    width: '100%',
    margin: '-7px 0 0 0 ',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    background: Background.headerLightBlue,
    height:'76px',
    borderRadius:'8px',
    padding:'0 16px',
    '& p':{
      fontSize:'14px',
      fontWeight:'600',
    },

    '& .MuiPaginationItem-textPrimary.Mui-selected': {
      background: Colors.BackgroundBlue,
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '19px',
    },

    '& .MuiPaginationItem-page': {
      background: 'none',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '19px',
    },

    '& .MuiPaginationItem-outlined': {
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      border: '1px solid #DDE3F0',
      borderRadius: '4px',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '14px',
      color: '#545F7E',
    },

    '& .MuiPaginationItem-page.Mui-selected:hover': {
      background: '#387DFF 0% 0% no-repeat padding-box',
      color: 'white',
    },
  },
}));
