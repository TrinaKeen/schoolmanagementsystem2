// Generated using ChatGPT
// Can you generate a Next.js page (/AdminPortal/AddStudentFees) where admins can add student fees?
// Include a form with fields for name, ID number, expense type, amount, phone, email, status, and date.
// Use useState to manage form data and update state on input change.
// Include validation, ensuring that required fields (name, ID number, amount) cannot be empty.
// Have a reset button to clear all form fields.

// OpenAI. (2025). ChatGPT GPT-4o. Accessed and retrieved on March 14, 2025, from https://chat.openai.com

'use client';

import { useState } from 'react'; // Importing React's state management hook
import Header from '../components/header';
import styles from './AddStudentFees.module.css';

// Functional Component for Adding Student Fees
export default function AddStudentFeesPage() {
    const [formData, setFormData] = useState({
        name: '', // Stores student's name
        idNumber: '', // Stores student ID number
        expenseType: '', // Stores the type of expense
        amount: '', // Stores the amount of the fee
        phone: '', // Stores the student's phone number
        email: '', // Stores the student's email address
        status: '', // Stores payment status (Paid/Unpaid)
        date: '' // Stores the due date of the fee
    });

    // Function to handle input changes.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Updates the corresponding field in the form data object
    };

    // Function to handle form submission.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission behavior
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
