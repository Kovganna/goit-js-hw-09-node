import {galleryItems} from './app.js';

// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

const refs = { 
createGalleryList: document.querySelector('.js-gallery'),
createModalImg: document.querySelector('.js-lightbox'),
lightboxImage: document.querySelector('.lightbox__image'),
closeBtn: document.querySelector('[data-action="close-lightbox"]'),
closeLightboxOverlay: document.querySelector('.lightbox__overlay'),
}

refs.createGalleryList.addEventListener('click', onImageClick);
refs.closeBtn.addEventListener('click', closeModalWindow);
refs.closeLightboxOverlay.addEventListener('click', closeModalWindow);

//создание карточки галлереи
const addGalleryEl = galleryItems.map(el => {

    const addGalleryItem = 
    `<li class="gallery__item">
  <a
    class="gallery__link"
    href= ${el.original}
  >
    <img
      class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
    />
  </a>
</li>`;

return addGalleryItem;
})
refs.createGalleryList.insertAdjacentHTML("beforeend", addGalleryEl.join(''));




function onImageClick(event) {
 if(event.target.nodeName === 'IMG') {
     event.preventDefault();
refs.createModalImg.classList.add('is-open');// добавление класса в div
refs.lightboxImage.src = event.target.dataset.source;// получение url большого изображения.
refs.lightboxImage.alt = event.target.alt;
refs.lightboxImage.dataset.index = event.target.dataset.index;
// console.log(event.target.nodeName)
}
else {
  return;
}
window.addEventListener('keydown', keyEscape);
}


function keyEnterClick(event) {
  if (event.code === "Enter" && event.target.nodeName === "A") {
    refs.createModalImg.classList.add("is-open");
    refs.lightboxImage.src = event.target.href;
} 
window.addEventListener('keydown', keyEnterClick)
}

function closeModalWindow() {
    refs.createModalImg.classList.remove('is-open');
    refs.lightboxImage.src ="#";
    refs.lightboxImage.alt ="#";

    // window.removeEventListener('keydown', keyEscape);
 }

function keyEscape(event) {
    if(event.code === "Escape") {
        closeModalWindow()
    }
    
}

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    onArrowLeft();
  }
  if (event.code === "ArrowRight") {
    onArrowRight();
  }
});


