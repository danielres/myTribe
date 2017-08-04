import moment from 'moment'

export default dateStr => {
  const date = new Date(dateStr)
  return moment(date).format('MMM D, YYYY')
}
