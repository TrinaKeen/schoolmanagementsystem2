'use client';

import { useState } from 'react';
import Header from '../components/header';
import styles from './AddStudentFees.module.css';

export default function AddStudentFeesPage() {
    const [formData, setFormData] = useState({
        name: '',
        idNumber: '',
        expenseType: '',
        amount: '',
        phone: '',
        email: '',
        status: '',
        date: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);
        // API Call to store fees in the database
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>Add New Fee</h1>
                
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
                        <input type="text" name="idNumber" placeholder="ID No *" value={formData.idNumber} onChange={handleChange} required />
                        <input type="text" name="expenseType" placeholder="Please Select Expense Type *" value={formData.expenseType} onChange={handleChange} />
                    </div>

                    <div className={styles.formGroup}>
                        <input type="text" name="amount" placeholder="Amount *" value={formData.amount} onChange={handleChange} required />
                        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                        <input type="email" name="email" placeholder="E-Mail Address" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className={styles.formGroup}>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="">Please Select Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveButton}>Save</button>
                        <button type="reset" className={styles.resetButton} onClick={() => setFormData({})}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
