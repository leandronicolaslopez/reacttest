import React from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { confirmable } from 'react-confirm';

class Confirmation extends React.Component {
    render() {
        const {
            okLabel = 'Yes! Let\'s do it',
            cancelLabel = 'No, I\'m scared',
            title,
            confirmation,
            show,
            proceed,
            dismiss,
            cancel,
            modal,
        } = this.props;

        const btnPrimaryStyle = {
            margin: '7px',
            display: 'inline-block'
        };

        const btnSecondaryStyle = {
            margin: '7px',
            display: 'inline-block',
            background: 'rgba(0, 0, 0, 0.2)',
            boxShadow: 'none'
        };

        const actions = [
            <div className="btn" style={btnSecondaryStyle} onClick={cancel}>{cancelLabel}</div>,
            <div className="btn" style={btnPrimaryStyle} onClick={proceed}>{okLabel}</div>
        ];

        return (
            <MuiThemeProvider>
                <Dialog title={title}
                        actions={actions}
                        modal={modal}
                        open={show}
                        onRequestClose={dismiss}
                        bodyStyle={{ fontFamily: 'Graphik' }}
                        titleStyle={{ fontFamily: 'Graphik' }}>
                    {confirmation}
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

export default confirmable(Confirmation);