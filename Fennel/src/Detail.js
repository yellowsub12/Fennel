import React, {Component} from 'react';
import "./Home.css";
import "./Detail.css";
import Goods from './Goods';
import Product from "./Product";


//add detail page ,use goods Component
function detail() {
    // read data from sessionStorage and render
    let data = JSON.parse(window.sessionStorage.getItem("goods"));
    const profit = data.price - data.manufacturingPrice;
    const renderAuthButton = () => {
        
          return profit;
        
      }
  return (
    <div className="home">

        <div id="container">



    <div className='home_container'>
    <div className="home_rowz">
        <div className="home_row">
            <Goods
                id={data.id}
                title={data.title}
                image={data.image}
                price={data.price}
                manufacturingPrice={data.manufacturingPrice}
                manufacturer={data.manufacturer}
                category={data.category}
                rating={data.rating}
                descr={data.descr}
                />
        </div>
    </div>
    
    <div className="home_rowz">
        <div className="home_title"><h3>{data.title} Product Details</h3></div>
        <div className="home_row">
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <td>Manufacturer</td>
                        <td align='center'>{data.manufacturer}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td align='center'>{data.price}</td>
                    </tr>
                    <tr>
                        <td>Manufacturing Price</td>
                        <td align='center'>{data.manufacturingPrice}</td>
                    </tr>  
                    <tr>
                        <td>Category</td>
                        <td align='center'>{data.category}</td>
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td align='center'>{data.rating}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    </div>





</div>
    </div>
  )
}

export default detail