import moment from "moment"

export const formatDateTime = dateTime => moment(dateTime).format("YYYY-MM-DD HH:mm:ss");