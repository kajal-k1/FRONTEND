

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CliqCarePage.css';
import { topicList, helpQuestions } from '../data/helpTopics.js';

export default function CliqCareTopicPage() {
  const { topic } = useParams();
  const selectedQuestions = helpQuestions[topic] || [];
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="cliqcare-container">
      <aside className="cliqcare-sidebar">
        <h3>All Help Topics</h3>
        <ul>
          {topicList.map((item, index) => (
            <li key={index}>
              <span className="icon">{item.icon}</span>
              <div>
                <Link
                  to={`/cliqcare/topic/${encodeURIComponent(item.title)}`}
                  className={`topic-link ${item.title === topic ? 'active' : ''}`}
                >
                  <strong>{item.title}</strong>
                </Link>
                <div className="desc">{item.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="cliqcare-content">
        <div className="faq-header">
          <h3>All Help Topics</h3>
          <Link to="/cliqcare" className="back-link">
            Go Back to Previous Page
          </Link>
        </div>

        <div className="faq-topic-block">
          <h4>
            <strong>{topic}</strong>{" "}
            <span className="sub">(Browse all help topics related to {topic})</span>
          </h4>

          <ul className="faq-list">
            {selectedQuestions.map((faq, i) => (
              <li key={i} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleAnswer(i)}
                >
                  {faq.question}
                </div>
                {openIndex === i && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}



