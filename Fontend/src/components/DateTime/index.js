import DatePicker from "react-native-datepicker";
import React, { Component } from "react";
// import { Container } from './styles';
/* date
    style={{
      height: 42,
      backgroundColor: "#fff",
      width: 100,
      borderRadius: 4,
      marginBottom: 10,
      paddingRight: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#385774"
    }}
    onDateChange={date => {
      this.setState({ date: date });
    }}
    mode="date"
    */

export default class DateTime extends Component {
  state = {
    data_atual: ""
  };

  componentDidMount() {
    // Obtém a data/hora atual
    const data = new Date();

    // Guarda cada pedaço em uma constiável
    const dia = data.getDate(); // 1-31
    const mes = data.getMonth(); // 0-11 (zero=janeiro)
    const ano = data.getFullYear(); // 4 dígitos
    const str_data = ano + "-" + (mes + 1) + "-" + dia;
    this.setState({ data_atual: str_data });
    console.log(this.state.data_atual);
  }

  render() {
    const {
      date,
      placeholder,
      style,
      onDateChange,
      mode,
      format,
      minDate
    } = this.props;
    return (
      <DatePicker
        showIcon={false}
        date={date}
        placeholder={placeholder}
        style={style}
        onDateChange={date => onDateChange(date)}
        mode={mode}
        minDate={!!minDate ? minDate : this.state.data_atual}
        format={format}
        maxDate="2040-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            flex: 1,
            borderWidth: 0,
            margin: 0,
            padding: 0,
            width: 100
          },
          dateText: {
            marginLeft: 0,
            borderWidth: 0,
            padding: 0,
            color: "#000"
          },
          placeholderText: {
            marginLeft: 0,
            borderWidth: 0,
            padding: 0,
            color: "#999",
            textAlign: "center"
          }
        }}
      />
    );
  }
}
