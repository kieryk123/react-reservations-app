import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class AddReservationModal extends Component {
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

    return (
      <div>
        <FloatingActionButton
          style={{position: 'absolute', right: 20, bottom: 20}}
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
					<SelectApartament value={this.props.actualApartament} handleChange={this.props.chooseApartament} />
					<div>
	          <DatePicker hintText="Od kiedy?" style={{display: 'inline-block'}} onChange={this.props.chooseStartDate} minDate={today} autoOk={autoOk} />
	          <DatePicker hintText="Do kiedy?" style={{display: 'inline-block', marginLeft: 10}} onChange={this.props.chooseEndDate} minDate={yesterday} autoOk={autoOk} />
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
