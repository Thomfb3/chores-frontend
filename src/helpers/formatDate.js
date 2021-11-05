const formatDate = (date) => {
    const choreDate = new Date(date)
    const month = choreDate.toLocaleString('default', { month: 'long' });
    const year = choreDate.toLocaleString('default', { year: 'numeric' });
    const day = choreDate.toLocaleString('default', { day: 'numeric' });
    const time = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(choreDate) 
    const daysOfTheWeek = ["Sunday", "Saturday","Monday","Tuesday","Wednesday", "Thursday", "Friday"] 
    return `${daysOfTheWeek[choreDate.getUTCDay()]}, ${month} ${day}, ${year} - ${time}`;
};

export default formatDate;