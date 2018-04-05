import moment from 'moment';

export default function normalizeDate (timestamp) {
    return moment(timestamp).format('MMMM Do YY')
}