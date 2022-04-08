// Получение элементов для слайдера
let btnClass;
const influencer_text_content = document.querySelectorAll('.influencer-search-text_content');
const influencer_search__slider = document.querySelector('.influencer-search__slider');

async function Render_BTNSlider() {
    // Создание элемента
    influencer_text_content.forEach(element => {
        let spanBtn = document.createElement('span');
        influencer_search__slider.appendChild(spanBtn);

        // Передаём в пустой let наш созданные элементы
        btnClass = document.querySelectorAll('.influencer-search__slider span');
    });
};

// Функция обработчика, получаем элементы чьи индексы больше 0, и скрываем их.
function Unrender_Element() {
    influencer_text_content.forEach((element, index) => {
        if (index > 0) element.style.cssText = 'display: none;';

        // Первому элементу для слайдера даём класс actived
        btnClass[0].classList.add('actived');
    });  
};

// Функция для скрытия всех элементов при нажатии.
function AfterClick_Hidden() {
    influencer_text_content.forEach((element, index) => {
        // Убираем элементы, и убираем им класс actived
        influencer_text_content[index].style.cssText = 'display: none;';
        btnClass[index].classList.remove('actived');
    });
};

// Функция при нажатии на кнопку
async function Event_Element() {
    // Получаем массив с кнопками и перебираем его
    btnClass.forEach((element, index) => {
        // Делаем ивент при нажатии на element [btn_search__slider]
        element.onclick = _ => {
            // Запускаем функцию скрытия всех слайдов
            AfterClick_Hidden();

            // Показываем нужный элемент, но для красоты делаем сначала opacity: 0
            influencer_text_content[index].style.cssText = 'display: block; opacity: 0;';
            window.setTimeout(_ => {
                // Через 150 секунд обновляем значение css для элемента, меняя opacity на 1
                influencer_text_content[index].style.cssText = 'display: block; opacity: 1;';
                // Добавляем класс кнопке, который помечает какой по счёту слайд выбран.
                // Тем самым показывая, какой слайд активный
                btnClass[index].classList.add('actived');
            }, 150);
        };
    });
};

const influencer_search_text = document.querySelector('.influencer-search-text');
let IndexParam;
let SetInterval_Slide;

function AutoSlide_Element() {
    btnClass.forEach((element, index) => {
        if (element.classList.contains('actived')) {
            element.classList.remove('actived');
            influencer_text_content[index].style.cssText = 'display: none';
            IndexParam = index;
        };
    });

    IndexParam++;
    if (IndexParam >= btnClass.length) IndexParam = 0;

    btnClass[IndexParam].classList.add('actived');

    influencer_text_content[IndexParam].style.cssText = 'display: block; opacity: 0;';
    window.setTimeout(_ => {
        // Через 150 секунд обновляем значение css для элемента, меняя opacity на 1
        influencer_text_content[IndexParam].style.cssText = 'display: block; opacity: 1;';
    }, 150);
};

influencer_search_text.onmouseover = _ => {clearTimeout(SetInterval_Slide);};
influencer_search_text.onmouseout = _ => {
    SetInterval_Slide = setInterval(_ => {
        AutoSlide_Element();
    }, 2000);
};

// Делаем ивент при загрузки страницы
window.onload = async _ => {
    // Декларируем функции и запускаем их при загрузки страницы
    // Замечая то, что js может начать работать раньше, чем прогрузиться весь css
    // Если у вас более 1к+ строк в CSS коде
    await Render_BTNSlider();
    Unrender_Element();
    await Event_Element();
    SetInterval_Slide = window.setInterval(_ => {
        AutoSlide_Element();
    }, 2000);
};

