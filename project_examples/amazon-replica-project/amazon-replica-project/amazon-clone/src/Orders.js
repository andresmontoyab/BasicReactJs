import React, { useState , useEffect } from 'react'
import { db } from './firebase'
import Order from './Order'
import './Orders.css'
import { useStateValue } from './StateProvider'

const Orders = () => {
    const [{ basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (user){
            console.log(user)

            db
            .collection('users')    
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        console.log('orders >>>', orders)
        } else {
            setOrders([])
        }
    }, [])

    return (
        <div className="orders">
            <h1>Your Orders </h1>
            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order}/>
                ))}
            </div>
        
        </div>
    )
}

export default Orders
