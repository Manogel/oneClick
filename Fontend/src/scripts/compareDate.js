export default function compare(a, b) {
  if (a.data_inicio >= b.data_inicio) {
    if (a.hora_inicio > b.hora_inicio) {
      return a.hora_inicio > b.hora_inicio;
    }
    return a.data_inicio > b.data_inicio;
  } else {
    return a.data_inicio > b.data_inicio;
  }
}
