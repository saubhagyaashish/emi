import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { EmiListContext, HistoryContext } from '../../App';

export default function EmiHistory() {
  const [state, setState] = React.useState({
    right: false,
  });
  const[{emiList, seEmiList}] = React.useContext(EmiListContext)
  const [{emisHistory,setEmisHistory}] = React.useContext(HistoryContext)
  const changeEmi =(e)=>{
    console.log("Hi",e)
    setEmisHistory(e);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <Divider />
      <List>
        {emiList.map((e,index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={()=>changeEmi(e)}>
              <ListItemText primary={`P: ${(e["principalAmount"])}, R: ${(e["rateOfInterest"])}, D: ${(e["duration"])}`} />
            </ListItemButton>
            
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      
        <React.Fragment key={'right'}>
          <Button  variant="contained"  sx={{ mt: 3, mb: 2, float: 'right' }} onClick={toggleDrawer('right', true)}>EMI HISTORY</Button>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </React.Fragment>
      
    </div>
  );
}