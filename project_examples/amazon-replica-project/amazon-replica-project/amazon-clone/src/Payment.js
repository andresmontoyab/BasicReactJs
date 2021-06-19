import React from 'react'
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue} from './StateProvider'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const Payment = () => {
    const [{ basket, user}, dispatch] = useStateValue();
    const stripe = useStripe();

    const handleSubmit = e => {

    }

    const handleChange = e => {

    }
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'> {basket?.length} items</Link>)
                </h1>
                {/* Deliviery Addre */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p> {user?.email}</p>
                        <p> 13 React Lane</p>
                        <p> California</p>
                    </div>
                </div>
                
                {/* Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        { basket.map(item => (
                             <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                         />     
                        ))}
                    </div>
                    
                </div>
                {/* Payment Method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                        </form>
                        {/* Stripe magic will go here */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
