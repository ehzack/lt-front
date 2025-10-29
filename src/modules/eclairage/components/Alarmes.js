import React, { useEffect } from 'react';
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useStyles } from "../Style/alarmeStyle";
import * as alarmeActions from "./../../alarme/state/AlarmeActions";
import { socket } from '../../../common/utils/webSockets/websockets';

function Alarmes() {
    const alarmeState = useSelector((state) => state.Alarmes?.alarmes);
    const dispatch = useDispatch();
    const activeAlarmes = alarmeState.filter(
        (alarme) => !alarme.solved || (alarme.solved && !alarme.acquittement)
    ).sort((alarme1, alarme2) => {
        if (alarme1.Created_at < alarme2.Created_at) return 1;
        if (alarme1.Created_at > alarme2.Created_at) return -1;
        return 0;
    }).slice(0, 3);
    const classes = useStyles();

    useEffect(() => {
        const request = {
            successCallBack: (response) => {
            },
            failCallBack: (error) => {
            },
        };

        socket.on("Acquittement", (message) => {
            dispatch(alarmeActions.getAcquittementUpdate(message));
          })
      

        dispatch(alarmeActions.AlarmeStart(request));




        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const getRowClassName = (row) => {
        if (row?.acquittement) return `super-app-theme--acquitté`;
        else if (row?.solved && !row?.acquittement) return `super-app-theme--solved-non-acquitté`;
        else return "super-app-theme--false";
    };


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={`${classes.headerCell} date-header`}>Date/D Heure/D</TableCell>
                        <TableCell align="center" className={`${classes.headerCell} date-header`}>Date/F Heure/F</TableCell>
                        <TableCell align="center" className={`${classes.headerCell} designation-header`}>Designation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={activeAlarmes?.[0]?.id} className={getRowClassName(activeAlarmes?.[0])}>
                        <TableCell align="center">{activeAlarmes?.[0]?.Created_at ? moment(activeAlarmes?.[0]?.Created_at).format("MMM DD, YYYY HH:mm") : "\u00A0"}</TableCell>
                        <TableCell align="center">{activeAlarmes?.[0]?.solved_date && activeAlarmes?.[0]?.solved ? moment(activeAlarmes?.[0]?.solved_date).format("MMM DD, YYYY HH:mm") : null}</TableCell>
                        <TableCell align="center">{activeAlarmes?.[0]?.Designation || ""}</TableCell>
                    </TableRow>
                    <TableRow key={activeAlarmes?.[1]?.id} className={getRowClassName(activeAlarmes?.[1])}>
                        <TableCell align="center">{activeAlarmes?.[1]?.Created_at ? moment(activeAlarmes?.[1]?.Created_at).format("MMM DD, YYYY HH:mm") : "\u00A0"}</TableCell>
                        <TableCell align="center">{activeAlarmes?.[1]?.solved_date && activeAlarmes?.[1]?.solved ? moment(activeAlarmes?.[1]?.solved_date).format("MMM DD, YYYY HH:mm") : null}</TableCell>
                        <TableCell align="center">{activeAlarmes?.[1]?.Designation || ""}</TableCell>
                    </TableRow>
                    <TableRow key={activeAlarmes?.[2]?.id} className={getRowClassName(activeAlarmes?.[2])}>
                        <TableCell align="center">{activeAlarmes?.[2]?.Created_at ? moment(activeAlarmes?.[2]?.Created_at).format("MMM DD, YYYY HH:mm") : "\u00A0"}</TableCell>
                        <TableCell align="center">{activeAlarmes?.[2]?.solved_date && activeAlarmes?.[2]?.solved ? moment(activeAlarmes?.[2]?.solved_date).format("MMM DD, YYYY HH:mm") : null}</TableCell>
                        <TableCell align="center">{activeAlarmes?.[2]?.Designation || ""}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Alarmes;
