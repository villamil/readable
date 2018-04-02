import React, { Component } from 'react';
import ArrowDownward from 'material-ui/svg-icons/navigation/expand-more';
import ArrowUpward from 'material-ui/svg-icons/navigation/expand-less';
import IconButton from 'material-ui/IconButton';

class Votes extends Component {
    render() {
        return (
            <div className="column-container">
                <IconButton>
                    <div onClick={() => this.props.vote(1, this.props.content)}><ArrowUpward /></div>
                </IconButton>
                <div>
                    <label>{this.props.content.voteScore}</label>
                </div>
                <IconButton>
                    <div onClick={() => this.props.vote(-1, this.props.content)}><ArrowDownward /></div>
                </IconButton>
            </div>
        );
    }
};

export default Votes;