import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as historyActions from "../../../modules/historique/state/HistoryActions";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box, Button, TextField } from "@mui/material";
import { useStyles } from "../Style/historiqueStyle";
import moment from "moment";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  {
    field: "username",
    headerName: "username",
    width: 180,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => `${params.row.user?.username || ""}`,
  },
  {
    field: "Date/D",
    headerName: "Date/D Heure/D",
    width: 180,
    align: "center",
    headerAlign: "center",
    type: "dateTime",
    valueGetter: (params) => {
      if (params.row.typeAction !== "Acquittement") {
        const dateStr = params.row.typeAction === "Alarme" && params.row.solved_date
                        ? params.row.Alarme_date
                        : params.row.Created_at;
        return dateStr ? moment(dateStr).format("MMM DD, YYYY HH:mm") : null;
      }
      return null;
    },
  },
  {
    field: "Date/F",
    headerName: "Date/F Heure/F",
    width: 180,
    align: "center",
    headerAlign: "center",
    type: "dateTime",
    valueGetter: (params) => {
      if (params.row.typeAction !== "Acquittement") {
        const dateStr = params.row.typeAction === "Alarme"
                        ? params.row.solved_date
                        : params.row.Updated_at;
        return dateStr ? moment(dateStr).format("MMM DD, YYYY HH:mm") : null;
      }
      return null;
    },
  },
  {
    field: "date acquittement",
    headerName: "Date acquittement",
    width: 180,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => {
      if (params.row.typeAction === "Acquittement" || params.row.typeAction === "Alarme") {
        return params.row.acquittement_date ? moment(params.row.acquittement_date).format("MMM DD, YYYY HH:mm") : null;
      }
      return null;
    },
  },
  {
    field: "Designation",
    headerName: "Designation",
    width: 350,
    align: "center",
    headerAlign: "center",
  },
];

const Historique = () => {
  const [update, setUpdate] = useState(true);
  const [originalRows, setOriginalRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
    if (!event.target.value) {
      setRows(originalRows);
    } else {
      applyFilters(event.target.value);
    }
  };

  const applyFilters = (searchText) => {
    const normalizedSearchText = searchText.toLowerCase();
    const searchDate = moment(searchText, "MMM DD, YYYY HH:mm", true);

    const filteredRows = originalRows.filter((row) => {
      return columns.some(({ field, valueGetter }) => {
        let value = row[field];
        if (valueGetter) {
          const params = { row, field };
          value = valueGetter(params);
        }

        if (searchDate.isValid()) {
          const dateValue = moment(value, "MMM DD, YYYY HH:mm");
          return searchDate.isSame(dateValue, "day");
        } else {
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(normalizedSearchText)
          );
        }
      });
    });
    setRows(filteredRows);
  };

  useEffect(() => {
    const request = {
      successCallBack: (response) => {
        setRows(response.data);
        setOriginalRows(response.data);
      },
      failCallBack: (error) => {
        console.error(error);
      },
    };
    dispatch(historyActions.HistoryStart(request));
  }, [dispatch,update]);

  return (
    <Grid container direction="column" className={classes.map}>
      <Grid item container>
        <Grid
          item
          xs={12}
          sm={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ height: "80vh", width: "90vw" }}>
            <TextField
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search…"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{color:"white"}}/>
                  </InputAdornment>
                ),
              }}
              style={{color:"white", borderColor:"white"}}
            />
            <DataGrid
              className={classes.DataGrid}
              headerHeight={25}
              rowHeight={25}
              rows={rows}
              columns={columns}
              getRowClassName={(params) => `super-app-theme--${params.row.typeAction}`}
              autoPageSize
            />
          </div>
        </Grid>
        <Grid item xs={false} sm={1} />
        <Box textAlign="center" style={{ width: "100%" }}>
          <Button variant="contained" onClick={() => setUpdate(!update)}>
            Rafraîchir
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Historique;
