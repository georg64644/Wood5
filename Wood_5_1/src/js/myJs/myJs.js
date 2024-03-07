

// Функция маски для телефонов
export function maskPhone () {
    function mask(event) {
        var blank = "+7 (___) ___-__-__";

        var i = 0;
        var val = this.value.replace(/\D/g, "").replace(/[0-8]/, "7").replace(/^9/, "79");

        this.value = blank.replace(/./g, function (char) {
            if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++);

            return i >= val.length ? "" : char;
        });

        if (event.type == "blur") {
            if (this.value.length == 2) this.value = "";
        } else {
            setCursorPosition(this, this.value.length);
        }
    };

    /***/
    function setCursorPosition(elem, pos) {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
            return;
        }

        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
            return;
        }
    }

    var input = document.querySelectorAll('input[type="tel"]');

    input.forEach(function (item) {
        item.addEventListener("input", mask);
        item.addEventListener("focus", mask);
        item.addEventListener("blur", mask);
    });
};
// END Функция маски для телефонов


// Выравнивание высоты блоков
export function heightBlockFunc(elemClass){
    let items = document.querySelectorAll(elemClass);
    let arr = [];
    items.forEach((item) => {
        let itemHeight = item.offsetHeight;
        arr.push(itemHeight);
        return arr;
    });
    let max = Math.max(...arr);
    items.forEach((item) => {
        item.style.minHeight = `${max}px`;
    });
}
// END Выравнивание высоты блоков


// Копирование кода
// Родительскому блоку data-copy-block
// Значение которое копируем data-copied
// Кнопка для копирования data-copy-btn
export function copyCode() {
    let copyBlocks = document.querySelectorAll('[data-copy-block]');

    if (copyBlocks.length > 0) { 
        copyBlocks.forEach((copyBlock) => { 
            let code = copyBlock.querySelector('[data-copied]');
            let copyBtn = copyBlock.querySelector('[data-copy-btn]');

            if (copyBtn) {
                copyBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    if (code.value) {
                        code.select();
                        document.execCommand("copy");
                        copyBtn.classList.add('copied');
                        setTimeout(() => {
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    } else {
                        alert('Данных для копирования не обнаружено');
                    }
                });
            }
        });
    }
}
// END Копирование кода

// функция проставляет id для agree-block__input и его label на странице
// data-agree ставим обертке чекбокса и label
export function chekboxId() {
    let agreeBlocks = document.querySelectorAll('[data-agree]');
    agreeBlocks.forEach((block, i) => {
        let checkboks = block.querySelector('input[type="checkbox"]');
        let label = block.querySelector('label');
        checkboks.setAttribute('id', `checkbox-${i}`);
        label.setAttribute('for', `checkbox-${i}`);
    });
}
//END функция chekboxId() проставляет id для agree-block__input и его label на странице

// Проверяем нажат ли чекбокс
export function checkboxChecking() {
    let forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        let checkbox = form.querySelector('input[type="checkbox"]');
        let btnSubmit = form.querySelector('[type="submit"]');
        if (checkbox) {
            btnSubmit.setAttribute('disabled', 'disabled');
            checkbox.addEventListener('change', () => {
                if (!checkbox.checked) {
                    btnSubmit.setAttribute('disabled', 'disabled');
                } else {
                    btnSubmit.removeAttribute('disabled');
                }
            });
        }

    });
}
// END Проверяем нажат ли чекбокс


// Удаляем лишнее для ссылок на телефон
export function clearLinkPhone() {
    let links = document.querySelectorAll('[data-clear-link]');

    links.forEach((el) => {
        let linkData = el.getAttribute('data-tel');
        let newData;
        if (linkData) {
            newData = linkData.replace(/[()\s-]/g, '');
            newData = `tel:${newData}`;
            el.setAttribute('href', newData);
        }

    });
};
//END Удаляем лишнее для ссылок на телефон