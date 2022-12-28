import React from 'react';
import {useApp} from '../context/AppProvider/useApp'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, {AlertProps} from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snack = () => {
    const {snackbar, closeSnackbar} = useApp()
    const {title, component} = snackbar
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        },
        exit: {
            y: "100vh",
            opacity: 0,
        }

    }

    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color={snackbar.color}
                onClick={closeSnackbar}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={snackbar.visible}
            autoHideDuration={snackbar.autoHideDuration || 3000}
            onClose={closeSnackbar}
            action={action}
        >
            <Alert severity={snackbar.severity || 'info'}>{snackbar.message}</Alert>
        </Snackbar>
    )
}

export default Snack
