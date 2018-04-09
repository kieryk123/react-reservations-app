import React, { Component } from 'react';
import * as firebase from 'firebase';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReservationList from './ReservationList';
import AddReservationModal from './AddReservationModal';
import './App.css';

let database;

const firebaseInit = () => {
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
      loading: true,
      modalIsOpen: false,
      apartamentName: '',
      selectValue: '',
      startDate: '',
  		endDate: '',
      bookList: [],
      apartment1UnavailableDates: [],
      apartment2UnavailableDates: [],
      apartment3UnavailableDates: [],
      apartment4UnavailableDates: [],
      apartment5UnavailableDates: [],
    }
    firebaseInit();

    this.handleDeleteReservation = this.handleDeleteReservation.bind(this);
  }

  componentDidMount() {
    let bookListRef = database.ref('bookList').orderByKey().limitToLast(100);
    bookListRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      let apartment1UnavailableDates = [];
      let apartment2UnavailableDates = [];
      let apartment3UnavailableDates = [];
      let apartment4UnavailableDates = [];
      let apartment5UnavailableDates = [];
      let startDate;
      let endDate;

      for (let item in items) {
        newState.push({
          id: item,
          name: items[item].name,
          startDate: items[item].startDate,
          endDate: items[item].endDate
        });

        switch (items[item].name) {
          case 'Bursztynowy':
            startDate = moment(items[item].startDate, 'DD/MM/YYYY');
            endDate = moment(items[item].endDate, 'DD/MM/YYYY');

            while (startDate.isSameOrBefore(endDate)) {
              apartment1UnavailableDates.push(startDate.clone());
              startDate.add(1, 'days');
            }
            break;

          case 'Błękitny':
            startDate = moment(items[item].startDate, 'DD/MM/YYYY');
            endDate = moment(items[item].endDate, 'DD/MM/YYYY');

            while (startDate.isSameOrBefore(endDate)) {
              apartment2UnavailableDates.push(startDate.clone());
              startDate.add(1, 'days');
            }
            break;

          case 'Złoty':
            startDate = moment(items[item].startDate, 'DD/MM/YYYY');
            endDate = moment(items[item].endDate, 'DD/MM/YYYY');

            while (startDate.isSameOrBefore(endDate)) {
              apartment3UnavailableDates.push(startDate.clone());
              startDate.add(1, 'days');
            }
            break;

          case 'Srebrny':
            startDate = moment(items[item].startDate, 'DD/MM/YYYY');
            endDate = moment(items[item].endDate, 'DD/MM/YYYY');

            while (startDate.isSameOrBefore(endDate)) {
              apartment4UnavailableDates.push(startDate.clone());
              startDate.add(1, 'days');
            }
            break;

          case 'Brązowy':
            startDate = moment(items[item].startDate, 'DD/MM/YYYY');
            endDate = moment(items[item].endDate, 'DD/MM/YYYY');

            while (startDate.isSameOrBefore(endDate)) {
              apartment5UnavailableDates.push(startDate.clone());
              startDate.add(1, 'days');
            }
            break;
        }
      }
      this.setState({
        bookList: newState,
        apartment1UnavailableDates: apartment1UnavailableDates,
        apartment2UnavailableDates: apartment2UnavailableDates,
        apartment3UnavailableDates: apartment3UnavailableDates,
        apartment4UnavailableDates: apartment4UnavailableDates,
        apartment5UnavailableDates: apartment5UnavailableDates
      }, this.loadingEnded);
    });
  }

  loadingEnded = () => {
    console.log('koniec');
    this.setState({loading: false});
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
    this.setState({startDate: date});
  };

  handleChooseEndDate = (e, date) => {
    this.setState({endDate: date});
  };

  handleConfirmReservation = () => {
    let name = this.state.apartamentName;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    if (name == '' || startDate == '' || endDate == '') {
      alert('Czegoś brakuje! Uzupełnij brakujące informacje i spróbuj ponownie.');
    } else {
      // zapisuje rezerwację do bazy danych

      let startDateFormated = moment(startDate).format('DD/MM/YYYY');
      let endDateFormated = moment(endDate).format('DD/MM/YYYY');

      database.ref('bookList').push({
        name: name,
        startDate: startDateFormated,
        endDate: endDateFormated
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

      this.handleSetUnavailableDates(startDate, endDate, name);

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

  handleSetUnavailableDates = (startDate, endDate, apartment) => {
    startDate = moment(startDate, 'DD/MM/YYYY');
    endDate = moment(endDate, 'DD/MM/YYYY');

    switch (apartment) {
      case 'Bursztynowy':
        let apartment1Dates = this.state.apartment1UnavailableDates;

        while (startDate.isSameOrBefore(endDate)) {
          apartment1Dates.push(startDate.clone());
          startDate.add(1, 'days');
        }

        this.setState({
          apartment1UnavailableDates: apartment1Dates
        });

        break;

      case 'Błękitny':
        let apartment2Dates = this.state.apartment2UnavailableDates;

        while (startDate.isSameOrBefore(endDate)) {
          apartment2Dates.push(startDate.clone());
          startDate.add(1, 'days');
        }

        this.setState({
          apartment2UnavailableDates: apartment2Dates
        });

        break;

      case 'Złoty':
        let apartment3Dates = this.state.apartment3UnavailableDates;

        while (startDate.isSameOrBefore(endDate)) {
          apartment3Dates.push(startDate.clone());
          startDate.add(1, 'days');
        }

        this.setState({
          apartment3UnavailableDates: apartment3Dates
        });

        break;

      case 'Srebrny':
        let apartment4Dates = this.state.apartment4UnavailableDates;

        while (startDate.isSameOrBefore(endDate)) {
          apartment4Dates.push(startDate.clone());
          startDate.add(1, 'days');
        }

        this.setState({
          apartment4UnavailableDates: apartment4Dates
        });

        break;

      case 'Brązowy':
        let apartment5Dates = this.state.apartment5UnavailableDates;

        while (startDate.isSameOrBefore(endDate)) {
          apartment5Dates.push(startDate.clone());
          startDate.add(1, 'days');
        }

        this.setState({
          apartment5UnavailableDates: apartment5Dates
        });

        break;
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <ReservationList
            bookList={this.state.bookList}
            deleteReservation={this.handleDeleteReservation}
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
            apartment1UnavailableDates={this.state.apartment1UnavailableDates}
            apartment2UnavailableDates={this.state.apartment2UnavailableDates}
            apartment3UnavailableDates={this.state.apartment3UnavailableDates}
            apartment4UnavailableDates={this.state.apartment4UnavailableDates}
            apartment5UnavailableDates={this.state.apartment5UnavailableDates}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
