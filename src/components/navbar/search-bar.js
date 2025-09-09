import React, { useState } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex justify-center items-center w-5/6 mx-auto">
      <TextField
        variant="filled"
        placeholder="Search..."
        fullWidth
        onFocus={() => setFocused(true)} 
        onBlur={() => setFocused(false)} 
        sx={{
          padding: "5px", 
          "& .MuiFilledInput-root": {
            paddingLeft: "12px", 
            paddingRight: "12px", 
          },
          "& .MuiInputBase-input": {
            padding: "5px 10px", 
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <SearchIcon
                style={{
                  marginRight: "8px",
                  color: focused ? "#3f51b5" : "#888",
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
