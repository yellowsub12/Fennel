import React from 'react'
import "./goods.css"
import {useStateValue} from "./StateProvider"
import Button from 'react-bootstrap/Button'


//add goods Component
function Goods({id, title, image, price, manufacturingPrice, manufacturer, category, rating, descr = ''}) {
    const lowProfit = new Boolean(false);
    const [{basket}, dispatch] = useStateValue();
    const profit = ((manufacturingPrice/price)*100);

    const renderAuthButton = () => {
        if (profit >= 80) {
          return <span class="badge bg-secondary green">Low Profit!</span>;
        } else {
          return <span class="badge bg-secondary">Regular Price</span>;
        }
      }

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                manufacturer: manufacturer,
                manufacturingPrice: manufacturingPrice,
                rating: rating,
                descr: descr
            },
        });
    };



 return (
        <div className='goods'>
            <div className="goods_image_box">
                <img src={image} className="goods_image" alt=""/>
            </div>
            <div className="goods_descr">
                <div className="goods_info">
                    <p className='goods_title'>{title}</p>
                    <p >By {manufacturer}</p>
                    <p className='goods_price'><small>$</small><strong>{price} </strong> {renderAuthButton()}</p>

                    <div className="goods_rating">
                        {Array(rating)
                            .fill()
                            .map((_, i) => (
                                <img src="/imgs/star.png"/>
                            ))}
                    </div>
                </div>
                <br/>
                <div>
                    {descr}
                </div>
                <br/>
                <Button onClick={addToBasket} className="goods_button">Add to Basket</Button>
            </div>
        </div>
    )
    
}

export default Goods