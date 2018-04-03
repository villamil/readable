import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class ActionsMenu extends Component {

    render() {
        return (
            <div>
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                >
                    <MenuItem primaryText="Edit" />
                    <MenuItem primaryText="Delete" onClick={() => this.props.onDelete(this.props.id)} />
                </IconMenu>
            </div>
        )
    }
}

export default ActionsMenu;