import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';

export default class AddReservationModal extends Component {
  isUnavailable = (date, apartment) => {
    date = moment(date).format('DD/MM/YYYY');
    let unavailableDates = [];

    switch (apartment) {
      case 1:
        unavailableDates = this.props.apartment1UnavailableDates;
        break;

      case 2:
        unavailableDates = this.props.apartment2UnavailableDates;
        break;

      case 3:
        unavailableDates = this.props.apartment3UnavailableDates;
        break;

      case 4:
        unavailableDates = this.props.apartment4UnavailableDates;
        break;

      case 5:
        unavailableDates = this.props.apartment5UnavailableDates;
        break;
    }

    for (let i = 0; i < unavailableDates.length; i++) {
      if (moment(unavailableDates[i]).format('DD/MM/YYYY') === date) return true;
    }
  };

  render() {
    const actions = [
      <FlatButton
        label="Anuluj"
        primary={true}
        onClick={this.props.closeModal}
      />,
      <FlatButton
        label="Dodaj"
        primary={true}
        keyboardFocused={false}
        onClick={this.props.confirmReservation}
      />
    ];

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() + 1);

    const autoOk = true;

    let apartment = this.props.actualApartament;
    let minDate = new Date(this.props.startDate);

    return (
      <div>
        <FloatingActionButton
          style={{position: 'fixed', right: 20, bottom: 20}}
          onClick={this.props.openModal}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Nowa rezerwacja"
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.props.closeModal}
        >
          <p>Uzupełnij szczegóły rezerwacji.</p>
					<SelectApartament value={this.props.actualApartament} handleChange={this.props.chooseApartament} onChange={this.checkActualApartment} />
					<div>
	          <DatePicker
              hintText="Od kiedy?"
              style={{display: 'block'}}
              onChange={this.props.chooseStartDate}
              minDate={today}
              autoOk={autoOk}
              shouldDisableDate={(date) => this.isUnavailable(date, apartment)}
            />
	          <DatePicker
              hintText="Do kiedy?"
              style={{display: 'block'}}
              onChange={this.props.chooseEndDate}
              minDate={minDate}
              autoOk={autoOk}
              shouldDisableDate={(date) => this.isUnavailable(date, apartment)}
            />
					</div>
        </Dialog>
      </div>
    );
  }
}

const SelectApartament = (props) => {
	return (
		<div>
			<SelectField
				floatingLabelText="Apartament"
				value={props.value}
				onChange={props.handleChange}
			>
				<MenuItem value={1} primaryText="Bursztynowy" />
				<MenuItem value={2} primaryText="Błękitny" />
				<MenuItem value={3} primaryText="Złoty" />
				<MenuItem value={4} primaryText="Srebrny" />
				<MenuItem value={5} primaryText="Brązowy" />
			</SelectField>
		</div>
	)
}
