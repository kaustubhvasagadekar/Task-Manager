import React from "react";
import { Box, Grid, TextField, InputAdornment, Button, Menu, MenuItem } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBox = ({ searchTerm, onSearchChange, onFilterClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (filterType) => {
    setAnchorEl(null);
    if (typeof filterType === 'string') {
      onFilterClick(filterType);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", m:5 }}>
      <Grid container spacing={2} alignItems="space-between" >
        <Grid item xs={4} >
          <TextField
            id="search"
            label="Search Tasks"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={onSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ mr: 1 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={5}/>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button 
            variant="contained" 
            onClick={handleClick}
            aria-controls={open ? 'filter-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            Filter
          </Button>
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
          >
            <MenuItem onClick={() =>{ handleClose('all')}}>All</MenuItem>
            <MenuItem onClick={() =>{ handleClose('completed')} }>Completed</MenuItem>
            <MenuItem onClick={() =>{ handleClose('not-completed')}}>Not Completed</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBox;
