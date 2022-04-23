class Slider {
    constructor() {
        this.slider = document.querySelector('.influencer-search__slider'),
            this.text = document.querySelector('.influencer-search-text'),
            this.textContent = document.querySelectorAll('.influencer-search-text_content'),
            this.buttons;

        window.onload = this.init();
    };

    init() {
        this.renderButtons();
        this.hideContent();
        this.clickEvent();
        this.idSlideAnim = this.autoSlideAnim();
        
        this.text.onmouseover = _ => clearInterval(this.idSlideAnim);
        this.text.onmouseout = _ => this.idSlideAnim = this.autoSlideAnim();
    };

    renderButtons() {
        this.textContent.forEach(el => {
            const sliderButton = document.createElement('span');
            this.slider.appendChild(sliderButton);

            this.buttons = document.querySelectorAll('.influencer-search__slider span');
        });
    };

    hideContent() {
        this.textContent.forEach((el, index) => {
            index > 0 ? el.style.display = 'none' : false;

            this.buttons[0].classList.add('actived');
        });
    };

    clickEvent() {
        this.buttons.forEach((el, index) => {
            el.onclick = _ => {
                this.clickEventHidden();

                this.textContent[index].style.cssText = `display: block; opacity: 0;`;
                window.setTimeout(_ => {
                    this.textContent[index].style.opacity = 1;
                    el.classList.add('actived');
                }, 150);
            };
        });
    };

    clickEventHidden() {
        this.textContent.forEach((el, index) => {
            this.textContent[index].style.display = 'none';
            this.buttons[index].classList.remove('actived');
        });
    };

    autoSlide() {
        this.newIndex = 0;

        this.buttons.forEach((el, index) => {
            if (el.classList.contains('actived')) {
                el.classList.remove('actived');
                this.textContent[index].style.display = 'none';

                this.newIndex = index;
            };
        });

        this.newIndex++;
        this.newIndex >= this.buttons.length ? this.newIndex = 0 : false;

        this.buttons[this.newIndex].classList.add('actived');
        this.textContent[this.newIndex].style.cssText = 'display: block; opacity: 0;';
        window.setTimeout(_ => this.textContent[this.newIndex].style.opacity = 1, 150);
    };

    autoSlideAnim() {
        return setInterval(this.autoSlide.bind(this), 2000);
    };
};

export default Slider;