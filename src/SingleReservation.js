import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {darkBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import CalendarIcon from 'material-ui/svg-icons/action/date-range';

export default class SingleReservation extends Component {
	delete() {
		this.props.delete(this.props.index);
	}

	render() {
		const rightIconDelete = (
			<IconButton onClick={this.delete.bind(this)}>
		    <DeleteIcon />
		  </IconButton>
		);

		return (
			<div>
				<ListItem
					leftAvatar={
						<Avatar src={this.props.image} style={{width: 43, height: 43}} />
					}
					rightIconButton={rightIconDelete}
					primaryText={this.props.name}
					secondaryText={
						<p style={{color: darkBlack, marginTop: 5, height: 22}}>
							<CalendarIcon style={{verticalAlign: 'bottom'}} /> Od: {this.props.fromDate}
							<CalendarIcon style={{verticalAlign: 'bottom', marginLeft: 10}} /> Do: {this.props.toDate}
						</p>
					}
					secondaryTextLines={2}
				/>
				<Divider />
			</div>
		)
	}
}
