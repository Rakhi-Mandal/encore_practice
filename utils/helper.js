import { format } from 'date-fns';
function getCurrentDate() {
    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, "EEE MMM dd, yyyy"); 

    return formattedCurrentDate;
}
 
 function createRegExp(dataValue) {
    return new RegExp(dataValue);
}
module.exports = {
    createRegExp,
    getCurrentDate
};

