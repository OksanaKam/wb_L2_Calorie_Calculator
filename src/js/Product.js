import React, { useState, useEffect } from 'react';
import '../assets/styles/Product.css';
import Header from './Header';
import { SORTING_OPTIONS } from '../utils/constants';

function Product({ products, setProducts }) {
  const [product, setProduct] = useState('');
  const [calorie, setCalorie] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [dropdown, setDropdown] = useState(0);
  const [open, setOpen] = useState(false);
  const [lessCalorie, setLessCalorie] = useState(false);
  const [moreCalorie, setMoreCalorie] = useState(false);
  const [lessCalorieShow, setLessCalorieShow] = useState([]);
  const [moreCalorieShow, setMoreCalorieShow] = useState([]);

  useEffect(() => {
    if (lessCalorie) {
      const filteredProducts =  products.sort((a,b) => {
        return a.calorie - b.calorie;
      });
      console.log(filteredProducts);
      setLessCalorieShow(filteredProducts);
    }
  }, [products, setLessCalorieShow, lessCalorie]);

  useEffect(() => {
    if (moreCalorie) {
      const filteredProducts =  products.sort((a,b) => {
        return b.calorie - a.calorie;
      });
      console.log(filteredProducts);
      setMoreCalorieShow(filteredProducts);
    }
  }, [products, setMoreCalorieShow, moreCalorie]);

  function handleAddProductClick() {
    setIsShown(!isShown);
  }

  function handleProductChange(e) {
    setProduct(e.target.value);
  };

  function handleCalorieChange(e) {
    setCalorie(e.target.value);
  };

  function addProduct() {
    if (!product || !calorie) return;
    const newProduct = {
      id: products.length + 1,
      product,
      calorie,
    };
    setProducts([...products, newProduct]);
    setProduct('');
    setCalorie('');
  };

  function removeProduct(id) {
    const deleteProduct = products.filter((item) => {
      return item.id !== id;
    });

    setProducts(deleteProduct);
  }

  function removeProducts() {
    localStorage.removeItem('products');
  }

  const handleOpen = () => {
    setOpen(!open);
  };

  const dropdownListClick = (index) => {
    setDropdown(index);
    if (index === 0) {
      setLessCalorie(false);
      setMoreCalorie(false);
      return;
    }
    if (index === 1) {
      setLessCalorie(true);
      setMoreCalorie(false);
      return;
    }
    if (index === 2) {
      setMoreCalorie(true);
      setLessCalorie(false);
      return;
    }
  };

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      handleOpen();
    }
    handleOpen();
  };

  return (
    <>
      <Header />
      <main className='product'>
        <div className='product__new-product'>
          {!isShown && (
            <button className='product__add-product' type='button' onClick={handleAddProductClick}>
              Добавить продукт
            </button>
          )}
          {isShown && (
            <form className='product__form'>
              <input className='product__input'
                     type='text'
                     id='product'
                     name='product'
                     placeholder='Введите название продукта'
                     value={product}
                     onChange={handleProductChange}
              />
              <input className='product__input'
                     type='text'
                     id='product'
                     name='product'
                     placeholder='Введите калории'
                     value={calorie}
                     onChange={handleCalorieChange}
              />
              <button className='product__add-product' type='button' onClick={addProduct}>
                Добавить
              </button>
            </form>
          )}
        </div>
        <div className='product__list'>
          <h2 className='product__title'>Список продуктов</h2>
          <div className={`showcase__dropdown dropdown `}>
            <button className='dropdown__button'
                    type='button'
                    id='dropdownButton'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    onClick={() => handleOpen()}
            >
              {SORTING_OPTIONS[dropdown].labelName}
              <span className='dropdown__button-icon'></span>
            </button>
            {open ? (
              <ul className={`dropdown__list ${open && 'dropdown_is-open'}`}
                  aria-labelledby='dropdown-list'
                  onClick={(e) => { handleOverlay(e) }}
              >
                {SORTING_OPTIONS.map((item, index) => {
                  return (
                    <li className='dropdown__item'
                        onClick={() => dropdownListClick(index)}
                        key={index}
                        value={item.value}
                    >
                      {item.labelName}
                    </li>
                 );
                })}
              </ul>
            ) : null}
          </div>
          <ul className='product__items'>
            {products.map((item) => {
              return(
                <li className='product__item' key={item.id}>
                  <p className='product__name'>{item.product}</p>
                  <div className='product__item-group'>
                    <p className='product__name'>{`${item.calorie} ккал`}</p>
                    <button className='product__item-delete'
                            type='button'
                            onClick={ () => removeProduct(item.id) }
                    >
                      &#128465;
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
          <button className='product__remove-button' type='button' onClick={removeProducts}>
            Удалить весь список
          </button>
        </div>
      </main>
    </>
  );
}

export default Product;
