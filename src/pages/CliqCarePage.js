
import React from 'react';
import './CliqCarePage.css';
import { Link } from 'react-router-dom';
import { topicList } from '../data/helpTopics.js';

export default function CliqCarePage() {
  return (
    <div className="cliqcare-container">
      <aside className="cliqcare-sidebar">
        <h3>All Help Topics</h3>
        <ul>
          {topicList.map((topic, index) => (
            <li key={index}>
              <span className="icon">{topic.icon}</span>
              <div>
                <Link to={`/cliqcare/topic/${encodeURIComponent(topic.title)}`} className="topic-link">
                  <strong>{topic.title}</strong>
                </Link>
                <div className="desc">{topic.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="cliqcare-content">
        <section className="welcome-section">
          <div className="welcome-text">
            <h2>CLiQ Care</h2>
            <p>Your one stop solution center. We are happy to help you.</p>
          </div>
          <img
            src="https://www.tatacliq.com/src/account/components/img/cliqCare.svg"
            alt="Support Agent"
            className="support-img"
          />
        </section>

        <section className="no-orders-section">
          <img
            src="https://www.tatacliq.com/src/account/components/img/onOrder.svg"
            alt="No Orders"
            className="no-order-img"
          />
          <h3>You have no recent orders</h3>
          <p>You don't have any orders with us recently.<br />
             You can go to home page to view more items or else.</p>
          <Link to="/" className="start-shopping-btn">START SHOPPING</Link>
        </section>
      </main>
    </div>
  );
}







