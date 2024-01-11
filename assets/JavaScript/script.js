
//Function that executes once HTML doc is ready
$(document).ready(function() {

    //Variable linking to header id
      var header = $('header');
    //Variable linking to saveBtn class
      var saveButtonEl = $('.saveBtn');
    //Variable linking to ids used with the hour block in text format
      var hours = ['#hour-9AM', '#hour-10AM', '#hour-11AM', '#hour-12PM', '#hour-1PM', '#hour-2PM', '#hour-3PM', '#hour-4PM', '#hour-5PM'];
    //Variable linking to ids used with the section tag for each hour block
      var time = ['#9', '#10', '#11', '#12', '#13', '#14', '#15', '#16', '#17'];
    
    //Time Variables ranging from 9 AM - 5 PM
      var tt9 = dayjs().hour(9).format('HH');
      var tt10 = dayjs().hour(10).format('HH');
      var tt11 = dayjs().hour(11).format('HH');
      var tt12 = dayjs().hour(12).format('HH');
      var tt1 = dayjs().hour(13).format('HH');
      var tt2 = dayjs().hour(14).format('HH');
      var tt3 = dayjs().hour(15).format('HH');
      var tt4 = dayjs().hour(16).format('HH');
      var tt5 = dayjs().hour(17).format('HH');
      var array = [tt9, tt10, tt11, tt12, tt1, tt2, tt3, tt4, tt5];
    
      //Styling for header variable
      header.css({
        'text-align': 'center',
        'padding': '20px',
        'background-color': '#ff4d01',
        'color': 'white'
      });
    
      //Function that's called to ensure that the current time is always being displayed and is updated continuously
      function updateTime() {
        var reformatDate = dayjs().format('MMMM D, YYYY, h:mm:ss a');
        $('#time').text(reformatDate);
      }
    
      updateTime();
      setInterval(updateTime, 1000);
    
      //Function for when saveButton is clicked on it saves the user input into local storage along with the hour block they did it for
      saveButtonEl.on('click', function(event) {
        var index = saveButtonEl.index(this);
        var key = $(hours[index]).text();
        var textarea = $(this).siblings('textarea');
        localStorage.setItem(key, textarea.val());
        textarea.val(textarea.val());
      });
    
      //Function to automatically update each card to reflect whether if that hour block is in the past, present, or future
      function updateClasses() {
        var currentHour = dayjs().format('HH');
        for (var i = 0; i < array.length; i++) {
          console.log('currentHour:', currentHour);
          console.log('Time:', array[i]);
          if (currentHour > array[i]) {
            $(time[i]).addClass('past');
          } else if (currentHour < array[i]) {
            $(time[i]).addClass('future');
          } else {
            $(time[i]).addClass('present');
          }
        }
      }
    // For loop that grabs the text that's associated with whatever id that's within hour array and the user input
      for (var i = 0; i < hours.length; i++) {
        var key = $(hours[i]).text();
        var value = localStorage.getItem(key);
        $(hours[i]).siblings('textarea').val(value);
      }
    
      updateClasses();
    });