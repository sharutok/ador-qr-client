import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AppContext } from '../App';

export default function BarSnack() {
    const { snack, setSnack } = useContext(AppContext)
    const handleClick = () => {
        setSnack({ ...snack, status: true, });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack({ ...snack, status: false, });
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
            <Snackbar
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                open={snack.status}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snack.message}
                action={action}
            />
        </div>
    );
}
