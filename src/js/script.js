const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');

const noteContainer = document.querySelector('.note-container');
const noteModal = document.querySelector('.note-modal-shadow');
const textarea = document.querySelector('#text');
const error = document.querySelector('.note-modal__error');
const categoryList = document.querySelector('.note-modal__category');

const noteTemplate = document.querySelector('.note-template');
const noteAddTemplate = document.querySelector('.note-add-template');

const categories = [
	{ name: 'shopping', color: '#d9a619' },
	{ name: 'work', color: '#19d963' },
	{ name: 'science', color: '#b319d9' },
	{ name: 'other', color: '' },
];

let selectedValue;

const selectValue = () => {
	selectedValue = category.options[category.selectedIndex].text;
};

const fillCategories = () => {
	categories.forEach(item => {
		const category = document.createElement('option');
		category.setAttribute('value', 1);
		category.textContent = item.name;
		categoryList.appendChild(category);
	});
};

fillCategories();

const openNoteModal = () => {
	noteModal.style.display = 'block';
};

const closeNoteModal = () => {
	noteModal.style.display = 'none';
	error.style.visibility = 'hidden';
	textarea.value = '';
	category.selectedIndex = 0;
};

const validateNote = () => {
	if (
		textarea.value !== '' &&
		category.options[category.selectedIndex].value !== '0'
	) {
		createNote();
		error.style.visibility = 'hidden';
	} else {
		error.style.visibility = 'visible';
	}
};

const createNote = () => {
	const notes = localStorage.getItem('notes');
	const notesArr = notes ? JSON.parse(notes) : null;
	const newNotesArr = [];

	if (notesArr) {
		notesArr.forEach(note => {
			newNotesArr.push(note);
		});
	}

	const newNote = {
		category: selectedValue,
		text: textarea.value,
	};

	newNotesArr.push(newNote);
	localStorage.setItem('notes', JSON.stringify(newNotesArr));
	textarea.value = '';
	category.selectedIndex = 0;
	noteModal.style.display = 'none';
	render();
};

const deleteNote = id => {
	const notes = localStorage.getItem('notes');
	const notesArr = notes ? JSON.parse(notes) : null;
	const newNotesArr = [];

	if (notesArr) {
		for (let i = 0; i < notesArr.length; i++) {
			if (i !== id) {
				newNotesArr.push(notesArr[i]);
			}
		}
	}

	localStorage.setItem('notes', JSON.stringify(newNotesArr));
	render();
};

const setColor = category => {
	let color;
	categories.forEach(item => {
		if (category === item.name) {
			color = item.color;
		}
	});
	return color;
};

const renderNotes = () => {
	const notes = localStorage.getItem('notes');
	const notesArr = notes ? JSON.parse(notes) : null;

	noteContainer.textContent = '';

	if (notesArr) {
		for (let i = 0; i < notesArr.length; i++) {
			const newNote = noteTemplate.content.cloneNode(true);
			const category = notesArr[i].category;

			newNote.querySelector('.note').setAttribute('id', i);
			newNote.querySelector('.note__header-title').textContent = category;
			newNote.querySelector('.note__body').textContent = notesArr[i].text;
			newNote
				.querySelector('.delete')
				.setAttribute('onclick', `deleteNote(${i})`);

			newNote.querySelector('.note').style.backgroundColor = setColor(category);

			noteContainer.appendChild(newNote);
		}
	}
};

const renderAdd = () => {
	const template = noteAddTemplate.content.cloneNode(true);
	template.querySelector('.add').setAttribute('onclick', 'openNoteModal()');
	noteContainer.appendChild(template);
};

const render = () => {
	renderNotes();
	renderAdd();
};

render();

cancelBtn.addEventListener('click', closeNoteModal);
saveBtn.addEventListener('click', validateNote);
