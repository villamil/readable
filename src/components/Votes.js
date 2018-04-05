import React from 'react';
import ArrowDownward from 'material-ui/svg-icons/navigation/expand-more';
import ArrowUpward from 'material-ui/svg-icons/navigation/expand-less';
import IconButton from 'material-ui/IconButton';

const Votes = ({ vote, content }) => (
    <div className="column-container">
        <IconButton>
            <div onClick={() => vote(1, content)}><ArrowUpward /></div>
        </IconButton>
        <div>
            <label>{content.voteScore}</label>
        </div>
        <IconButton>
            <div onClick={() => vote(-1, content)}><ArrowDownward /></div>
        </IconButton>
    </div>
);

export default Votes;