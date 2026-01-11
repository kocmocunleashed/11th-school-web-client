"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

interface Achievement {
  year: number;
  title: string;
  description: string;
  details: string;
}

interface Section {
  id: 'student' | 'school' | 'class' | 'teacher';
  title: string;
  content: string;
  icon: string;
}

const AchievementsPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [showAllAchievements, setShowAllAchievements] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Force proper initialization and fix client-side navigation issues
  useEffect(() => {
    setIsMounted(true);
    setIsClient(true);
    // Reset to current year when component mounts/navigates
    setSelectedYear(2026);

    // Ensure proper scroll position after mount
    setTimeout(() => {
      const element = yearRefs.current[2026];
      if (element && element.scrollIntoView) {
        element.scrollIntoView({ behavior: "instant" as ScrollBehavior, inline: "center", block: "nearest" });
      }
    }, 50);

    // Cleanup function
    return () => {
      setIsMounted(false);
    };
  }, []);

  const years = Array.from({ length: 2026 - 1940 + 1 }, (_, i) => 2026 - i);

  // Sample achievements data
  const achievements: Achievement[] = [
    {
      year: 2026,
      title: "Innovation in Education Award",
      description: "Recognized for outstanding digital transformation",
      details: "Our school received the national Innovation in Education Award for implementing cutting-edge technology in classrooms, including AI-assisted learning and virtual reality experiences."
    },
    {
      year: 2025,
      title: "National Science Fair Champions",
      description: "Students won first place in national competition",
      details: "Three of our students presented their groundbreaking research on renewable energy solutions, earning top honors at the National Science Fair."
    },
    {
      year: 2024,
      title: "100% Graduation Rate",
      description: "All graduating students passed with honors",
      details: "For the first time in school history, we achieved a 100% graduation rate with all students receiving honors distinctions."
    },
    {
      year: 2023,
      title: "International Exchange Program",
      description: "Established partnerships with 15 countries",
      details: "Launched our international exchange program, creating partnerships with schools across 15 countries for cultural and educational exchanges."
    },
    {
      year: 2022,
      title: "Green School Certification",
      description: "Awarded platinum status for sustainability",
      details: "Received platinum-level Green School certification for our comprehensive sustainability initiatives and carbon-neutral campus."
    },
    {
      year: 2021,
      title: "Robotics Championship",
      description: "Won national robotics competition",
      details: "Our robotics team defeated 50+ schools to win the national championship with their innovative autonomous robot design."
    },
    {
      year: 2020,
      title: "Digital Learning Transition",
      description: "Successfully transitioned to online learning",
      details: "Pioneered digital learning platforms during challenging times, ensuring uninterrupted education for all students."
    },
    {
      year: 2019,
      title: "Arts Excellence Award",
      description: "Renowned for outstanding arts program",
      details: "Received the State Arts Excellence Award for our comprehensive visual and performing arts curriculum."
    },
    {
      year: 2018,
      title: "Athletics Championship",
      description: "Won state championship in 5 sports",
      details: "Our athletics program achieved unprecedented success with state championships in basketball, volleyball, track, swimming, and tennis."
    },
    {
      year: 2017,
      title: "STEM Program Launch",
      description: "Established premier STEM curriculum",
      details: "Launched our specialized STEM program with state-of-the-art labs and partnerships with leading technology companies."
    },
    {
      year: 2016,
      title: "Community Service Award",
      description: "Recognized for outstanding community engagement",
      details: "Students logged over 10,000 hours of community service, earning recognition from the Mayor's Office for outstanding civic engagement."
    },
    {
      year: 2015,
      title: "Debate Team National Champions",
      description: "Won Harvard National Debate Tournament",
      details: "Our debate team demonstrated exceptional critical thinking and public speaking skills, winning the prestigious Harvard National Debate Tournament."
    },
    {
      year: 2010,
      title: "Library Modernization",
      description: "Transformed library into digital learning center",
      details: "Completed major renovation of our library, transforming it into a modern digital learning center with advanced research facilities."
    },
    {
      year: 2005,
      title: "Band Performance at Carnegie Hall",
      description: "School band performed at prestigious venue",
      details: "Our award-winning band was invited to perform at Carnegie Hall, showcasing their musical excellence on a world-renowned stage."
    },
    {
      year: 2000,
      title: "Millennium Technology Initiative",
      description: "First school with campus-wide internet",
      details: "Became the first school in the region to implement campus-wide high-speed internet and computer labs in every classroom."
    },
    {
      year: 1995,
      title: "School Expansion",
      description: "Opened new wing with 20 additional classrooms",
      details: "Completed major expansion project adding 20 new classrooms, a gymnasium, and specialized science laboratories."
    },
    {
      year: 1990,
      title: "Environmental Education Program",
      description: "Pioneered environmental awareness curriculum",
      details: "Launched one of the first environmental education programs in the region, focusing on conservation and sustainability."
    },
    {
      year: 1985,
      title: "International Student Enrollment",
      description: "Began accepting international students",
      details: "Opened enrollment to international students, creating a diverse learning environment with cultural exchange opportunities."
    },
    {
      year: 1980,
      title: "Music Program Excellence",
      description: "Established renowned music department",
      details: "Founded our comprehensive music program that would go on to produce award-winning musicians and ensembles."
    },
    {
      year: 1975,
      title: "Title IX Compliance Excellence",
      description: "Recognized for gender equality in sports",
      details: "Achieved full compliance with Title IX regulations, establishing equal athletic opportunities for all students."
    },
    {
      year: 1970,
      title: "Advanced Placement Program",
      description: "First school to offer AP courses in region",
      details: "Became the first school in the region to offer Advanced Placement courses, providing college-level education to high school students."
    },
    {
      year: 1965,
      title: "Civil Rights Leadership",
      description: "Pioneered integration efforts",
      details: "Played a leading role in integration efforts, ensuring equal educational opportunities for all students regardless of background."
    },
    {
      year: 1960,
      title: "Science Lab Modernization",
      description: "Installed state-of-the-art science laboratories",
      details: "Modernized our science facilities with cutting-edge equipment, establishing a strong foundation for STEM education."
    },
    {
      year: 1955,
      title: "School Newspaper Excellence",
      description: "Launched award-winning school newspaper",
      details: "Founded 'The 11th Voice' school newspaper, which won numerous awards for journalism excellence over the decades."
    },
    {
      year: 1950,
      title: "Post-War Expansion",
      description: "Rebuilt and expanded after war years",
      details: "Completed post-war reconstruction and expansion, modernizing facilities to meet growing educational demands."
    },
    {
      year: 1945,
      title: "Victory Garden Program",
      description: "Students supported war effort",
      details: "Students maintained victory gardens and organized bond drives, actively supporting the war effort and community."
    },
    {
      year: 1940,
      title: "School Foundation",
      description: "11th School was established",
      details: "Our school was founded with a commitment to academic excellence and community service, beginning a legacy of outstanding education."
    }
  ];

  const selectedAchievement = achievements.find(a => a.year === selectedYear);

  const scrollToYear = (year: number) => {
    setSelectedYear(year);
    setShowAllAchievements(true);
    const element = yearRefs.current[year];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-primary overflow-x-hidden">
      <div className={styles.separatorLine}></div>

      {!isClient ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-4">Loading...</div>
            <div className="text-lg text-white">Preparing achievements timeline</div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4" key="achievements-content">
          <h1 className={styles.pageTitle}>Our Achievements</h1>
          <p className={styles.pageSubtitle}>
            Explore our rich history of excellence and innovation spanning over 85 years
          </p>
          <div className={styles.mongolianGreeting}>
            <p className={styles.mongolianGreetingMain}>11-р сургуульд тавтай морил</p>
            <p className={styles.mongolianGreetingSub}>Таны амжилтын аялал эндээс эхэлнэ</p>
          </div>

          <p className={styles.scrollHint}>← Scroll through our timeline →</p>

          <div className={styles.timelineContainer}>
            {years.map((year, index) => (
              <div
                key={year}
                ref={(el) => (yearRefs.current[year] = el)}
                className={`${styles.timelineItem} ${selectedYear === year ? styles.active : ''}`}
                onClick={() => scrollToYear(year)}
              >
                {index < years.length - 1 && <div className={styles.timelineLine}></div>}
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineYear}>{year}</div>
                <div className={styles.timelineTitle}>
                  {year === 2026 && "Innovation Award"}
                  {year === 2025 && "Science Fair Win"}
                  {year === 2024 && "100% Graduation"}
                  {year === 2023 && "International Program"}
                  {year === 2022 && "Green School"}
                  {year === 2021 && "Robotics Champs"}
                  {year === 2020 && "Digital Learning"}
                  {year === 2019 && "Arts Excellence"}
                  {year === 2018 && "Sports Champions"}
                  {year === 2015 && "Debate Champions"}
                  {year === 2000 && "Tech Initiative"}
                  {year === 1970 && "AP Program"}
                  {year === 1940 && "School Founded"}
                  {year !== 2026 && year !== 2025 && year !== 2024 && year !== 2023 && year !== 2022 && year !== 2021 && year !== 2020 && year !== 2019 && year !== 2018 && year !== 2015 && year !== 2000 && year !== 1970 && year !== 1940 && `Achievement ${year}`}
                </div>
              </div>
            ))}
        </div>

        <p className={styles.scrollHint}>Click on any year to view achievements</p>

        {showAllAchievements && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            <div className={styles.achievementSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>🎓</span>
                <h3 className={styles.sectionTitle}>Student Achievements</h3>
              </div>
              <div className={styles.sectionContent}>
                {achievements.filter((a) => a.year === selectedYear).length > 0 ? (
                  <ul className={styles.sectionList}>
                    {achievements
                      .filter((a) => a.year === selectedYear)
                      .map((a, idx) => (
                        <li key={idx} className={styles.sectionItem}>{a.title}</li>
                      ))}
                  </ul>
                ) : (
                  <p className={styles.sectionPlaceholder}>No student achievements recorded for {selectedYear}</p>
                )}
              </div>
            </div>

            <div className={styles.achievementSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>🏫</span>
                <h3 className={styles.sectionTitle}>School Events</h3>
              </div>
              <div className={styles.sectionContent}>
                <ul className={styles.sectionList}>
                  <li className={styles.sectionItem}>Annual ceremonies and assemblies</li>
                  <li className={styles.sectionItem}>Community outreach programs</li>
                  <li className={styles.sectionItem}>Facilities improvements</li>
                  <li className={styles.sectionItem}>Special celebrations</li>
                </ul>
              </div>
            </div>

            <div className={styles.achievementSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>👥</span>
                <h3 className={styles.sectionTitle}>Class Activities</h3>
              </div>
              <div className={styles.sectionContent}>
                <ul className={styles.sectionList}>
                  <li className={styles.sectionItem}>Projects and presentations</li>
                  <li className={styles.sectionItem}>Field trips and excursions</li>
                  <li className={styles.sectionItem}>Collaborative learning activities</li>
                  <li className={styles.sectionItem}>Cultural celebrations</li>
                </ul>
              </div>
            </div>

            <div className={styles.achievementSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>👨‍🏫</span>
                <h3 className={styles.sectionTitle}>Teacher Contributions</h3>
              </div>
              <div className={styles.sectionContent}>
                <ul className={styles.sectionList}>
                  <li className={styles.sectionItem}>Professional development</li>
                  <li className={styles.sectionItem}>Curriculum innovations</li>
                  <li className={styles.sectionItem}>Extracurricular programs</li>
                  <li className={styles.sectionItem}>Individual student support</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {!showAllAchievements && (
          <div className={styles.achievementDetail}>
            <div className={styles.achievementYear}>{selectedYear}</div>
            <h2 className={styles.achievementTitle}>Achievement {selectedYear}</h2>
            <p className={styles.achievementDescription}>
              Celebrating excellence and dedication throughout {selectedYear}
            </p>
            <div className={styles.achievementDetails}>
              <p>
                Our school continued its tradition of academic excellence, community service, and innovation in {selectedYear}.
                Students and faculty worked together to create memorable learning experiences and achieve remarkable milestones
                that contributed to our legacy of educational leadership.
              </p>
              <p style={{ marginTop: '20px' }}>
                Through dedication to our core values of knowledge, integrity, and excellence, we maintained our reputation
                as one of the premier educational institutions in the region.
              </p>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default AchievementsPage;
