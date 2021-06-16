import moment from 'moment';

function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.substr(1);
}



function formatAMPM(str) {
    if (!str) return '';

    
    var date = new Date(str);
    var fullDate = moment(date).format("MM/DD/YYYY");
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return fullDate + ' ' + strTime;
}

export {
    capitalize,
    formatAMPM
};