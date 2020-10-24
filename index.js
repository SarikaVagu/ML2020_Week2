//greet messages
morning_greets = ["morning","first"];
afternoon_greets = ["afternoon","second","gfg"];
evening_greets = ["evening","third"];
thankyou_greets = ["1","2"];

//user details dictionary username:[username,password,isAdmin,[registered courses]]
users = { 
  "abc":["abc","abc",false,[]],
  "admin":["admin","admin",true,[]],
  "user":["user","user",false,[]]
  };

//courses available { branch: [course1: ["course1",[registeredStudents]]] }
var available_courses = {
  "CSE": {
    "abc":["abc",[1,3,2,6]],
    "ahd":["ahd",[]]
  },
  "ECE": {},
  "IT": {},
  "CIVIL": {},
  "MECHANICAL": {}
};

var user=[]

//display greeting messages based on hour in a day in element with id "greet"
function greet (){
  var date = new Date();
  var hour = date.getHours();
  var greetmessage = "";
  if ( hour >= 17 )
      greetmessage = evening_greets[Math.floor(Math.random() * evening_greets.length)];
  else if ( hour >= 12 )
      greetmessage = afternoon_greets[Math.floor(Math.random() * afternoon_greets.length)];
  else 
      greetmessage = morning_greets[Math.floor(Math.random() * morning_greets.length)];
  // console.log(greetmessage)
  document.getElementById("greet").innerText = greetmessage;
}

//display thankyou greeting message in element with id "thankyou"
function thankYouGreet(){
   thankyoumessage = thankyou_greets[Math.floor(Math.random() * thankyou_greets.length)];
  //  console.log(thankyoumessage)
   document.getElementById("thankyou").innerText = thankyoumessage;
}

//login which takes username, password, isAdmin from id's "username", "password", "isAdmin" respectively.
function login(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var isAdmin = document.getElementById("isAdmin").value;
  var user = users[username]
  if( user != undefined ){
      if( password == user[1] && isAdmin == user[2] ){
          window.user = user;
          return true;
      } 
      else{
          alert("Wrong password");
          return false;
      }
  }
  else{
          alert("username not found");
          return false;
  }
}

//user actions for a course
//gets branches form available_courses and adds HTML script to element with id "displayBranches"
function viewBranches(){
    var branches = Object.keys(available_courses);
    console.log(branches)
    var i;
    var branchesHTML = "";
    for ( i = 0; i < branches.length; i++){
      branchesHTML += "<h2 class = \"branch\" id = \""+ branches[i] +"\">"+(i+1) + ". " + branches[i]+"</h2><br>";
    }
    // console.log(branchesHTML);
    document.getElementById("displayBranches").innerHTML = branches;
}

//gets courses of particular form available_courses and adds HTML script to element with id "displayCourses"
function viewCourses(branch){
    var courses = Object.keys(available_courses[branch]);
    console.log(courses)
    var i;
    var coursesHTML = "";
    for ( i = 0; i < courses.length; i++){
      coursesHTML += "<h2 class = \"course\" id = \""+ courses[i] +"\">"+(i+1) + ". " + courses[i]+"</h2><br>";
    }
    // console.log(coursesHTML);
    document.getElementById("displayCourses").innerHTML = courses;
}

function registerCourse(branchName,courseName){
    users[user[0]][3].push([branchName,courseName]);
}

function unregisterCourse(branchName,courseName){
  var registeredCourses = users[user[0]][3];
  var i;
  var index = -1;
  for(i=0;i<registeredCourses.length;i++){
    if(registeredCourses[i][0] == branchName && registeredCourses[i][1] == courseName){
        index=i;
    }
  }
  if (index > -1) {
    users[user[0]][3].splice(index, 1);
  }
}

//gets registered course of particular user and adds HTML script to element with id "displayRegisteredCourses"
function viewRegisteredCourses(){
  var registeredCourses = users[user[0]][3];
  var i;
  var registeredCoursesHTML = "";
  for ( i = 0; i < registeredCourses.length; i++){
    registeredCoursesHTML += "<h2 class = \"course\">"+(i+1) + ". " + registeredCourses[i][1]+"</h2><br>";
    // console.log(registeredCoursesHTML);
  }
  document.getElementById("displayRegisteredCourses").innerHTML = courses;
}

//admin actions for a course

function addCourse(branchName, courseName){
    available_courses[branchName][courseName] = [courseName,[]];
}

function deleteCourse(branchName, courseName){
    delete available_courses[branchName][courseName];
}

//gets registered users of particular course and adds HTML script to element with id "displayRegisteredStudents"
function viewRegisteredStudents(branchName, courseName){
  var registeredStudents = available_courses[branchName][courseName][1]
  var registeredStudentsHTML = ""
  for ( i = 0; i < registeredStudents.length; i++){
      registeredStudentsHTML += "<h2 class = \"registeredstudent\">"+(i+1) + ". " + registeredStudents[i]+"</h2><br>";
    }
  document.getElementById("displayRegisteredStudents").innerHTML = registeredStudentsHTML;
}

function viewNumberOfRegisteredStudents(branchName, courseName){
  var numRegisteredStudents = available_courses[branchName][courseName][1].length;
  document.getElementById("displayRegisteredStudentsNumber").innerText = numRegisteredStudents;
}
