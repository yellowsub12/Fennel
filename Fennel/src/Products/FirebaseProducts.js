import {React,useState, useEffect} from 'react'
import './FirebaseProducts.css'
import Button from 'react-bootstrap/Button'
import { db, storage } from '../firebase';
import Prod from './ProductsContext';



function FirebaseProducts()  {


        const [title, setProductName] = useState('');
        const [manufacturer, setProductManufacturerName] = useState('');
        const [price, setProductPrice] = useState(0);
        const [manufacturingPrice, setProductManufacturingPrice] = useState(0);
        const [image, setProductImg] = useState(null);
        const [rating, setProductRating] = useState(0);
        const [descr, setProductDescription] = useState('');
        const [category, setProductCategory] = useState('');



        const [error, setError] = useState('');
    
        const types = ['image/png', 'image/jpeg']; // image types
    
        const productImgHandler = (e) => {
            let selectedFile = e.target.files[0];
            if (selectedFile && types.includes(selectedFile.type)) {
                setProductImg(selectedFile);
                setError('')
            }
            else {
                setProductImg(null);
                setError('Please select a valid image type (jpg or png)');
            }
        }

        const addProduct = (e) => {
            e.preventDefault();
            const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }, err => setError(err.message)
                , () => {
                    storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                        db.collection('Products').add({
                            title: title,
                            manufacturer: manufacturer,
                            price: Number(price),
                            manufacturingPrice: Number(manufacturingPrice),
                            image: url,
                            rating: Number(rating),
                            descr: descr,
                            category: category



                        }).then(() => {
                            setProductName('');
                            setProductManufacturerName('');
                            setProductPrice(0);
                            setProductManufacturingPrice(0);
                            setProductImg('');
                            setProductRating(0);
                            setProductDescription('');
                            setProductCategory('');
                            setError('');
                            document.getElementById('file').value = '';
                        }).catch(err => setError(err.message))
                    })
                })
        }

        return (
            <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={title} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={price} />
                <br />


                <label htmlFor="product-price">Product Manufacturer Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductManufacturingPrice(e.target.value)} value={manufacturingPrice} />
                <br />
                <label htmlFor="product-name">Product Manufacturer</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductManufacturerName(e.target.value)} value={manufacturer} />
                <br />



                <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" required
                    onChange={productImgHandler} />
                <br />
                <label htmlFor="product-description">Product Description</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductDescription(e.target.value)} value={descr} />
                <br />
                <label htmlFor="product-rating">Product Rating</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductRating(e.target.value)} value={rating} />
                <br />
                <label htmlFor="product-category">Product Category</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductCategory(e.target.value)} category={category} />
                <br />
                <Button type="submit">ADD</Button>
                
            </form>
            {error && <span className='error-msg'>{error}</span>}

                
            <Prod/>

        </div>
        );
    
}

export default FirebaseProducts;