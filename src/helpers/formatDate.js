const formatDate = (date) => {
    const choreDate = new Date(date)
    const month = choreDate.toLocaleString('default', { month: 'long' });
    const year = choreDate.toLocaleString('default', { year: 'numeric' });
    const day = choreDate.toLocaleString('default', { day: 'numeric' });
    const time = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true, timeZone: "America/New_York" }).format(choreDate); 
    const daysOfTheWeek = ["Sunday", "Saturday","Monday","Tuesday","Wednesday", "Thursday", "Friday"] 
    return `${daysOfTheWeek[choreDate.getUTCDay()]}, ${month} ${day}, ${year} - ${time}`;
};

const formatShortDate = (date) => {
    const choreDate = new Date(date)
    const month = choreDate.toLocaleString('default', { month: 'numeric' });
    const year = choreDate.toLocaleString('default', { year: 'numeric' });
    const day = choreDate.toLocaleString('default', { day: 'numeric' });
    return `${month}/${day}/${year}`;
};

const formatLongDate = (date) => {
    const choreDate = new Date(date)
    const month = choreDate.toLocaleString('default', { month: 'long' });
    const year = choreDate.toLocaleString('default', { year: 'numeric' });
    const day = choreDate.toLocaleString('default', { day: 'numeric' });
    return `${month} ${day}, ${year}`;
};

const formatDay = (date) => {
    const choreDate = new Date(date)
    const daysOfTheWeek = ["Sunday", "Saturday","Monday","Tuesday","Wednesday", "Thursday", "Friday"] 
    return `${daysOfTheWeek[choreDate.getUTCDay()]}`;
};

const formatTime = (date) => {
    const choreDate = new Date(date)
    const time = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true, timeZone: "America/New_York" }).format(choreDate); 
    return `${time}`;
};


module.exports = { 
    formatDate, 
    formatShortDate, 
    formatDay, 
    formatTime, 
    formatLongDate 
}; 