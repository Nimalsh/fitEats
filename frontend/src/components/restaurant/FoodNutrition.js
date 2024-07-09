// ------------dialog box--------------------------
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Colours } from '../../assets/theme/theme';

// -----------for the table------
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//------------- styles------------
const rowstyle = {
    background: Colours.secondary,
    color: Colours.grayWhite,
}

export default function ScrollDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = (props) => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    //   --------------to focus on dialog box----------
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>

            {/* -------------nutrition button----------------- */}
            <Button onClick={handleClickOpen('paper')} sx={{
                background: Colours.green, '&:hover': {
                    background: Colours.yellow,
                },
                color: Colours.primary,
                borderRadius:"0.8rem",
                marginLeft:"10%"
            }}>Nutritions</Button>
            {/* ---------------end of button section----------------- */}

            {/* ------------Beginin of the dialog box------------- */}
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="Nutrition_Facts"
                aria-describedby="Nutrition_Content"
            >
                {/* title */}
                <DialogTitle id="Nutrition_Facts" sx={{
                    color: Colours.green,
                    background: Colours.primary,
                }}>Nutrition Facts</DialogTitle>

                {/* ---------beginin of content area---------------- */}

                <DialogContent dividers={scroll === 'paper'} sx={{ background: Colours.primary }}>
                    {/* text area */}
                    {/* <DialogContentText
                        id="Nutrition_Content"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    > */}
                        {/* ---------------nutrition list----------------- */}

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            background: Colours.primary,
                        }}>
                            <Typography variant='h5' sx={{
                                color: Colours.green,
                                textAlign: "center",
                                background: Colours.primary,
                            }}>Food Name</Typography>

                            <hr sx={{ border: Colours.green, with: "100%" }} />

                            <Typography variant='h6' sx={{
                                color: Colours.green,
                                textAlign: "center",
                            }}>Nmber of servings : 1</Typography>

                            {/* ---------------------------nutrition table------------------------ */}
                            <TableContainer component={Paper} sx={{
                                background: Colours.secondary,
                                color: Colours.grayWhite,
                            }}>

                                <Table sx={{ minWidth: "90%" }} aria-label="simple table">
                                    {/* ----------------table head---------------- */}
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={rowstyle}>Type</TableCell>
                                            <TableCell align="right" style={rowstyle}>Amount</TableCell>
                                            <TableCell align="right" style={rowstyle}>Percentage&nbsp;(%)</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    {/* -----------table body--------------------- */}
                                    <TableBody>
                                        {/* maping data */}
                                        {props.data.map((row) => (
                                            <TableRow
                                                key={row.type}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" style={rowstyle}>{row.type}</TableCell>
                                                <TableCell align="right" style={rowstyle}>{row.amount}</TableCell>
                                                <TableCell align="right" style={rowstyle}>{row.percentage}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>

                            </TableContainer>
                            {/* ------------------end of table------------------------------------- */}


                        </Box>
                        {/* ------------end of nitrition list-------------- */}
                    {/* </DialogContentText> */}

                </DialogContent>
                {/* ---------end of content area---------------- */}


                <DialogActions sx={{ background: Colours.primary, }}>
                    <Button onClick={handleClose} sx={{
                        background: Colours.green, '&:hover': {
                            background: Colours.yellow,
                        },
                        color: Colours.primary,
                    }}>Close</Button>
                </DialogActions>

            </Dialog>
            {/* --------------end of dialog box-------------- */}
        </div>
    );
}
