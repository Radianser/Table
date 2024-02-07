let but = document.querySelector('#button');
let del = document.querySelectorAll('.delete');
let tds = document.querySelectorAll('td');

//Навешиваем на кнопку "добавить" функцию добавить человека
but.addEventListener('click', addPerson);

//Навешиваем на кнопку "удалить" функцию удалить человека
for (let d of del) {
	d.addEventListener('click', delPerson);
}

//Навешиваем на td-ки, которые не содержат класс 'fake', функцию редактирования ячейки
for (let t of tds) {
	if (t.classList.contains('fake') == false) {
		t.addEventListener('click', editingCell);
	}
}

//Функция редактирования содержимого ячейки
function editingCell() {
	let input = document.createElement('input');
	input.type = 'text';
	input.value = this.innerHTML;
	this.innerHTML = '';
	if (this.classList.contains('word') == true) {
		input.classList.add('input_word');
	} else if (this.classList.contains('digit') == true) {
		input.classList.add('input_digit');
	}
	this.appendChild(input);
	input.focus();
	input.addEventListener('blur', recoveryCell);
	this.removeEventListener('click', editingCell);
}

//Функция восстановления ячейки после редактирования
function recoveryCell() {
	let parent = this.parentElement;
	let elem = this;
	if (this.className == 'input_word') {
		let result = checkNumber(this.value);
		checkCell(this.value, elem, parent, result, true);
	} else if (this.className == 'input_digit') {
		let result = isNaN(this.value);
		checkCell(this.value, elem, parent, result, false);
	}
}

//Функция проверки введенного содержимого на предмет наличия цифр
function checkNumber(str) {
	let flag = true;
	let arr = str.split('');
	for (let q of arr) {
		if (isNaN(q) == false) {
			flag = false;
		}
	}
	return flag;
}

//Функция проверки введенного содержимого на наличие цифр или букв. Если введено то, что не должно было, редактирования не произойдет
function checkCell(value, elem, parent, result, statment) {
	if (result == statment) {
		parent.innerHTML = value;
		parent.addEventListener('click', editingCell);
		elem.style.background = "white";
		elem.style.color = "#333333";
	} else {
		alert('Введите корректные данные!');
		elem.style.background = "red";
		elem.style.color = "white";
	}
}

//Функция добавления нового человека
function addPerson() {
	let name = document.querySelector('#name');
	let family = document.querySelector('#family');
	let salary = document.querySelector('#salary');	

	//Проверка на все недопустимые символы
	if (name.value != '' && family.value != '' && salary.value != '' && isNaN(name.value) == true && isNaN(family.value) == true && isNaN(salary.value) == false && checkNumber(name.value) == true && checkNumber(family.value) == true) {
		let newLine = document.createElement('tr');
		let newName = document.createElement('td');

		//Добавляем ячейку имени
		createCell(name, newName, 'word', newLine);
		
		let newFamily = document.createElement('td');
		//Добавляем ячейку фамилии
		createCell(family, newFamily, 'word', newLine);
		
		let newSalary = document.createElement('td');
		//Добавляем ячейку зарплаты
		createCell(salary, newSalary, 'digit', newLine);

		//Добавляем кнопку удаления
		let newDelete = document.createElement('td');
		newDelete.innerHTML = '<input type="submit" class="delete table_input" value="Удалить">';
		newDelete.style.border = 'none';
		newDelete.classList.add('fake');
		newDelete.addEventListener('click', delPerson);
		newLine.append(newDelete);

		//Добавляем собранную линию ячеек в таблицу
		let tbody = document.querySelector('tbody');
		tbody.append(newLine);
		
		name.style.outline = "0px";
		family.style.outline = "0px";
		salary.style.outline = "0px";
	} else {
		alert('Данные некорректны! Проверьте введенные данные.');
		name.style.outline = "2px solid red";
		family.style.outline = "2px solid red";
		salary.style.outline = "2px solid red";
	}
}

//Функция, которая добавляет соответствующую ячейку в новую линию
function createCell(input, td, className, newLine) {
	td.innerHTML = input.value;
	input.value = '';
	td.addEventListener('click', editingCell);
	td.classList.add(className);
	newLine.append(td);
}

//Функция, которая удаляет человека из таблицы
function delPerson() {
	let parent = this.closest('tr');
	parent.remove();
}
