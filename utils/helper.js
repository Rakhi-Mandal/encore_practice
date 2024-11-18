function getCurrentDate() {
    const today = new Date();
    const dayOfWeek = today.toLocaleString('default', { weekday: 'short' });;
    const date = today.getDate().toString();
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear(); 
    const formattedDate = `${dayOfWeek} ${month} ${date}, ${year}`;
    return formattedDate;
  }
   function getOnlyCurrentDate() {
    return new Date().getDate().toString();
}
 
 function createRegExp(dataValue) {
    return new RegExp(dataValue);
}
module.exports = {
    createRegExp,
    getCurrentDate,
    getOnlyCurrentDate
};

