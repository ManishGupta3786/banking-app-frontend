import React from 'react';
import './Home.css';
const Home = () => {
  return (
    <div class="home-container">
        <header>
            <h1>Welcome to My Bank</h1>
        </header>
        <section class="mission">
            <h2>Our Mission</h2>
            <p>We aim to empower our customers with the tools and knowledge they need to achieve financial success. Whether you're looking to save for the future, invest wisely, or manage your day-to-day finances, we're here to help you every step of the way.</p>
        </section>
        <section class="services">
            <h2>Our Services</h2>
            <ul>
                <li><strong>Personal Banking</strong>: Simplify your finances with our range of personal banking products, including checking and savings accounts, credit cards, and personal loans.</li>
                <li><strong>Business Banking</strong>: Grow your business with our tailored solutions, from business checking accounts to merchant services and business loans.</li>
                <li><strong>Wealth Management</strong>: Our expert advisors provide personalized investment strategies to help you build and protect your wealth.</li>
                <li><strong>Online & Mobile Banking</strong>: Manage your finances anytime, anywhere with our cutting-edge online and mobile banking platforms.</li>
            </ul>
        </section>
        <section class="why-choose">
            <h2>Why Choose [Bank Name]?</h2>
            <ul>
                <li><strong>Security</strong>: We prioritize the safety of your financial information with advanced security measures and fraud protection.</li>
                <li><strong>Customer Service</strong>: Our dedicated customer service team is available 24/7 to assist you with any questions or concerns.</li>
                <li><strong>Innovation</strong>: We continually invest in technology to bring you the most convenient and efficient banking solutions.</li>
            </ul>
        </section>
        <section class="join-us">
            <h2>Join Us Today</h2>
            <p>Experience the difference of a bank that puts you first. Open an account with [Bank Name] today and take the first step towards a brighter financial future.</p>
        </section>
    </div>
  )
}

export default Home