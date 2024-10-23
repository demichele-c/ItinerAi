import { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
// importing theme components
import { useColorScheme } from '@mui/material/styles';

// importing theme switch 
import Switch from '@mui/material/Switch';



const Footer = () => {
  const [checked, setChecked] = useState(true);

  // color scheme variable
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const handleChange = (event)=> {
    setChecked(event.target.checked);
    checked ? setMode ("light"): setMode("dark")
  }
  
  return (
    <AppBar id="footer" position="relative" sx={{ 
      bottom: 0, 
      backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Typography align="left" sx={{ 
          flexGrow: 1,
          fontSize: 10,
          fontStyle: 'italic'
        }}>
          ©2024 C. Demichele, C. Pagels, R. Strain, D. Villarreal
        </Typography>
        <Switch 
          onChange={handleChange}
          checked={checked}
        />
      </Toolbar>
    </AppBar>
  )

}

export default Footer