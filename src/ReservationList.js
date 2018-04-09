import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import SingleReservation from './SingleReservation';
import ImageBlekitny from './images/blekitny.jpg';
import ImageBrazowy from './images/brazowy.jpg';
import ImageBursztynowy from './images/bursztynowy.jpg';
import ImageSrebrny from './images/srebrny.jpg';
import ImageZloty from './images/zloty.jpg';

export default class ReservationList extends Component {
	deleteReservation = (index) => {
		this.props.deleteReservation(index);
	}

	render() {
		let bookList = this.props.bookList;
		bookList = bookList.map((item, index) => {
			let apartmentImage;

			switch (item.name) {
				case 'Błękitny':
					apartmentImage = ImageBlekitny;
					break;

				case 'Brązowy':
					apartmentImage = ImageBrazowy;
					break;

				case 'Bursztynowy':
					apartmentImage = ImageBursztynowy;
					break;

				case 'Srebrny':
					apartmentImage = ImageSrebrny;
					break;

				case 'Złoty':
					apartmentImage = ImageZloty;
					break;
			}

			let fromDate = item.startDate;
			let toDate = item.endDate;

			return (
				<SingleReservation
					index={item.id}
					key={index}
					name={'Apartament ' + item.name}
					image={apartmentImage}
					fromDate={fromDate}
					toDate={toDate}
					delete={this.deleteReservation}
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
