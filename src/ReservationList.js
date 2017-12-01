import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import SingleReservation from './SingleReservation';
import ImageDiamentowy from './images/diamentowy.jpg';

export default class ReservationList extends Component {
	deleteReservation(index) {
		this.props.deleteReservation(index);
	}

	render() {
		let bookList = this.props.bookList;
		bookList = bookList.map((item, index) => {
			return (
				<SingleReservation
					index={index}
					key={index}
					name={'Apartament ' + item[0]}
					image={ImageDiamentowy}
					fromDate={item[1]}
					toDate={item[2]}
					delete={this.deleteReservation.bind(this)}
				/>
			)
		});

		return (
			<List>
				<Subheader>Lista rezerwacji:</Subheader>
				<Divider />
				{bookList}
			</List>
		)
	}
}
