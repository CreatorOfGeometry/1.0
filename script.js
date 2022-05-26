"use strict";

// /* Меню бургер */
document.querySelector(".burger").addEventListener("click", function () {
  document.querySelector(".burger").classList.toggle("active");
  document.querySelector(".header_menu").classList.toggle("active");
  document.querySelector("body").classList.toggle("lock");
});

/* Маска для ввода мобильного номера  */
var getNumbersValues = function getNumbersValues(input) {
  return input.value.replace(/\D/g, "");
};

var onPhopeInput = function onPhopeInput(e) {
  var input = e.target,
    inputNumbersValue = getNumbersValues(input),
    formattedInputValue = "",
    selectionStart = input.selectionStart;

  if (!inputNumbersValue) {
    return (input.value = "");
  }

  if (input.value.length != selectionStart) {
    if (e.data && /\D/g.test(e.data)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
    //Russian numbers
    if (inputNumbersValue[0] == "9")
      inputNumbersValue = "+" + inputNumbersValue;
    var firstSimbols = inputNumbersValue[0] == "8" ? "8" : "+7";
    formattedInputValue = firstSimbols + " ";
    if (inputNumbersValue.length > 1) {
      formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
    }
  } else {
    // not Russian numbers
    formattedInputValue = "+" + inputNumbersValue;
  }
  input.value = formattedInputValue;
};

var onPhopeDelfirstSimbols = function onPhopeDelfirstSimbols(e) {
  var input = e.target;
  if (e.keyCode == 8 && getNumbersValues(input).length == 1) {
    input.value = "";
  }
};

var onPhopePaste = function onPhopePaste(e) {
  var pasted = e.clipboardData || window.clipboardData,
    input = e.target,
    inputNumbersValue = getNumbersValues(input);

  if (pasted) {
    if (/\D/g.test(pasted.getData("Text"))) {
      input.value = inputNumbersValue;
    }
  }
};

document.querySelector("#Number").addEventListener("input", onPhopeInput);
document.querySelector("#Number").addEventListener("paste", onPhopePaste);
document
  .querySelector("#Number")
  .addEventListener("keydown", onPhopeDelfirstSimbols);

// /* slider  */

var offset = 0; // смещение от левого края первого слайдера
var offset1 = 0; // смещение от левого края второго слайдера
var slider_wraper = document.querySelectorAll(".slider_wraper");

function move(slider, znak) {
  // КАК СОКРАТИТЬ КОД
  if (slider) {
    offset1 += 100 * znak;
    if (offset1 > 0) {
      offset1 = -200;
    } else if (offset1 <= -300) {
      offset1 = 0;
    }
  } else {
    offset += 100 * znak;
    if (offset > 0) {
      offset = -200;
    } else if (offset <= -300) {
      offset = 0;
    }
  }

  slider_wraper[0].style.left = offset + "%";
  slider_wraper[1].style.left = offset1 + "%";
}

document
  .querySelectorAll(".fa-arrow-right")[0]
  .addEventListener("click", function () {
    return move(0, -1);
  });
document
  .querySelectorAll(".fa-arrow-right")[1]
  .addEventListener("click", function () {
    return move(1, -1);
  });
document
  .querySelectorAll(".fa-arrow-left")[0]
  .addEventListener("click", function () {
    return move(0, 1);
  });
document
  .querySelectorAll(".fa-arrow-left")[1]
  .addEventListener("click", function () {
    return move(1, 1);
  });

// /* greet */
var el = document.querySelector(".greet_geometry"); // Получаем наш блок

var scaleRepeat = setInterval(function () {
  el.style.top =
    window.innerHeight * (window.innerHeight > 700 ? 1.55 : 1.85) + "px";
  el.style.left = window.innerWidth / (window.innerWidth > 1500 ? 3 : 4) + "px";

  document.querySelector(".pointer").style.transform = "scale(1)";
  setTimeout(function () {
    document.querySelector(".pointer").style.transform = "scale(1.2)";
  }, 800);
}, 1000);

var isResizing = false;

el.addEventListener("mousedown", mousedown); // При нажатии на блок запускаем функцию mousedown
// el.addEventListener("touchstart", mousedown); // При нажатии на моб. версии на блок запускаем функцию mousedown ДЛЯ МОБИЛЬНОЙ ВЕРСИИ

function mousedown(e) {
  clearInterval(scaleRepeat);
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);
  // window.addEventListener("touchmove", mousemove);  ДЛЯ МОБИЛЬНОЙ ВЕРСИИ
  // window.addEventListener("touchcancel", mouseup); ДЛЯ МОБИЛЬНОЙ ВЕРСИИ

  var prevX = e.clientX;
  var prevY = e.clientY;

  function mousemove(e) {
    if (!isResizing) {
      var newX = prevX - e.clientX;
      var newY = prevY - e.clientY;

      var rect = el.getBoundingClientRect();
      el.style.left = rect.left - newX + window.scrollX + "px";
      el.style.top = rect.top - newY + window.scrollY + "px";

      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    // window.removeEventListener("touchmove", mousemove); ДЛЯ МОБИЛЬНОЙ ВЕРСИИ
    // window.removeEventListener("touchcancel", mouseup); ДЛЯ МОБИЛЬНОЙ ВЕРСИИ
  }
}

var resizers = document.querySelectorAll(".res");
var currentResizer = void 0;

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function _loop() {
    var resizer = _step.value;

    resizer.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      currentResizer = e.target;
      isResizing = true;

      var prevX = e.clientX;
      var prevY = e.clientY;

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        var rect = el.getBoundingClientRect();

        if (currentResizer.classList.contains("se")) {
          el.style.width = rect.width - (prevX - e.clientX) + "px";
          el.style.height = rect.height - (prevY - e.clientY) + "px";
        } else if (currentResizer.classList.contains("sw")) {
          el.style.width = rect.width + (prevX - e.clientX) + "px";
          el.style.height = rect.height - (prevY - e.clientY) + "px";
          el.style.left = rect.left - (prevX - e.clientX) + "px";
        } else if (currentResizer.classList.contains("ne")) {
          el.style.width = rect.width - (prevX - e.clientX) + "px";
          el.style.height = rect.height + (prevY - e.clientY) + "px";
          el.style.top = rect.top + window.scrollY - (prevY - e.clientY) + "px";
        } else {
          el.style.width = rect.width + (prevX - e.clientX) + "px";
          el.style.height = rect.height + (prevY - e.clientY) + "px";
          el.style.top = rect.top + window.scrollY - (prevY - e.clientY) + "px";
          el.style.left = rect.left - (prevX - e.clientX) + "px";
        }

        prevX = e.clientX;
        prevY = e.clientY;
      }

      function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        isResizing = false;
      }
    }
  };

  for (
    var _iterator = resizers[Symbol.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = true
  ) {
    _loop();
  }

  /* request info */
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var formAllEl = document.querySelectorAll("form>*"); //Получаем все блоки формы
var formAllInpt = document.querySelectorAll("form>*>input"); //Получаем все блоки input
var radioBtns = document.querySelectorAll(".form_radio_group>div>input"); ////Получаем ВСЕ радио кнопки
var form_question = document.querySelectorAll(".form_question"); // Все ввод текста
var btn = document.querySelector(".button"); //Получаем кнопку "Дальше"
var visibleForm = 0; // Отслеживает активную форму
var answers = []; //сюда будем складывать ответы

for (var i = 1; i < formAllEl.length - 1; i++) {
  // убираем все блоки кроме первого
  formAllEl[i].style.display = "none";
}

formAllInpt[0].addEventListener("keypress", function (e) {
  alert(12);
  //При начале ввода города
  e.path[0].value = e.path[0].value.replace(/ /g, ""); // Удаляем пробелы...
  if (e.path[0].value.length > 0) {
    //если инпут не пустой\
    btn.classList.remove("disabled"); // появляется кнопка "Далее"
    btn.classList.remove("inputError"); //Добавляем подсказку что данные не введены
    form_question[0].classList.remove("inputError"); //убираем подсказку на инпут что данные не введены
  } else {
    btn.classList.add("disabled"); // появляется disabled
    form_question[0].classList.add("inputError"); //Добавляем подсказку на инпут что данные не введены
  }
});

[formAllInpt[1], formAllInpt[2]].forEach(function (el) {
  return el.addEventListener("keyup", function (e) {
    //При начале ввода номера
    btn.value = "Отправить";
    formAllInpt[1].value = formAllInpt[1].value.replace(/ /g, "");
    if (formAllInpt[2].value.length > 17 && formAllInpt[1].value.length > 0) {
      //если инпут заполнен
      btn.classList.remove("disabled"); // появляется кнопка "Отправить"
      btn.classList.remove("inputError"); //убираем подсказку что данные не введены
      [form_question[1].children[0], form_question[1].children[2]].forEach(
        function (el) {
          return el.classList.remove("inputError");
        }
      ); //убираем подсказку на инпут что данные не введены
      btn.addEventListener("click", sendForm);
    } else {
      btn.classList.add("disabled"); //Убираем кнопку
    }
  });
});

function radioSelection() {
  document
    .querySelectorAll(".form_radio_group")
    [visibleForm ? visibleForm - 1 : visibleForm].addEventListener(
      "click",
      function (e) {
        for (var _i = 0; _i < radioBtns.length; _i++) {
          if (radioBtns[_i].checked) {
            radioBtns[_i].classList.add("active");
            answers[visibleForm] = document.querySelector(
              'label[for="' + radioBtns[_i].id + '"]'
            ).innerHTML;
            // radioBtns[i].setAttribute("checked", "true");
          } else {
            radioBtns[_i].classList.remove("active");
            // radioBtns[i].removeAttribute("checked");
          }
        }
        if (e.path[0].localName == "input") {
          btn.classList.remove("inputError"); //убираем подсказку что данные не введены
          btn.classList.remove("disabled"); //показать кнопку только если мы нажимаем на инпут
        }
      }
    );
}

btn.addEventListener("click", function () {
  //По нажатию на кнопку
  if (btn.classList[1] != "disabled") {
    btn.classList.remove("inputError"); //убираем подсказку что данные не введены
    if (!visibleForm) {
      answers.push(formAllInpt[0].value);
    }
    formAllEl[visibleForm].style.display = "none"; //Прячем текущий блок
    formAllEl[visibleForm + 1].style.display = "block"; //Показываем следующий
    btn.classList.add("disabled"); //Убираем кнопку
    [form_question[1].children[0], form_question[1].children[2]].forEach(
      function (el) {
        return el.classList.remove("inputError");
      }
    ); //убираем подсказку на инпут что данные не введены
    visibleForm++; //шаг итерации
    radioSelection(); //Выбор радиокнопок
  } else {
    btn.classList.add("inputError"); //подсказка что данные не введены
    form_question[0].classList.add("inputError"); //Добавляем подсказку на первый инпут что данные не введены
    [form_question[1].children[0], form_question[1].children[2]].forEach(
      function (el) {
        return el.classList.add("inputError");
      }
    ); //Добавляем подсказку на инпут что данные не введены
  }
});

function sendForm() {
  var TOKEN = "5346001077:AAGfPXnd_wvR4AFN7rPZDoC003mGJJxxUaM";
  var chat_id = "-1001659240261";
  var URI_API = "https://api.telegram.org/bot" + TOKEN + "/sendMessage";
  answers.push(formAllInpt[1].value);
  answers.push(formAllInpt[2].value);
  var message =
    "<b>🔔БОСС</b> У вас новая заявка!!!\n  Название населенного пункта: <b>" +
    answers[0] +
    ".</b>\n  Где планирует делать ремонт: <b>" +
    answers[1] +
    ".</b>\n  Нужен ли дизайн проект: <b>" +
    answers[2] +
    ".</b>\n  общая рлощадь квартиры(примерно): <b>" +
    answers[3] +
    ".</b>\n  Количество комнат: <b>" +
    answers[4] +
    ".</b>\n  Сегмент ремонта: <b>" +
    answers[5] +
    ".</b>\n  Бюджет: <b>" +
    answers[6] +
    ".</b>\n  Когда начать: <b>" +
    answers[7] +
    ".</b>\n  Имя: <b>" +
    answers[8] +
    ".</b>\n  Номер: <b>" +
    answers[9] +
    ".</b>\n  ";
  axios
    .post(URI_API, { chat_id: chat_id, parse_mode: "html", text: message })
    .then(function () {
      document.querySelector(".send").innerHTML =
        "<h3>Cпасибо что выбрали нас! <br/>Мы с вами свяжемся👍</h3>";
    })
    .catch(function (err) {
      document.querySelector(".send").innerHTML =
        "<h3>Что то пошло не так, повторите попытку позже или свяжитесь с нами по указанному номеру телефона</h3>";

      console.warn(err);
    });
}
