const noteContainer = document.querySelector('.note-container');

const noteTemplate = document.querySelector('.note-template');
const noteAddTemplate = document.querySelector('.note-add-template');

const noteModal = document.querySelector('.note-modal-shadow');
const categoryList = document.querySelector('.note-modal__category');
const textarea = document.querySelector('.note-modal__textarea');
const error = document.querySelector('.note-modal__error');
const saveNoteModal = document.querySelector('.note-modal-save');
const cancelNoteModal = document.querySelector('.note-modal-cancel');

let selectedValue;

const categoriesArr = [
	{ name: 'shopping', color: '#F95860' },
	{ name: 'work', color: '#FFD270' },
	{ name: 'science', color: '#8AED9D' },
	{ name: 'other', color: '#19AAD9' },
];

const selectValue = () => {
	selectedValue = category.options[category.selectedIndex].text;
};

const fillCategories = () => {
	categoriesArr.forEach(item => {
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

const deleteAllNotes = () => {
	localStorage.setItem('notes', null);
	render();
};

const setColor = category => {
	let color;
	categoriesArr.forEach(item => {
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

cancelNoteModal.addEventListener('click', closeNoteModal);
saveNoteModal.addEventListener('click', validateNote);
