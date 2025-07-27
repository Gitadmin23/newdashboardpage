import moment from "moment"

export const formatTimeAgo = (timeInMilliseconds: number) => {
  const currentTime = new Date().getTime()
  const timeDifference = currentTime - timeInMilliseconds

  // Calculate the time difference in seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 1) {
    // If the time is more than 24 hours, return the normal date and time
    const date = new Date(timeInMilliseconds)
    return `${formatDate(date, "ddd, MMMM Do YYYY")}, ${formatTime(date)}` // Adjust the format as needed
  } else if (days === 1) {
    return "1 day ago"
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else {
    return "Just now"
  }
}

export const formatDate = (isoString: any, format = "dddd, MMMM Do YYYY") =>
  moment(isoString).format(format)

  export const formatTime = (isoString: any, format = "h.mm A") =>
  moment(isoString).format(format)