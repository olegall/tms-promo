'use strict';

let multiItemSlider = (function () {
  return function (selector) {
    let
      mainElement = document.querySelector(selector), // основный элемент блока
      sliderWrapper = mainElement.querySelector('.slider-wrapper'), // обертка для .slider-item
      sliderItems = mainElement.querySelectorAll('.slider-item'), // элементы (.slider-item)
      sliderTitle = document.querySelector('.slider-title'),
      sliderControls = mainElement.querySelectorAll('.slider-control'), // элементы управления
      wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width), // ширина обёртки
      itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width), // ширина одного элемента    
      positionLeftItem = 0, // позиция левого активного элемента
      itemsNumber = 0,
      _transform = 0, // значение трансформации .slider-wrapper
      step = itemWidth / wrapperWidth * 100, // величина шага (для трансформации)
      items = []; // массив элементов
      
    // наполнение массива items
    sliderItems.forEach(function (item, index) {
      items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getMin: 0,
      getMax: items.length - 1,
    }

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        let indexItem = 0;
          items.forEach(function (item, index) {
            if (item.position > items[indexItem].position) {
              indexItem = index;
            }
          });
        return indexItem;
      },
      getMin: function () {
        return items[position.getItemMin()].position;
      },
      getMax: function () {
        return items[position.getItemMax()].position;
      }
    }

    let transformItem = function (direction) {
      let nextItem;
      if (direction === 'right') {
        positionLeftItem++;
        itemsNumber++;
        if(itemsNumber < sliderItems.length && itemsNumber >= 0) 
          sliderTitle.innerText = sliderItems[itemsNumber].attributes[2].value;

        if(itemsNumber > sliderItems.length - 1 && itemsNumber >= 0) {
          itemsNumber = 0;
          sliderTitle.innerText = sliderItems[itemsNumber].attributes[2].value;
        }

        if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        _transform -= step;
      }

      if (direction === 'left') {
        positionLeftItem--;
        itemsNumber--;
        if(itemsNumber < sliderItems.length && itemsNumber < 0) {
          itemsNumber = sliderItems.length - 1;
          sliderTitle.innerText = sliderItems[itemsNumber].attributes[2].value;
        }

        if(itemsNumber < sliderItems.length && itemsNumber >= 0) {
          sliderTitle.innerText = sliderItems[itemsNumber].attributes[2].value;
        }

        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform = `translateX(${items[nextItem].transform}%)`;
        }
        _transform += step;
      }
      sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
    }

    // обработчик события click для кнопок "назад" и "вперед"
    let controlClick = function (e) {
      var direction = this.classList.contains('slider-control-right') ? 'right' : 'left';
      e.preventDefault();
      transformItem(direction);
    };

    let _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обработчика controlClick для события click
      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });
    }

    // инициализация
    _setUpListeners();

    return {
      right: function () { // метод right
        transformItem('right');
      },
      left: function () { // метод left
        transformItem('left');
      }
    }

  }
}());

let slider = multiItemSlider('.slider-web');
