'use strict';

document.querySelector(".slider-title").innerText = document.getElementsByClassName('slider-item')[0].attributes[2].value;

function multiItemSlider (wrapper,item,title,buttonControls) {
  const sliderWrapper = document.querySelector(wrapper),
        sliderItems = document.querySelectorAll(item), 
        sliderTitle = document.querySelector(title),
        sliderControls = document.querySelectorAll(buttonControls);
  let positionLeftItem,itemsNumber,transform;
  positionLeftItem = itemsNumber = transform = 0;

  let wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width), // ширина обёртки
      itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width), // ширина одного элемента    
       // значение трансформации .slider-wrapper
      step = itemWidth / wrapperWidth * 100, // величина шага (для трансформации)
      items = []; // массив элементов
      
    // наполнение массива items
    sliderItems.forEach(function (item, index) {
      items.push({ item: item, position: index, transform: 0 });
    });

    let position = {
      getItemMin: function () {
        let indexItem = 0;
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

        if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = `translateX(${items[nextItem].transform}%)`;
        }

        if(itemsNumber > sliderItems.length - 1 && itemsNumber >= 0) {
          itemsNumber = 0;
          sliderTitle.innerText = sliderItems[itemsNumber].attributes[2].value;
        }
        transform -= step;
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
        transform += step;
      }

      sliderWrapper.style.transform = `translateX(${transform}%)`;
    }

    // обработчик события click для кнопок "назад" и "вперед"
    let controlClick = function (e) {
      var direction = this.classList.contains('slider-control-right') ? 'right' : 'left';
      e.preventDefault();
      transformItem(direction);
    };

    let setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обработчика controlClick для события click
      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });
    }

    // инициализация
    setUpListeners();

    return {
      right: function () { // метод right
        transformItem('right');
      },
      left: function () { // метод left
        transformItem('left');
      }
    }

  }

multiItemSlider('.slider-wrapper','.slider-item','.slider-title','.slider-control');