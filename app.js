

function registration() {
    event.preventDefault();
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var phoneNumber = document.getElementById("phoneNumber");
    var password = document.getElementById("password");
    var cpassword = document.getElementById("cpassword");

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (password.value !== cpassword.value) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Passwords don't match!",
        });
    } else if (!regex.test(password.value)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `Password must contain at least one lowercase alphabet, one uppercase alphabet, one numeric digit, one special character, and be 8-15 characters long.`,
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Your Account has been Created",
            showConfirmButton: false,
            timer: 1500
        });

        // Store user data in Local Storage
        var userData = {
            name: name.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            password: password.value
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        setTimeout(() => {
            window.location.href = "./dashboard.html";
        }, 2500);
    }
}


/***************************************GET DATA FROM LOCAL STORAGE ************************************/

function getUserDataFromLS() {
    var getStringData = localStorage.getItem('userData');
    var parseData = JSON.parse(getStringData);
    console.log(parseData);

}
getUserDataFromLS();


/***************************************LOGIN  FUNCTIONS ************************************/
//Login function for loginForm
function login() {
    event.preventDefault()
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var getStringData = localStorage.getItem('userData');
    var parseData = JSON.parse(getStringData);

    if (parseData.email !== email.value) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Email not matched!"
        });
    } else if (parseData.password !== password.value) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Passwords not matched!"
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Login successfully",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            window.location.href = "./dashboard.html";
        }, 2500);
    }

}
function redirect() {
    window.location.href = "./index.html";
}

/***************************************DASHBOARD FUNCTIONS ************************************/


//profile photo display on dasboard after sign-up or login
const profilePhotoImg = document.getElementById("profilePhotoImg");
const profilePhotoInput = document.getElementById("profilePhotoInput");


profilePhotoImg.addEventListener("click", () => {
    profilePhotoInput.click();
});

profilePhotoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        profilePhotoImg.src = reader.result;
    };
    reader.readAsDataURL(file);
});



//questions array
var questions = [
    {
        question: "What does HTML stand for?",
        opt1: "Hyper Tag Markup Language",
        opt2: "Hyper Text Markup Language",
        opt3: "Hyperlinks Text Mark Language",
        opt4: "Hyperlinking Text Marking Language",
        ans: "Hyper Text Markup Language"
    },
    {
        question: "Which method is used to parse a string to an integer in JavaScript?",
        opt1: "parseInt()",
        opt2: "parseInteger()",
        opt3: "parseNumber()",
        opt4: "parseFloat()",
        ans: "parseInt()"
    },
    {
        question: "Which of these is a genuine tag keyword?",
        opt1: "Header",
        opt2: "Bold",
        opt3: "Body",
        opt4: "Image",
        ans: "Body"
    },
    {
        question: "What symbol indicates a tag?",
        opt1: "Angle brackets e.g <>",
        opt2: "Curved brackets e.g. {,}",
        opt3: "Commas e.g. ','",
        opt4: "Exclamation marks e.g. !",
        ans: "Angle brackets e.g <>"
    },
    {
        question: "What is the correct format for aligning written content to the center of the page in CSS?",
        opt1: "Text-align:center;",
        opt2: "Font-align:center;",
        opt3: "Text:align-center",
        opt4: "align-center;",
        ans: "Text-align:center;"
    }
];

//Initialize index =0
var index = 0;

//Intialize score =0
var result = 0;


//Dynamic renderQuestion Function
function renderQuestion() {
    if (index > 0) {
        var options = document.getElementsByName("option");

        for (var i = 0; i < options.length; i++) {
            if (options[i].checked && options[i].value === questions[index - 1].ans) {
                result++;
            }

        }
    }

    //Display Result
    if (!questions[index]) {
        calResult();
        return;
    }

    var container = document.getElementById("container");
    container.innerHTML = `  
    <div class="container card mt-5 w-75" id="card">
    <div class="card-header text-center h3" id="cardHeader">Web development quiz </div>
        <div class="card-body p-3" id="cardBody">
          <div id="result"></div>
            <p>${index + 1}. ${questions[index].question}</p>
          
            <div>
                <label for="option1">
                    <input type="radio" id="option1" name="option" value="${questions[index].opt1}">${questions[index].opt1}</label>
            </div>
            <div>
                <label for="option2">
                    <input type="radio" id="option2" name="option" value="${questions[index].opt2}">${questions[index].opt2}</label>
            </div>
            <div>
                <label for="option3">
                    <input type="radio" id="option3" name="option" value="${questions[index].opt3}">${questions[index].opt3}</label>
            </div>
            <div>
                <label for="option4">
                    <input type="radio" id="option4" name="option" value="${questions[index].opt4}">${questions[index].opt4}</label>
            </div>
            <div class="d-flex justify-content-evenly mb-2">
                <button id="prev" class="btn btn-primary mt-2" onClick="prevQuestion()">Previous</button>
                <button id="next" class="btn btn-success mt-2" onClick="nextQuestion()">Next</button>
            </div>
            <div class="text-center mt-4">
                <a  onclick="redirect()" href="#">Back to SignUp</a>
            </div>
        </div>
        
    </div>
   `;

    // Show/Hide "Previous" button based on the current question
    document.getElementById("prev").style.display = index === 0 ? "none" : "block";
}

//Previous Question function
function prevQuestion() {
    if (index > 0) {
        index--;        // Go back one step to load the previous question
        renderQuestion();
    }
}
//Next Question Function
function nextQuestion() {
    var options = document.getElementsByName("option");
    var isOptionSelected = false;
    // Check if any option is selected
    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            isOptionSelected = true;
            break;
        }
    }

    // If no option is selected, display an alert message
    if (!isOptionSelected) {
        alert("Please select an option before moving to the next question");
        return; // Prevent moving to the next question
    }

    if (index < questions.length) {
        index++;
        renderQuestion(); // Move to the next question
    }
}


//Calculate Result function
function calResult() {
    var percentage = (result / questions.length) * 100;
    document.getElementById("cardHeader").innerHTML = "Your Result";
    if (percentage > 70 && percentage <= 100) {
        document.getElementById("cardBody").innerHTML = "<p>Your Scrore is " + result + "/" + questions.length + "<br>" + "You passed the quiz with a score of " + percentage + "%" + "</p>";
    }
    else if (percentage < 70 && percentage >= 0) {
        document.getElementById("cardBody").innerHTML = "<p>Your Scrore is " + result + "/" + questions.length + "<br>" + "You failed the quiz with a score of " + percentage + "%" + "</p>";
    }
}

renderQuestion();


/***************************************DASHBOARD FUNCTIONS ENDS************************************/ 