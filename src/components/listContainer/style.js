import { makeStyles } from '@material-ui/core';

export default makeStyles({
    root: {
        width: '100%',
        marginTop: '15px'
    },
    inline: {
        display: 'inline',
    },
    listItem: {
        width: '100%',
        backgroundColor: '#fafafa',
    },
    listLink: {
        textDecoration: 'none',
        color: 'black',
    },
    bookmark: {
        maxWidth: '20px',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
    }
})
