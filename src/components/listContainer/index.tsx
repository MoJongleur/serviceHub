// Modules
import React from 'react';
import { useDispatch } from 'react-redux';

// Material
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// classes
import Style from './style';

// SVG
import added from '../../assets/added.svg';
import dont from '../../assets/dont.svg';

// Actions
import { moveToBookmark, moveFromBookmark } from '../../redux/actions/bookmarkAction';

interface ListProps {
    list: Array<Element>,
    bookmarks: Array<Element>,
}

interface Element {
    etag: string,
    id: {videoId: string},
    kind: string,
    snippet: {thumbnails: {default: { url: string}}, channelTitle: string, title: string, description: string}
}


function ListContainer({list, bookmarks}: ListProps) {
    const dispatch = useDispatch();

    function handleClick(index:number) {
        const idx = bookmarks.findIndex((el) => el.id.videoId === list[index].id.videoId);
        if(idx !== -1) {
            dispatch(moveFromBookmark(idx))
        } else {
            dispatch(moveToBookmark(list[index]))
        }
    }

    const classes = Style();
    return(
        <List className={classes.root}>
            {
                list.map((el: Element, i: number) => (
                    <React.Fragment key={el.id.videoId}>
                        <ListItem alignItems="flex-start" className={classes.listItem}>
                            <ListItemAvatar>
                            <Avatar alt="Some alt" src={el.snippet.thumbnails.default.url} />
                            </ListItemAvatar>
                            <ListItemText
                            primary={el.snippet.title}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    <a className={classes.listLink} target="_blank" rel="noopener noreferrer" href={'https://www.youtube.com/watch?v='+el.id.videoId}>{el.snippet.channelTitle}</a>
                                </Typography>
                                {' ' + el.snippet.description.slice(0, 40) + '...'}
                                </React.Fragment>
                            }
                            />
                            <img src={bookmarks.findIndex((mark:Element) => mark.id.videoId === el.id.videoId) !== -1 ? added : dont} className={classes.bookmark} alt="logo" onClick={() => handleClick(i)} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))
            }
        </List>
    )
}

export default ListContainer;
