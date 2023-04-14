import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup({ isOpen, setIsOpen, children }) {
    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setIsOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                {children}
            </Dialog>
        </div>
    );
}
