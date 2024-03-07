
// Слушаем событие отправки форм плагином CF-7

document.addEventListener('wpcf7mailfailed', function (event) {

    flsModules.popup.open('#popup-alert');
    setTimeout(() => {
        flsModules.popup.close('#popup-alert');
    }, 2500);

}, false);




document.addEventListener('wpcf7mailsent', function (event) {


    // Получаем id формы
    let idForm = `#${event.detail.unitTag}`;
    // Код вызова модального окна на сайте или иной сценарий поведения
    // после успешной отправки формы
    flsModules.popup.open('#popup-success');

    // Очистка формы
    document.querySelector(`${idForm} form`).reset();


    // модалка "спасибо"        
    setTimeout(() => {
        flsModules.popup.close('#popup-success');
    }, 2500);

}, false);



// Собираем все формы на сайте
const forms = document.querySelectorAll("form");
if (forms.length > 0) {
    forms.forEach(form => {
        customBtnFunc(form);
    })
}

function customBtnFunc(form) {
    // слушаем на "псевдо" кнопке отправки клик внутри переданной формы
    // Штатные кнопки type=submit скрыты стилями
    // В форме плагина CF-7 вместо штатной кнопки отправки формы 
    // сделать div с классом custom-btn-submit (или своим классом)

    let customBtn = form.querySelector(".custom-btn-submit");
    let currForm = form;

    if (customBtn) {
        customBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const error = formValidate.getErrors(currForm)


            if (error === 0) {
                sentForm(currForm);
            }
        });
    }
}



// Имитация клика по настоящей кнопки отправки формы
function sentForm(form) {
    let trueSubmitBtn = form.querySelector(".submit-hide") ? form.querySelector(".submit-hide") : form.querySelector("[type='submit']");

    if (trueSubmitBtn) {
        trueSubmitBtn.click();

    } else {
        form.submit();

    }
}

// Валидация форм
let formValidate = {
    getErrors(form) {
        let error = 0;
        let formRequiredItems = form.querySelectorAll('.input-required');
        if (formRequiredItems.length) {
            formRequiredItems.forEach(formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
                    error += this.validateInput(formRequiredItem);
                }
            });
        }
        return error;
    },
    validateInput(formRequiredItem) {
        let error = 0;
        if (formRequiredItem.dataset.required === "email") {
            formRequiredItem.value = formRequiredItem.value.replace(" ", "");
            if (this.emailTest(formRequiredItem)) {
                this.addError(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
            }
        } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
            this.addError(formRequiredItem);
            error++;
        } else if (formRequiredItem.type === "tel" && formRequiredItem.value.length < 18) {
            this.addError(formRequiredItem);
            error++;
        } else {
            if (!formRequiredItem.value) {
                this.addError(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
            }
        }
        return error;
    },
    addError(formRequiredItem) {
        formRequiredItem.classList.add('_form-error');
        formRequiredItem.parentElement.classList.add('_form-error');
        let inputError = formRequiredItem.parentElement.querySelector('.form__error');
        if (inputError) formRequiredItem.parentElement.removeChild(inputError);
        if (formRequiredItem.dataset.error) {
            formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        }
    },
    removeError(formRequiredItem) {
        formRequiredItem.classList.remove('_form-error');
        formRequiredItem.parentElement.classList.remove('_form-error');
        if (formRequiredItem.parentElement.querySelector('.form__error')) {
            formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
        }
    },
    formClean(form) {
        form.reset();
        setTimeout(() => {
            let inputs = form.querySelectorAll('input,textarea');
            for (let index = 0; index < inputs.length; index++) {
                const el = inputs[index];
                el.parentElement.classList.remove('_form-focus');
                el.classList.remove('_form-focus');
                formValidate.removeError(el);
            }
            let checkboxes = form.querySelectorAll('.checkbox__input');
            if (checkboxes.length > 0) {
                for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
            }
            if (flsModules.select) {
                let selects = form.querySelectorAll('.select');
                if (selects.length) {
                    for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector('select');
                        flsModules.select.selectBuild(select);
                    }
                }
            }
        }, 0);
    },
    emailTest(formRequiredItem) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
    }
}