import React, { Component } from 'react';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReservationList from './ReservationList';
import AddReservationModal from './AddReservationModal';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      apartamentName: '',
      selectValue: '',
      startDate: '',
  		endDate: '',
      bookList: [
        ['Błękitny', '12/12/2017', '26/12/2017'],
        ['Diamentowy', '15/06/2017', '22/17/2017'],
      ],
    }
  }

  handleOpenModal = () => {
    this.setState({modalIsOpen: true});
  };

  handleCloseModal = () => {
    this.setState({modalIsOpen: false});
  };

  handleChooseApartament = (event, index, value) => {
    let itemValue = value;

    switch (itemValue) {
      case 1:
        itemValue = 'Bursztynowy';
        break;
      case 2:
        itemValue = 'Błękitny';
        break;
      case 3:
        itemValue = 'Złoty';
        break;
      case 4:
        itemValue = 'Srebrny';
        break;
      case 5:
        itemValue = 'Brązowy';
        break;
      default:
        itemValue = '';
        break;
    }

		this.setState({
      apartamentName: itemValue,
      selectValue: value
    });
	}

  handleChooseStartDate = (e, date) => {
    let formattedDate = moment(date).format('DD/MM/YYYY');
    this.setState({startDate: formattedDate});
  };

  handleChooseEndDate = (e, date) => {
    let formattedDate = moment(date).format('DD/MM/YYYY');
    this.setState({endDate: formattedDate});
  };

  handleConfirmReservation = () => {
    let name = this.state.apartamentName;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    let bookList = this.state.bookList;

    bookList.push([name, startDate, endDate]);

    this.setState({
      bookList: bookList,
      modalIsOpen: false
    });
  };

  handleDeleteReservation = (apartament) => {
    let bookList = this.state.bookList.filter((value, index) => {
      return apartament !== index;
    });

    this.setState({
      bookList: bookList
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <ReservationList
            bookList={this.state.bookList}
            deleteReservation={this.handleDeleteReservation.bind(this)}
          />
          <AddReservationModal
            open={this.state.modalIsOpen}
            actualApartament={this.state.selectValue}
            actualStartDate={this.state.startDate}
            actualEndDate={this.state.endDate}
            openModal={this.handleOpenModal}
            closeModal={this.handleCloseModal}
            chooseApartament={this.handleChooseApartament}
            chooseStartDate={this.handleChooseStartDate}
            chooseEndDate={this.handleChooseEndDate}
            confirmReservation={this.handleConfirmReservation}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
