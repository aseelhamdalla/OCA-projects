// menue bar function
function toggleSidebar(ref) {
  document.getElementById("sidebar").classList.toggle("active");
}
//Change backround btn
function darkBG() {
  document.body.style.backgroundImage = "url('images/black4k.jpg')";
  $(".pagecontainer").css("background-color", "#4d0f00");
  $("#sidebar").css("background-color", "#6e1500");
  $("footer").css("background-color", "#4d0f00");
  $(".acceptbox").css("color", "white");
}
function lightBG() {
  document.body.style.backgroundImage = "url('images/whiteBG.jpg')";
  $(".pagecontainer").css("background-color", "#225378");
  $("#sidebar").css("background-color", "#2d709f");
  $("footer").css("background-color", "#225378");
  $(".acceptbox").css("color", "black");
}

//Add a JQuery click event handler onto our checkbox.
$("#storagePermission").click(function () {
  //If the checkbox is checked.
  if ($(this).is(":checked")) {
    //Enable the submit button.
    $(".storageButton").attr("disabled", false);
  } else {
    //If it is not checked, disable the button.
    $(".storageButton").attr("disabled", true);
  }
});
let formoobj = {
  name: null,
  email: null,
  DOB: null,
  phone: null,
  pass: null,
};
function fillform() {
  let storeref = null;
  if (localStorage.getItem("formoobj") != null) {
    storeref = localStorage;
  } else if (sessionStorage.getItem("formoobj") != null) {
    storeref = sessionStorage;
  }
  if (storeref != null) {
    formoobj = JSON.parse(storeref.formoobj);
    document.getElementById("Username").value = formoobj.name;
    document.getElementById("email").value = formoobj.email;
    document.getElementById("phone").value = formoobj.phone;
    document.getElementById("pass").value = formoobj.pass;
    document.getElementById("DOB").value = formoobj.DOB;
  }
}
function localsessionstore(storetype) {
  formoobj.name = document.getElementById("Username").value;
  formoobj.email = document.getElementById("email").value;
  formoobj.phone = document.getElementById("phone").value;
  formoobj.pass = document.getElementById("pass").value;
  formoobj.DOB = document.getElementById("DOB").value;
  if (storetype == "local") {
    if (confirm("Save to local storage?")) {
      localStorage.setItem("formoobj", JSON.stringify(formoobj));
    }
    if (sessionStorage.getItem("formoobj") != null) {
      sessionStorage.removeItem("formoobj");
    }
  } else {
    if (confirm("Save to session storage?")) {
      sessionStorage.setItem("formoobj", JSON.stringify(formoobj));
    }
    if (localStorage.getItem("formoobj") != null) {
      localStorage.removeItem("formoobj");
    }
  }
}

function clearall() {
  if (localStorage.getItem("formoobj") != null) {
    if (confirm("clear local storage?")) {
      localStorage.removeItem("formoobj");
    }
  }
  if (sessionStorage.getItem("formoobj") != null) {
    if (confirm("clear session storage?")) {
      sessionStorage.removeItem("formoobj");
    }
  }
  document.getElementById("Username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("pass").value = "";
  document.getElementById("DOB").value = "";
}

function validation() {
  var name = document.getElementById("Username").value;
  var email = document.getElementById("email").value;
  var DOB = document.getElementById("DOB").value;
  var phone = document.getElementById("phone").value;
  var pass = document.getElementById("pass").value;
  var Regexname = /^[A-Za-z]{3,20}/;
  var Regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var RegexDOB = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  var Regexphone = /^\962?([7-9]{2})\)?([0-9]{7})$/;
  var Regexpass = /^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{1,15}$/;

  if (Regexname.test(name)) {
    document.getElementById("name_err").innerHTML = "";
  } else {
    document.getElementById("name_err").innerHTML =
      "Please Enter a valid  name";
    return false;
  }
  if (Regexemail.test(email)) {
    document.getElementById("email_err").innerHTML = "";
  } else {
    document.getElementById("email_err").innerHTML =
      "Please Enter a valid email";
    return false;
  }

  if (Regexpass.test(pass)) {
    document.getElementById("pass_err").innerHTML = "";
  } else {
    document.getElementById("pass_err").innerHTML =
      "Please Enter a valid password";
    return false;
  }
  if (Regexphone.test(phone)) {
    document.getElementById("phone_err").innerHTML = "";
  } else {
    document.getElementById("phone_err").innerHTML =
      "Please Enter a valid phone no.";
    return false;
  }
  if (RegexDOB.test(DOB)) {
    document.getElementById("DOB").innerHTML = "";
  } else {
    document.getElementById("DOB_err").innerHTML = "Please Enter DOB";
    return false;
  }

  localStorage.setItem("name", name);
  localStorage.setItem("pw", email);
  alert("Your account has been created");
}

//Font-Changer tool

function myFunction() {
  var x = $("#font_family").val();
  $(".chfont").css("font-family", x);
}
function myFunction1() {
  var x = $("#font_size").val();
  $(".chfont").css("font-size", x);
}
function checkedFunc(id) {
  if (document.getElementById(id).checked) {
    if (id == "font_italic") {
      $(".chfont").css("font-style", "italic");
    } else if (id == "font_bold") {
      $(".chfont").addClass("bold");
    } else if ("font_underline") {
      document.querySelector("body").style.textDecoration = "underline";
    }
  } else {
    if (id == "font_italic") {
      $(".chfont").css("font-style", "");
    } else if (id == "font_bold") {
      $(".chfont").removeClass("bold");
    } else if ("font_underline") {
      document.querySelector("body").style.textDecoration = "";
    }
  }
}
