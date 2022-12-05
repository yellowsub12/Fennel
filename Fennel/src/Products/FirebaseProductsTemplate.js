import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {useStateValue} from "../StateProvider"
import Products from '../Products';
import { db, storage } from '../firebase';


function FirebaseProducts({id, title, price, image, manufacturer, manufacturingPrice, category, rating, descr = ''}) {
  
    const [{basket}, dispatch] = useStateValue();
    const [data, setData] = useState();


    const deleteProduct = () => {
        db
            .collection('Products')
            .doc(id)
            .delete()
            .then(() => {
                console.log("Product deleted successfully : " + id);
            }).catch((err) => {
                console.log("An error occured while deleting the product");
                console.log("Error : " + err.message);
            });}

    const jumpToDetail = () => {
        //save data to session storage，and enter detail page
        window.sessionStorage.setItem("goods", JSON.stringify({
            id: id,
            title: title,
            image: image,
            price: price,
            manufacturer: manufacturer,
            manufacturingPrice:manufacturingPrice,
            category: category,
            rating: rating,
            descr: descr,
        }))
        window.location.href = './detail';
    }

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
         <div class="col-md-4 mb-4 card_row" key={id}>
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
                                     <Button variant="danger" onClick={deleteProduct}>Delete</Button>
                                    </div>
                                    </div>
                                    </div>



  )
}

export default FirebaseProducts