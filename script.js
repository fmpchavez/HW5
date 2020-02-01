//run a function that displays the date
let time = new Date();
let currentHour = time.getHours();

time.toLocaleString()
//Displays the string of just the date
$("#currentDay").append(time.toDateString());


// save button; retrieve the last entry that was save into the textarea
let savedText = JSON.parse(localStorage.getItem('data')) || {}
    //function will trigger the event of the save button 
    $(document).on("click", ".saveBtn", function(){
        //Set a variable that will changes the string in the textarea to a text
        let textid = $(this).attr('id').replace('save', 'text')
        //Remove the spaces before and after the text that was save into the textarea
        let text = $(`#${textid}`).val().trim()
        console.log(text)
        savedText[textid] = text;
        //Save what was put in the textarea to the local storage
        localStorage.setItem('data', JSON.stringify(savedText))
    });


//Create a loop that will create the whole span of the scheduler during the work day
for(let i = 9; i < 18; i++){
    
    //Set the conditions for the background color of the textarea according to the current time
    if (i < currentHour) {
        textAreaColor = "lightgray";
    } else if (i === currentHour) {
        textAreaColor = "red";
    } else {
        textAreaColor= "green";
    }

    let ampm = "AM";
    let hNum = i;
  
    //Conditional elements to convert AM to PM depending on the time
    if (i > 12) {
        ampm = "PM";
        hNum = i - 12;
    }
    // Setting the conditions of 12NN being PM
    if (i >= 12) {
        ampm = "PM";
    }

    let currentTime = parseInt(new Date().getHours());


// Create a variable the contains the different elements of the scheduler
    let divEl = $(
        `<div class="row">
            <div class="col-sm-2 hour${i} time-block">${hNum}:00 ${ampm}</div>
            <textarea class="col-sm-8 textarea" style="background: ${textAreaColor}" id="text${i}">${savedText[`text${i}`] || ''}</textarea>
            <button class="col-sm-2 saveBtn" id='save${i}'>Save</button>
        </div>
    `)

    //Append the created divs via the for loop to the container div
    $(".container").append(divEl);

}
