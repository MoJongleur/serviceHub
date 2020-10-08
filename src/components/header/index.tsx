// Modules
import React from 'react';

// Material
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Router
import { useHistory, useLocation } from "react-router-dom";

// config
import path from '../../config/path';

function Header() {
    const location = useLocation();
    const history = useHistory();
    const pathObj = path.find(el => el.location === location.pathname);
    const [value, setValue] = React.useState(pathObj && pathObj.index ? pathObj.index : 0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        history.push(path[newValue].location);
      };
    return (
        <Paper>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="nav_tabs"
            >
                <Tab label="Search" />
                <Tab label="Bookmarks" />
            </Tabs>
        </Paper>
    )
}

export default Header
