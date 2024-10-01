import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/payments')
            .then(res => setPayments(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Payment History</h2>
            <ul>
                {payments.map(payment => (
                    <li key={payment._id}>
                        {payment.userId.name} - {payment.courseId.name} - ${payment.amount} - {new Date(payment.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentHistory;
