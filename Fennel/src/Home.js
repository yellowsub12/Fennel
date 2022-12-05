import React, { useState,useEffect} from 'react'
import "./Home.css";
import Product from './Product';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import CategoryProducts from './FennelCategory/CategoryProducts';
import { db } from './firebase'



function Home() {
  
  const handleAuthentication = () => {
      if (user) {
          auth.signOut();
      }
  }
  const [{ basket, user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
    const [Products, setProducts] = useState([]);
    const [sortedData, setSortedData] = useState([])
    const [sort, setSort] = useState(false);
    const handleReset = () => {
        setSort(false)
    }
    const handleChange = (e) => {
      const sortedData = [];
      setSort(true)
      const subscriber = db
      .collection("Products")
      .where('category', '==', `${e.target.value}`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          sortedData.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setSortedData(sortedData)
        setLoading(false);
      });
      return () => subscriber();
  };

  useEffect(() => {
    const getProductsFromFirebase = [];
    const subscriber = db
      .collection("Products")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getProductsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setProducts(getProductsFromFirebase);
        setLoading(false);
      });
  
      

    // return cleanup function
    return () => subscriber();
  }, [loading]); // empty dependencies array => useEffect only called once

  if (loading) {
    return <h1>loading firebase data...</h1>;
  }

  return (
    <div className="home" data-testid="home">
      
      <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light" >
      <img src="/imgs/background-chair.png"/>


    </div>
    <div>
    {!sort && ( <div class="row-cols-1 card_row">
                    <div class="row rowz">
                    {Products.map(item=>(
                    <CategoryProducts
                    id= {item.id}
                    title= {item.title}
                    image= {item.image}
                    price= {item.price}
                    manufacturer = {item.manufacturer}
                    manufacturingPrice = {item.manufacturingPrice}
                    category = {item.category}
                    rating= {item.rating}
                    descr={item.descr}
    />
    ))}
                
                        </div>
                    </div>)  }
                    {sort && ( <div class="col-md-19 card_row">
                    <div class="row rowz">
                    {sortedData.map(item=>(
                    <CategoryProducts
                    id= {item.id}
                    title= {item.title}
                    image= {item.image}
                    price= {item.price}
                    manufacturer = {item.manufacturer}
                    manufacturingPrice = {item.manufacturingPrice}
                    category = {item.category}
                    rating= {item.rating}
                    descr={item.descr}
    />
    ))}
    </div>
                    </div>)  } 

    </div>

    </div>
  )
}

export default Home