import React, { Component } from 'react';
import * as firebase from 'firebase';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReservationList from './ReservationList';
import AddReservationModal from './AddReservationModal';
import './App.css';

let database;

export const init = () => {
  let config = {
    apiKey: "AIzaSyCAA_1GV2gy4hG7pRJIFsWn6VLx5-tRfHc",
    authDomain: "booking-app-88db1.firebaseapp.com",
    databaseURL: "https://booking-app-88db1.firebaseio.com",
		projectId: "booking-app-88db1",
    storageBucket: "",
    messagingSenderId: "431906436671"
  }
  firebase.initializeApp(config);
  database = firebase.database();
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      apartamentName: '',
      selectValue: '',
      startDate: '',
  		endDate: '',
      bookList: [],
    }
    init();
  }

  componentDidMount() {
    let bookListRef = database.ref('bookList').orderByKey().limitToLast(100);
    bookListRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          name: items[item].name,
          startDate: items[item].startDate,
          endDate: items[item].endDate
        });
      }
      this.setState({
        bookList: newState
      });
    });
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

    if (name == '' || startDate == '' || endDate == '') {
      alert('Czegoś brakuje! Uzupełnij brakujące informacje i spróbuj ponownie.');
    } else {
      // zapisuje rezerwację do bazy danych
      database.ref('bookList').push({
        name: name,
        startDate: startDate,
        endDate: endDate
      });

      let bookListRef = database.ref('bookList').orderByKey().limitToLast(100);
      bookListRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            name: items[item].name,
            startDate: items[item].startDate,
            endDate: items[item].endDate
          });
        }
        this.setState({
          bookList: newState
        });
      });

      this.setState({
        modalIsOpen: false,
        apartamentName: '',
        selectValue: '',
        startDate: '',
    		endDate: ''
      });
    }
  };

  handleDeleteReservation = (apartament) => {
    let bookList = this.state.bookList.filter((value, index) => {
      return apartament !== index;
    });

    this.setState({
      bookList: bookList
    });

    let bookListRef = database.ref('bookList');
    bookListRef.child(apartament).remove();
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
