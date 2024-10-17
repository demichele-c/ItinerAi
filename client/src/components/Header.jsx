import * as React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography align="left" variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          ItinerAi
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/login" sx={{ mx: 1 }}>
            Login
          </Button>
        </Box>
        <MenuIcon 
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
        />
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
          <MenuItem onClick={handleClose} component={Link} to="/" sx={{ mx: 1}}>
            <Button>
              Home
            </Button>
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/me" sx={{ mx: 1 }}>
            <Button>
              Profile
            </Button>
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/itineraries" sx={{ mx: 1 }}>
            <Button>
              Itineraries
            </Button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;