import React, { useEffect, useState } from 'react';
import '../assets/styles/Diet.css';
import Header from './Header';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Diet({ products, setProducts }) {
  const [productItem, setProductItem] = useState('');
  const [weight, setWeight] = useState('');
  const [diet, setDiet] = useLocalStorage('diet', []);
  const [dayLimit, setDayLimit] = useLocalStorage('limit', '');
  const [isDayLimit, setIsDayLimit] = useLocalStorage('dayLimit', false);
  const [isShown, setIsShown] = useState(false);
  const [isShownDayLimit, setIsShownDayLimit] = useState(false);
  const [total, setTotal] = useState('');

  const overrun = dayLimit - total;
  console.log(overrun);

  useEffect(() => {
    const sortedProducts = products.sort((a,b) => (a.product > b.product ? 1 : -1));
    setProducts(sortedProducts);
    setDiet(diet);
  }, []);

  useEffect(() => {
    if (diet) {
      dietCalculate();
      setDiet(diet)
    }
  }, [diet]);

  function handleAddLimitClick() {
    setIsShownDayLimit(!isShownDayLimit);
  }

  function handleAddProductClick() {
    setIsShown(!isShown);
  }

  function handleProductItemChange(e) {
    setProductItem(e.target.value);
  };

  function handleWeightChange(e) {
    setWeight(e.target.value);
  };

  function handleDayLimitChange(e) {
    setDayLimit(e.target.value);
  };

  function handleLimitSubmit(e) {
    e.preventDefault();
    setDayLimit(dayLimit)
    setIsDayLimit(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!productItem || !weight) return;

    const product = products.find((item) => item.product === productItem);
    const existent = diet.find((item) => item.product === productItem);

    if (existent) {
      existent.weight += +weight;
      localStorage.setItem('diet', JSON.stringify(diet));
      setProductItem('');
      setWeight('');
    } else {
      product.weight = +weight;
      setDiet([...diet, product]);
      setProductItem('');
      setWeight('');
    }
  }

  function dietCalculate() {
    let calories = 0;
    for (let item of diet) {
      calories += Math.round((item.calorie * item.weight) / 100);
    }

    setTotal(calories);
  }

  function removeProduct(id) {
    const deleteProduct = diet.filter((item) => {
      return item.id !== id;
    });

    setDiet(deleteProduct);
  }

  return (
    <>
      <Header />
      <main className='diet'>
        <div className='diet__product'>
          {!isShownDayLimit && !isDayLimit && (
            <button className='diet__add-product' type='button' onClick={handleAddLimitClick}>
              Введите дневной лимит калорий
            </button>
          )}
          {isShownDayLimit && !isDayLimit && (
            <form className='product__form'>
              <input className='diet__input'
                     type='text'
                     id='limit'
                     name='limit'
                     placeholder='Введите дневной лимит калорий'
                     value={dayLimit}
                     onChange={handleDayLimitChange}
              />
              <button className='product__add-product' type='button' onClick={handleLimitSubmit}>
                Добавить
              </button>
            </form>
          )}
          {isDayLimit && (
            <>
              <p className='diet__total'>{`Дневной лимит калорий - ${dayLimit}`}</p>
              {total > dayLimit && (
                <p className='diet__total'>{`Дневной лимит превышен на ${overrun}`}</p>
              )}
            </>
          )}
          {!isShown && (
            <button className='diet__add-product' type='button' onClick={handleAddProductClick}>
              Укажите продукт
            </button>
          )}
          {isShown && (
            <form className='product__form'>
              <select className='diet__input'
                      name='product-select'
                      id='product-select'
                      onChange={handleProductItemChange}
              >
                <option value="">Выберите продукт</option>
                {products.map((item) => {
                  return (
                    <option key={item.id} value={item.product}>
                      {item.product}
                    </option>
                  );
                })}
              </select>
              <input className='diet__input'
                     type='text'
                     id='weight'
                     name='weight'
                     placeholder='Введите вес продукта'
                     value={weight}
                     onChange={handleWeightChange}
              />
              <button className='diet__add-product' type='button' onClick={handleSubmit}>
                Добавить
              </button>
            </form>
          )}
          <div className='diet__chart'>

          </div>
        </div>
        <div className='diet__products'>
          <h2 className='diet__total'>{`Всего калорий за день - ${total}`}</h2>
          <ul className='diet__items'>
            {diet.map((item) => {
              return(
                <li className='diet__item' key={item.id}>
                  <p className='diet__name'>{item.product}</p>
                  <div className='diet__item-group'>
                    <p className='diet__name'>{`${(item.calorie * item.weight) / 100} ккал`}</p>
                    <button className='diet__item-delete'
                          type='button'
                          onClick={ () => removeProduct(item.id) }
                    >
                      &#128465;
                    </button>
                  </div>
                </li>
              )
            })
            }
          </ul>
        </div>
      </main>
    </>
  );
}

export default Diet;
