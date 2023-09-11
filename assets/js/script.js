var currentTimeEl = $('#currentDay');

$(document).ready(function() {

  // handle displaying current time
  function displayTime() {
    var rightNow = dayjs().format('MMMM DD, YYYY [at] HH:mm:ss');
    currentTimeEl.text(rightNow);
  }
  displayTime();
  setInterval(displayTime, 1000);

  var currentHour = dayjs().hour();

  $(".time-block").each(function() {
    // extracts ## from the hour-## id in each time-block
    var blockHour = $(this).attr("id").split("-")[1];

    // apply past, present, or future class based on the current hour
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }

    var timeBlockId = `hour-${blockHour}`;
    var saveButton = $(this).find(".saveBtn");
    var textarea = $(this).find(".description");

    saveButton.on("click", function () {
      // retrieve input from textarea
      var plannerInput = textarea.val();
      // use the time block id as the key to save the input in local storage
      localStorage.setItem(timeBlockId, plannerInput);
      // alert('Saved.');
    });

    var savedData = localStorage.getItem(timeBlockId);
    if (savedData) {
      textarea.val(savedData);
    }
  });

});