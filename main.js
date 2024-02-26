var questions = [
    {
      type: "true-false",
      question: "Câu 1. 1+1=2?",
      answer: "true"
    },
    {
      type: "true-false",
      question: "Câu 2. 1+1=3?",
      answer: "false"
    },
    {
        type: "true-false",
        question: "Câu 3. 2+2=3?",
        answer: "false"
    },
    {
        type: "true-false",
        question: "Câu 4. 2+4=6?",
        answer: "true"
    },
    {
        type: "true-false",
        question: "Câu 5. 1+4=5?",
        answer: "true"
    },
    {
      type: "multiple-answer",
      question: "Câu 6. 1+1=?",
      choices: ["2", "3", "4", "5"],
      answer: "2"
    },
    {
      type: "multiple-answer",
      question: "Câu 7. 9-1=?",
      choices: ["3", "5", "7", "8"],
      answer: "8"
    },
    {
      type: "multiple-choice",
      question: "Câu 8. 2x3=?",
      choices: ["3x2", "6", "5", "4"],
      answer: ["3x2","6"]
    },
    {
      type: "multiple-choice",
      question: "Câu 9. Các môn đang học kì này?",
      choices: ["CSDL", "CSDLPT", "Web", "Python"],
      answer: ["CSDLPT", "Web"]
    },
    {
      type: "essay",
      question: "Câu 10. Trang web này được code bằng gì(html,css,js)?",
      answer: ""
    }
  ];
  
  var quizContainer = document.getElementById('quiz');
  
  function displayQuestions() {
    questions.forEach(function(question, index) {
      var questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      questionDiv.innerHTML = '<p>' + question.question + '</p>';
      
      if (question.type === "true-false") {
        questionDiv.innerHTML += '<label><input type="radio" name="q' + index + '" value="true"> Đúng</label>' +
                                 '<label><input type="radio" name="q' + index + '" value="false"> Sai</label>';
      } else if (question.type === "multiple-answer") {
        question.choices.forEach(function(choice) {
          questionDiv.innerHTML += '<label><input type="radio" name="q' + index + '" value="' + choice + '"> ' + choice + '</label>';
        });
      } else if (question.type === "multiple-choice") {
        question.choices.forEach(function(choice) {
          questionDiv.innerHTML += '<label><input type="checkbox" name="q' + index + '" value="' + choice + '"> ' + choice + '</label>';
        });
      } else if (question.type === "essay") {
        questionDiv.innerHTML += '<textarea name="q' + index + '" rows="4" cols="50"></textarea>';
      }
      
      quizContainer.appendChild(questionDiv);
    });
  }
  
  displayQuestions();
  
  function submitQuiz() {
    var score = 0;
    var userAnswers = [];
    
    questions.forEach(function(question, index) {
      if (question.type === "true-false" || question.type === "multiple-answer") {
        var selectedAnswer = document.querySelector('input[name="q' + index + '"]:checked');
        if (selectedAnswer) {
          userAnswers.push(selectedAnswer.value);
          if (selectedAnswer.value === question.answer) {
            score++;
          }
        } else {
          userAnswers.push("");
        }
      } else if (question.type === "multiple-choice") {
        var selectedAnswers = Array.from(document.querySelectorAll('input[name="q' + index + '"]:checked')).map(function(checkbox) {
          return checkbox.value;
        });
        userAnswers.push(selectedAnswers);
        if (arraysEqual(selectedAnswers, question.answer)) {
          score++;
        }
      } else if (question.type === "essay") {
        var essayAnswer = document.querySelector('textarea[name="q' + index + '"]').value;
        if(essayAnswer ==="html,css,js"){
            score++;
        }
        userAnswers.push(essayAnswer);
      }
    });
    
    var result = "Điểm của bạn là: " + score +  "\nBạn đã trả lời đúng " + score + " câu trên " + questions.length + ".\n\n" + "Câu trả lời bạn đã nộp:\n";
    userAnswers.forEach(function(answer, index) {
      if (Array.isArray(answer)) {
        result += "Câu " + (index + 1) + ": " + (answer.length > 0 ? answer.join(', ') : "Không trả lời") + "\n";
      } else {
        result += "Câu " + (index + 1) + ": " + (answer === "" ? "Không trả lời" : answer) + "\n";
      }
    });
    
    alert(result);
  }
  
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  