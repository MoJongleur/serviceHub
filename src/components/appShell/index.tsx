// Modules
import React from 'react';

// Components
import Header from '../header';

// Material
import Container from '@material-ui/core/Container';

import Style from './style';

interface AppShellProps {
    children: React.ReactNode
}

const AppShell = (props: AppShellProps) => {
    const classes = Style();

    return (
        <div className="app">
            <header className="header">
                <Header />
            </header>
            <Container maxWidth="md">
                <div className={classes.container}>
                    {props.children}
                </div>
            </Container>
        </div>
    )
}

export default AppShell