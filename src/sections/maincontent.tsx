"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsCard {
  id: number;
  author: string;
  date: string;
  title: string;
  image: string;
  article: string;
}

interface StatItem {
  number: string;
  label: string;
  description: string;
}

const MainContent: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsCard | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  // Sample data from the HTML file
  const newsCards: NewsCard[] = [
    {
      id: 1,
      author: 'Author Name',
      date: '2024 оны 1-р сарын 15',
      title: 'sain garaa go',
      image: 'https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/583334535_1251025820404755_1221325711039351983_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YXe9ejA1t90Q7kNvwEbfFnF&_nc_oc=Adl-5DwQ1wIx2DFrTokiyz_DA199RVmoPLHtf-qGn8wiv6SX09GcFDM-PwxDyTIw0o8&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=RxoyjRkpubrsLrifA0W0ZQ&oh=00_AfgFDUOVHvXWDRG9FyrOHwwgZcmgwucTJo5PtIU3zbYbkA&oe=6931CFA5',
      article: 'This is the full article content. You can replace this text with your actual article. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      author: 'Author Name',
      date: '2024 оны 1-р сарын 15',
      title: 'sain garaa go',
      image: 'https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/583334535_1251025820404755_1221325711039351983_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YXe9ejA1t90Q7kNvwEbfFnF&_nc_oc=Adl-5DwQ1wIx2DFrTokiyz_DA199RVmoPLHtf-qGn8wiv6SX09GcFDM-PwxDyTIw0o8&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=RxoyjRkpubrsLrifA0W0ZQ&oh=00_AfgFDUOVHvXWDRG9FyrOHwwgZcmgwucTJo5PtIU3zbYbkA&oe=6931CFA5',
      article: 'This is the full article content. You can replace this text with your actual article. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 3,
      author: 'Author Name',
      date: '2024 оны 1-р сарын 15',
      title: 'sain garaa go',
      image: 'https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/583334535_1251025820404755_1221325711039351983_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YXe9ejA1t90Q7kNvwEbfFnF&_nc_oc=Adl-5DwQ1wIx2DFrTokiyz_DA199RVmoPLHtf-qGn8wiv6SX09GcFDM-PwxDyTIw0o8&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=RxoyjRkpubrsLrifA0W0ZQ&oh=00_AfgFDUOVHvXWDRG9FyrOHwwgZcmgwucTJo5PtIU3zbYbkA&oe=6931CFA5',
      article: 'This is the full article content. You can replace this text with your actual article. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 4,
      author: 'Author Name',
      date: '2024 оны 1-р сарын 15',
      title: 'sain garaa go',
      image: 'https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/583334535_1251025820404755_1221325711039351983_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YXe9ejA1t90Q7kNvwEbfFnF&_nc_oc=Adl-5DwQ1wIx2DFrTokiyz_DA199RVmoPLHtf-qGn8wiv6SX09GcFDM-PwxDyTIw0o8&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=RxoyjRkpubrsLrifA0W0ZQ&oh=00_AfgFDUOVHvXWDRG9FyrOHwwgZcmgwucTJo5PtIU3zbYbkA&oe=6931CFA5',
      article: 'This is the full article content. You can replace this text with your actual article. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 5,
      author: 'Author Name',
      date: '2024 оны 1-р сарын 15',
      title: 'sain garaa go',
      image: 'https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/583334535_1251025820404755_1221325711039351983_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YXe9ejA1t90Q7kNvwEbfFnF&_nc_oc=Adl-5DwQ1wIx2DFrTokiyz_DA199RVmoPLHtf-qGn8wiv6SX09GcFDM-PwxDyTIw0o8&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=RxoyjRkpubrsLrifA0W0ZQ&oh=00_AfgFDUOVHvXWDRG9FyrOHwwgZcmgwucTJo5PtIU3zbYbkA&oe=6931CFA5',
      article: 'This is the full article content. You can replace this text with your actual article. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 6,
      author: 'Author Name',
      date: '2024 оны 1-р сарын 15',
      title: 'sain garaa go',
      image: 'https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/583334535_1251025820404755_1221325711039351983_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YXe9ejA1t90Q7kNvwEbfFnF&_nc_oc=Adl-5DwQ1wIx2DFrTokiyz_DA199RVmoPLHtf-qGn8wiv6SX09GcFDM-PwxDyTIw0o8&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=RxoyjRkpubrsLrifA0W0ZQ&oh=00_AfgFDUOVHvXWDRG9FyrOHwwgZcmgwucTJo5PtIU3zbYbkA&oe=6931CFA5',
      article: 'This is the full article content. You can replace this text with your actual article. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  const stats: StatItem[] = [
    {
      number: '900',
      label: 'СУРАЛЦАГЧ',
      description: 'НИЙТ СУРАЛЦАГЧИД'
    },
    {
      number: '67',
      label: 'БАГШ',
      description: 'ПРОФЕССОР БАГШ НАР'
    },
    {
      number: '20',
      label: 'КЛУБ',
      description: 'БОЛОМЖИТ КЛУБҮҮД'
    }
  ];

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardId = Number(entry.target.getAttribute('data-card-id'));
          setVisibleCards(prev => new Set([...prev, cardId]));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const cardElements = document.querySelectorAll('[data-card-id]');
    cardElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  const openModal = (article: NewsCard) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedArticle(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="center-content">
          <Image
            src="/LogoNoBG.png"
            width={180}
            height={180}
            alt="11th School Logo"
            className="logo-image"
          />
          <div className="text-content">
            <h1>11-р сургуульд тавтай морил</h1>
            <p>Таны амжилтын аялал эндээс эхэлнэ</p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <div className="news-section">
        <div className="news-grid">
          {newsCards.map((card, index) => (
            <div
              key={card.id}
              data-card-id={card.id}
              className={`news-card ${visibleCards.has(card.id) ? 'fade-in' : ''}`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              onClick={() => openModal(card)}
            >
              <div className="news-card-header">
                <span className="written-by">Бичсэн Автор</span>
                <span className="date">{card.date}</span>
              </div>
              <div
                className="news-card-photo"
                style={{ backgroundImage: `url('${card.image}')` }}
              />
              <div className="news-card-content">
                <p>{card.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses/Training Section */}
      <div className="courses-section">
        <div className="courses-container">
          <div className="courses-center">
            <h2 className="courses-title">Сургалт</h2>
          </div>
          <div className="courses-branches">
            <div className="course-branch">
              <div className="branch-line"></div>
              <Link href="/course#clubs" className="branch-box course-link">
                <h3>Секц, дугуйлан</h3>
                <p>Боломжит клубүүд</p>
              </Link>
            </div>
            <div className="course-branch">
              <div className="branch-line"></div>
              <Link href="/course#calendar" className="branch-box course-link">
                <h3>Календар</h3>
                <p>Сургалтын хуваарь</p>
              </Link>
            </div>
            <div className="course-branch">
              <div className="branch-line"></div>
              <Link href="/course#environment" className="branch-box course-link">
                <h3>Сургалтын орчин</h3>
                <p>Хичээлийн байр</p>
              </Link>
            </div>
            <div className="course-branch">
              <div className="branch-line"></div>
              <Link href="/course#rules" className="branch-box course-link">
                <h3>Дүрэм журам</h3>
                <p>Суралцагчдын дүрэм</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="article-modal active">
          <div className="modal-backdrop" onClick={closeModal} />
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="modal-article-header">
              <span className="written-by">
                Бичсэн <span>{selectedArticle.author}</span>
              </span>
              <span className="date">{selectedArticle.date}</span>
            </div>
            <div
              className="modal-article-photo"
              style={{ backgroundImage: `url('${selectedArticle.image}')` }}
            />
            <div className="modal-article-body">
              <h2>{selectedArticle.title}</h2>
              <p>{selectedArticle.article}</p>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        /* Center content section */
        .hero-section {
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: center;
          padding: 100px 40px 40px;
          z-index: 2;
        }

        .center-content {
          text-align: left;
          color: rgba(255, 177, 0, 1);
          display: flex;
          align-items: center;
          gap: 3.5rem;
        }

        .center-content .logo-image {
          filter: drop-shadow(0 0 12px rgba(255, 177, 0, 0.5));
          animation: logoFloat 3s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .center-content .text-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .center-content h1 {
          font-family: 'Montserrat', serif;
          font-size: 3rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          font-weight: 700;
          letter-spacing: 1px;
        }

        .center-content p {
          font-size: 1.2rem;
          margin-bottom: 0;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        /* News section */
        .news-section {
          position: relative;
          padding: 60px 40px 80px;
          max-width: 1400px;
          margin: 0 auto;
          z-index: 1;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 30px;
        }

        .news-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          overflow: visible;
          box-shadow:
            0 0 8px rgba(7, 73, 158, 0.3),
            0 0 12px rgba(255, 177, 0, 0.2),
            0 4px 6px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          transition: transform 0.8s ease, box-shadow 0.3s ease, opacity 0.8s ease;
          opacity: 0.2;
          transform: translateY(30px);
          position: relative;
          border: 6px solid transparent;
          background-clip: padding-box;
          cursor: pointer;
        }

        .news-card::before {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border-radius: 15px;
          background: linear-gradient(135deg, rgba(7, 73, 158, 0.15), rgba(255, 177, 0, 0.1), rgba(7, 73, 158, 0.15), rgba(255, 177, 0, 0.08));
          background-size: 200% 200%;
          z-index: -1;
          animation: gradientShift 3s ease infinite;
          opacity: 1;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .news-card::after {
          content: '';
          position: absolute;
          top: -9px;
          left: -9px;
          right: -9px;
          bottom: -9px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(7, 73, 158, 0.08), rgba(255, 177, 0, 0.05));
          z-index: -2;
          filter: blur(12px);
          opacity: 0.8;
        }

        .news-card.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .news-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 0 12px rgba(7, 73, 158, 0.4),
            0 0 18px rgba(255, 177, 0, 0.3),
            0 8px 12px rgba(0, 0, 0, 0.3);
        }

        .news-card:hover::before {
          opacity: 1;
          filter: none;
        }

        .news-card:hover::after {
          opacity: 1;
          filter: blur(15px);
        }

        .news-card-header {
          padding: 12px 16px;
          background: linear-gradient(135deg, rgba(7, 73, 158, 0.05), rgba(255, 177, 0, 0.02));
          border-bottom: 1px solid rgba(7, 73, 158, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }

        .news-card-header .written-by {
          color: #07499e;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .news-card-header .written-by::before {
          content: '✍️';
          font-size: 0.9rem;
        }

        .news-card-header .date {
          color: rgba(7, 73, 158, 0.8);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .news-card-header .date::before {
          content: '📅';
          font-size: 0.9rem;
        }

        .news-card-photo {
          width: 100%;
          height: 200px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .news-card-content {
          padding: 20px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100px;
          background: linear-gradient(135deg, rgba(7, 73, 158, 0.05), rgba(255, 177, 0, 0.05));
          border-top: 2px solid transparent;
          border-image: linear-gradient(90deg, rgba(7, 73, 158, 0.3), rgba(255, 177, 0, 0.3)) 1;
        }

        .news-card-content p {
          background: linear-gradient(135deg, rgba(7, 73, 158, 0.8), rgba(255, 177, 0, 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 1.4rem;
          text-align: center;
          margin: 0;
          font-weight: 700;
          letter-spacing: 1px;
          text-shadow: 0 0 20px rgba(7, 73, 158, 0.3);
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
          position: relative;
        }

        .news-card-content p::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, rgba(7, 73, 158, 0.6), rgba(255, 177, 0, 0.5));
          border-radius: 2px;
        }

        /* Statistics section */
        .stats-section {
          position: relative;
          padding: 80px 40px;
          max-width: 1400px;
          margin: 0 auto;
          z-index: 1;
          margin-top: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          animation: fadeInUp 1s ease-out;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 177, 0, 0.35);
          border-radius: 12px;
          padding: 28px 20px;
          text-align: center;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
          text-transform: uppercase;
        }

        .stat-number {
          font-size: 2.6rem;
          font-weight: 900;
          letter-spacing: 1.2px;
          color: rgba(255, 177, 0, 1);
          text-shadow: 0 0 12px rgba(255, 177, 0, 0.45);
        }

        .stat-label {
          margin-top: 10px;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .stat-description {
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          letter-spacing: 0.8px;
        }

        /* Modal */
        .article-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          overflow-y: auto;
          animation: fadeIn 0.3s ease;
        }

        .article-modal.active {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 1001;
        }

        .modal-content {
          position: relative;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          z-index: 1002;
          box-shadow:
            0 0 30px rgba(7, 73, 158, 0.8),
            0 0 50px rgba(255, 177, 0, 0.6),
            0 20px 60px rgba(0, 0, 0, 0.5);
          border: 6px solid transparent;
          background-clip: padding-box;
          animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          margin: 20px;
        }

        .modal-content::before {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(7, 73, 158, 0.3), rgba(255, 177, 0, 0.2), rgba(7, 73, 158, 0.3), rgba(255, 177, 0, 0.15));
          background-size: 200% 200%;
          z-index: -1;
          animation: gradientShift 3s ease infinite;
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          background: rgba(7, 73, 158, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          z-index: 1003;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .modal-close:hover {
          background: rgba(255, 177, 0, 0.9);
          transform: rotate(90deg) scale(1.1);
        }

        .modal-article-header {
          padding: 20px 30px;
          background: linear-gradient(135deg, rgba(7, 73, 158, 0.1), rgba(255, 177, 0, 0.05));
          border-bottom: 2px solid rgba(7, 73, 158, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.98);
          z-index: 10;
        }

        .modal-article-photo {
          width: 100%;
          height: 400px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .modal-article-body {
          padding: 30px;
        }

        .modal-article-body h2 {
          font-family: 'Montserrat', serif;
          font-size: 2.5rem;
          color: #07499e;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .modal-article-body p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 20px;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.7) translateY(50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Courses Section */
        .courses-section {
          position: relative;
          padding: 100px 40px;
          max-width: 1400px;
          margin: 0 auto;
          z-index: 1;
        }

        .courses-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 500px;
        }

        .courses-center {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .courses-title {
          font-family: 'Montserrat', serif;
          font-size: 3rem;
          font-weight: 700;
          color: rgba(255, 177, 0, 1);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          letter-spacing: 2px;
          position: relative;
        }

        .courses-title::before {
          content: '';
          position: absolute;
          left: -50px;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: rgba(255, 177, 0, 0.3);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: translateY(-50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-50%) scale(1.2);
            opacity: 0.6;
          }
        }

        .courses-branches {
          flex: 2;
          display: flex;
          flex-direction: column;
          gap: 30px;
          padding-left: 60px;
        }

        .course-branch {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }

        .branch-line {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, rgba(255, 177, 0, 0.8), rgba(7, 73, 158, 0.8));
          position: relative;
        }

        .branch-line::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid rgba(255, 177, 0, 0.8);
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }

        .branch-box {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 24px 32px;
          box-shadow:
            0 0 8px rgba(7, 73, 158, 0.3),
            0 0 12px rgba(255, 177, 0, 0.2),
            0 4px 6px rgba(0, 0, 0, 0.2);
          border: 3px solid transparent;
          background-clip: padding-box;
          flex: 1;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .branch-box::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(7, 73, 158, 0.3), rgba(255, 177, 0, 0.2));
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .branch-box:hover {
          transform: translateX(10px);
          box-shadow:
            0 0 12px rgba(7, 73, 158, 0.4),
            0 0 18px rgba(255, 177, 0, 0.3),
            0 8px 12px rgba(0, 0, 0, 0.3);
        }

        .branch-box:hover::before {
          opacity: 1;
        }

        .branch-box h3 {
          font-family: 'Montserrat', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #07499e;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }

        .branch-box p {
          font-size: 1rem;
          color: rgba(7, 73, 158, 0.8);
          margin: 0;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .courses-container {
            flex-direction: column;
            gap: 40px;
          }

          .courses-branches {
            padding-left: 0;
            width: 100%;
          }

          .course-branch {
            flex-direction: row;
          }

          .branch-line {
            width: 40px;
          }
        }

        @media (max-width: 768px) {
          .center-content {
            right: 5%;
            left: auto;
            padding: 0 20px;
            flex-direction: column;
            gap: 1.5rem;
            top: 20%;
          }

          .center-content h1 {
            font-size: 2rem;
          }

          .center-content p {
            font-size: 1rem;
          }

          .news-section {
            padding: 40px 20px;
            margin-top: 60vh;
          }

          .news-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stats-section {
            padding: 40px 20px;
          }

          .courses-section {
            padding: 60px 20px;
          }

          .courses-title {
            font-size: 2rem;
          }

          .courses-container {
            min-height: auto;
          }

          .branch-box {
            padding: 20px 24px;
          }

          .branch-box h3 {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 600px) {
          .modal-article-body h2 {
            font-size: 1.8rem;
          }

          .modal-article-photo {
            height: 250px;
          }
        }
      `}</style>
    </>
  );
};

export default MainContent;
