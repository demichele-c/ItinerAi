import * as React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
// importing theme components
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useColorScheme } from '@mui/material/styles';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // color scheme variable
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    return null
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography id="logo" align="left" variant="h6" color="inherit">
          ItinerAi
        </Typography>
        {/* theme selection field */}
        <FormControl align="left" sx={{ flexGrow:1 }}>
        <RadioGroup
          aria-labelledby="demo-theme-toggle"
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) => setMode(event.target.value)}
        >
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
        </FormControl>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
            Home
          </Button>
          {Auth.loggedIn() && (
            <>
              <Button color="inherit" component={Link} to="/me" sx={{ mx: 1 }}>
                Profile
              </Button>
              <Button color="inherit" component={Link} to="/itineraries" sx={{ mx: 1 }}>
                Itineraries
              </Button>
            </>
          )}
        </Box>


        <Box>
          {Auth.loggedIn() ? (
            <Button color="inherit" component={Link} onClick={() => Auth.logout()} sx={{ mx: 1 }}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login" sx={{ mx: 1 }}>
              Login
            </Button>
          )}
        </Box>
        <MenuIcon aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} sx={{ display: { md: 'none' } }} />
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
          <MenuItem onClick={handleClose} component={Link} to="/" sx={{ mx: 1 }}>
            <Button>Home</Button>
          </MenuItem>
          {Auth.loggedIn() && (
            <MenuItem onClick={handleClose} component={Link} to="/me" sx={{ mx: 1 }}>
              <Button>Profile</Button>
            </MenuItem>
          )}
          {Auth.loggedIn() && (
            <MenuItem onClick={handleClose} component={Link} to="/itineraries" sx={{ mx: 1 }}>
              <Button>Itineraries</Button>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
