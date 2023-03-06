import $ from "jquery";

export const addComma = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const tabDropDown = () => {
  $("#root").on("click", ".open_roles_grid_item_header", function () {
    // if ($(this).parent().hasClass("active")) {
    //   $(this).next().slideUp();
    //   $(this).parent().removeClass("active");
    // } else {
    //   $(".open_roles_grid_item").removeClass("active");
    //   $(".open_roles_grid_item_body").slideUp();
    //   $(this).parent().addClass("active");
    //   $(this).next().slideDown();
    // }

    $(this)
      .parent(".open_roles_grid_item")
      .find(".open_roles_grid_item_body")
      .slideToggle();
    // $(this)
    //   .parent(".open_roles_grid_item")
    //   .prevAll(".open_roles_grid_item")
    //   .find(".open_roles_grid_item_body")
    //   .slideUp();
    // $(this)
    //   .parent(".open_roles_grid_item")
    //   .nextAll(".open_roles_grid_item")
    //   .find(".open_roles_grid_item_body")
    //   .slideUp();
  });
};

export const accordionTab = () => {
  //this is the button
  var acc = document.getElementsByClassName("open_roles_grid_item_header");
  var i;

  for (i = 0; i < acc.length; i++) {
    //when one of the buttons are clicked run this function
    acc[i].onclick = function () {
      //variables
      var panel = this.nextElementSibling;
      var coursePanel = document.getElementsByClassName(
        "open_roles_grid_item_body"
      );
      var courseAccordion = document.getElementsByClassName(
        "open_roles_grid_item_header"
      );
      var courseAccordionActive = document.getElementsByClassName(
        "open_roles_grid_item_header active"
      );

      /*if pannel is already open - minimize*/
      if (panel.style.maxHeight) {
        //minifies current pannel if already open
        panel.style.maxHeight = null;
        //removes the 'active' class as toggle didnt work on browsers minus chrome
        this.classList.remove("active");
      } else {
        //pannel isnt open...
        //goes through the buttons and removes the 'active' css (+ and -)
        for (var ii = 0; ii < courseAccordionActive.length; ii++) {
          courseAccordionActive[ii].classList.remove("active");
        }
        //Goes through and removes 'activ' from the css, also minifies any 'panels' that might be open
        for (var iii = 0; iii < coursePanel.length; iii++) {
          this.classList.remove("active");
          coursePanel[iii].style.maxHeight = null;
        }
        //opens the specified pannel
        panel.style.maxHeight = panel.scrollHeight + "px";
        //adds the 'active' addition to the css.
        this.classList.add("active");
      }
    }; //closing to the acc onclick function
  } //closing to the for loop.
};

export const removeDashFromString = (str) => {
  var i,
    frags = str.split("-");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
};

export const gtYears = () => {
  let now = new Date().getUTCFullYear();
  let years = Array(now - (now - 90))
    .fill("")
    .map((v, idx) => now - idx);
  return years;
};

export const removeFormatDate = (date) => {
  var d = new Date(date);
  let month = d.getMonth() + 1;
  let day = d.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  let returnedDate = day + "-" + month + "-" + d.getFullYear();

  return returnedDate;
};

export const validEmail = (email) => {
  var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(email);
};

export const formatAMPM = (datepayload) => {
  var date = new Date(datepayload);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const getAMPM = () => {
  var date = new Date();
  var hours = date.getHours();
  var ampm = hours >= 12 ? "PM" : "AM";
  var strTime = ampm;
  return strTime;
};

export const formateDateByName = (newDate) => {
  const d = new Date(newDate);
  const year = d.getFullYear(); // 2019
  const date = d.getDate();
  // const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = d.getMonth();
  const monthName = months[monthIndex];
  // ${dayName},
  const formatted = ` ${date < 10 ? "0" + date : date} ${monthName} ${year}`;

  return formatted;
};

export const formateDateAndTimeByName = (newDate) => {
  const d = new Date(newDate);
  const year = d.getFullYear(); // 2019
  const date = d.getDate();
  // const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var hours = d.getHours();
  var minutes = d.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  // date = date < 10 ? "0" + minutes : date;
  var strTime = hours + ":" + minutes + " " + ampm;

  // const dayIndex = d.getDay();
  // const dayName = days[dayIndex];

  const monthIndex = d.getMonth();
  const monthName = months[monthIndex];
  // ${dayName},
  const formatted = ` ${
    date < 10 ? "0" + date : date
  } ${monthName} ${year}, ${strTime}`;

  return formatted;
};

export const numbersFromOneTo90 = () => {
  let numbers = [];
  for (let i = 1; i <= 47; i++) {
    numbers.push(i);
  }

  return numbers;
};

export const generate = (n) => {
  var add = 1,
    max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
};

export const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

export const daysToExpire = () => {
  let newDate = new Date(
    "Wed Mar 22 2023 22:48:41 GMT+0100 (West Africa Standard Time)"
  );

  console.log(newDate.getTime());
  // Set the date we're counting down to
  var countDownDate = newDate.getTime();

  // console.log(countDownDate)

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById(
      "countDownExpiry"
    ).innerHTML = `<div class="daysToExpire">
            <div class="daysToExpireItems">
                <p>${days}</p>
                <p>Days </p>
            </div>
            <div class="daysToExpireItems demacat">
                :
            </div>
            <div class="daysToExpireItems">
                <p>${hours}</p>
                <p>Hours </p>
            </div>
            <div class="daysToExpireItems demacat">
                :
            </div>
            <div class="daysToExpireItems">
                <p>${addZero(minutes)}</p>
                <p>Mins </p>
            </div>
            <div class="daysToExpireItems demacat">
                :
            </div>
            <div class="daysToExpireItems">
                <p>${addZero(seconds)} </p>
                <p>Secs </p>
            </div>
        </div>`;

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countDownExpiry").innerHTML = "EXPIRED";
    }
  }, 1000);
};

export const inputCodeNext = () => {
  $(document).on("keyup", ".instructionMessageInputCodes", function (e) {
    var target = e.srcElement || e.target;
    var valuee = e.target.value;
    // var allValue = "";

    var regex = /^[a-zA-Z]+$/;

    if (valuee.match(regex)) {
      e.target.value = "";
    } else {
      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
      var myLength = target.value.length;
      if (myLength >= maxLength) {
        var next = target;

        // eslint-disable-next-line no-cond-assign
        while ((next = next.nextElementSibling)) {
          // console.log(next);
          // allValue = allValue + target.value;
          // console.log(allValue);
          if (next == null) break;
          if (next.tagName.toLowerCase() === "input") {
            next.focus();
            break;
          }
        }
      }
      // Move to previous field if empty (user pressed backspace)
      else if (myLength === 0) {
        var previous = target;
        // eslint-disable-next-line no-cond-assign
        while ((previous = previous.previousElementSibling)) {
          if (previous == null) break;
          if (previous.tagName.toLowerCase() === "input") {
            previous.focus();
            break;
          }
        }
      }
    }
  });
};

export const sortArrayByname = (array) => {
  return array.slice().sort(function (a, b) {
    return a.name < b.name ? -1 : 1;
  });
};
