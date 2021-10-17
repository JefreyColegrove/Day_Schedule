var currentDate
var currentDay = document.getElementById("currentDay")
var currentHour = moment().startOf('hour')


var container = $('.container');

var savedEvents = Array(9)

setInterval(function () {
    currentDate = moment().format("MMMM do YYYY h:mm:ss a")
}, 500);

// setInterval(function () {
//     currentHour = moment().startOf('hour')
//     // console.log(currentHour)
// }, 500);

setInterval(function date() {
    currentDay.innerText = currentDate
}, 500)

function timeBlocks() {
    for (let i = 9; i < 18; i++) {
        var timeblockHour = moment().startOf('day').hour(i)
        var hourFormat = moment(timeblockHour).format('h:mm a')
        var divElRow = $('<div>');
        var divElHour = $('<div>')
        var divElText = $('<textarea>');
        var divElSave = $('<div>');
        divElRow.addClass("row time-block");
        divElRow.attr('data-hour', i);
        divElHour.addClass('col-2 hour')
        divElHour.text(hourFormat);
        divElText.addClass('col-9 description')
        divElSave.addClass('col-1 saveBtn');

        if (currentHour.isAfter(timeblockHour)) {
            divElRow.addClass('past')
            divElText.prop('readonly', true);
        } else if (currentHour.isSame(timeblockHour)) {
            divElRow.addClass('present')
        } else {
            divElRow.addClass('future')
        }

        container.append(divElRow);
        divElRow.append(divElHour);
        divElRow.append(divElText);
        divElRow.append(divElSave);
    }

}

function load() {
    var storedEvents = JSON.parse(localStorage.getItem('savedEvents'));
    if (storedEvents !== null) {
        savedEvents = storedEvents;
        for (let i = 0; i < savedEvents.length; i++) {
            container.children('.row').eq(i).children('textarea').text(savedEvents[i]);
        }
    }
}

function save() {
    var arrIndexJSON = ($('.container').children()).index($(this).parent())
    let eventDetail = $(this).parent().children('textarea');
    eventDetail = eventDetail.val();
    savedEvents[arrIndexJSON] = eventDetail;
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    console.log("save")
}

timeBlocks()








load();
container.on("click", '.saveBtn', save);