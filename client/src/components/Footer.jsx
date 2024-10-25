import { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
// importing theme components
import { useColorScheme } from '@mui/material/styles';

// importing theme switch 
import Switch from '@mui/material/Switch';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

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
    <AppBar id="footer" sx={{ 
      backgroundColor: '#1976d2'
      }}>
      <Toolbar variant='dense'>
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
          // checkedIcon={<LightModeIcon/>}
          // icon={<DarkModeOutlinedIcon/> }
        />
      </Toolbar>
    </AppBar>
  )

}

export default Footer