'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the student portal or another page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/StudentPortal/StudentApplication'); // Adjust the URL as needed
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [router]);

  return (
    <div className="success-container">
      <h1>Success!</h1>
      <p>Your application has been successfully submitted.</p>
      <p>You will be redirected shortly...</p>
    </div>
  );
}
