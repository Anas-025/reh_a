import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Badge,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function EnhancedTableToolbar({
  title,
  filter,
  setFilter,
}: {
  title: string;
  filter?: string;
  setFilter?: any;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>

        <Tooltip title="Filter list">
          <Badge
            badgeContent={filter}
            invisible={filter === "all"}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            color={filter === "success" ? "success" : "error"}
          >
            <IconButton onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
          </Badge>
        </Tooltip>
      </Toolbar>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{ p: 2, display: "flex", alignItems: "center", gap: "2rem" }}
        >
          Status:
          <Box sx={{ minWidth: 140 }}>
            <FormControl fullWidth size="medium">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"scheduled"}>Scheduled</MenuItem>
                <MenuItem value={"success"}>Success</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Typography>
      </Popover>
    </>
  );
}
