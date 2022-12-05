import React from 'react'
import "./Product.css"
import {useStateValue} from "./StateProvider"
import Button from 'react-bootstrap/Button';
import Products from './Products';

function Product({id, title, price, image, manufacturer, manufacturingPrice, rating, descr}) {

    const jumpToDetail = () => {
        //save data to session storage，and enter detail page
        window.sessionStorage.setItem("goods", JSON.stringify({
            id: id,
            title: title,
            image: image,
            price: price,
            manufacturer: manufacturer,
            manufacturingPrice:manufacturingPrice,
            rating: rating,
            descr: descr,
        }))
        window.location.href = './detail';
    }
  

  const [{basket}, dispatch] = useStateValue(Products);

  const addToBasket = () => {
      dispatch({
          type: 'ADD_TO_BASKET',
          item: {
              id: id,
              title: title,
              image: image,
              price: price,
              rating: rating,
          },
      });
  };


  return (
<div class="col-md-4 mb-4 card_row" key={id} data-testid="categoryProducts">
                                 <div class="card">
                                 <img onClick={jumpToDetail} src={image} class="card-img-top" alt="..."/>
                                 <div class="card-body">
                                     <h5 class="card-title" onClick={jumpToDetail}>{title}</h5>
                                     <p onClick={jumpToDetail}><strong>${price}</strong></p>
                                     <p class="card-text">{descr}</p>
                                     <div class="rating" onClick={jumpToDetail}>
                                        {Array(rating)
                                        .fill()
                                        .map((_, i) => (
                                            <img src="/imgs/star.png"/>
                                            ))}
                                    </div>
                                     <Button variant="primary" onClick={addToBasket}>Add to Basket</Button>
                                    </div>
                                    </div>
                                    </div>
  )
}


export default Product