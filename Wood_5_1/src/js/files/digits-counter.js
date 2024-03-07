export function digitCountersFunc() { 
    // Инициализация
    function digitsCountersInit(digitsCountersItems) { 
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll('[data-digits-counter]');
        if (digitsCounters) { 
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }

    // Функция анимации
    function digitsCountersAnimate(digitsCounter) { 
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 2000;
        const startValue = parseInt(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    let options = {
        threshold: 0.3
    }

    let observer = new IntersectionObserver((entries, observer) => { 
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]');
                if (digitsCountersItems.length > 0) { 
                    digitsCountersInit(digitsCountersItems);
                }
                observer.unobserve(targetElement);
            }
        });
    }, options);

    let sections = document.querySelectorAll('[data-digits-section]');

    if (sections.length > 0) { 
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

digitCountersFunc();