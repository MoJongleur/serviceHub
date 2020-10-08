// Modules
import React from 'react';
import { useSelector } from 'react-redux';

// Components
import ListContainer from '../../components/listContainer/index';

function Bookmarks() {
    const select = useSelector((state: any) => state);

    return (
        <>
            {<ListContainer list={select.bookmarks.list} bookmarks={select.bookmarks.list} />}
        </>
    )
}

export default Bookmarks
