import React, { useState, useEffect, useRef } from 'react';

const Dashboard: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<'current' | 'saved' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock data for courses
  const currentCourses = [
    {
      id: 1,
      title: "Advanced Web Development",
      progress: 75,
      icon: "💻",
      lastAccessed: "2 days ago",
      nextLesson: "React Hooks Deep Dive"
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      progress: 45,
      icon: "🎨",
      lastAccessed: "1 week ago",
      nextLesson: "Color Theory Basics"
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      progress: 90,
      icon: "📊",
      lastAccessed: "1 day ago",
      nextLesson: "Graph Algorithms"
    }
  ];

  const savedCourses = [
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Dr. Sarah Chen",
      duration: "12 weeks",
      icon: "🤖",
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "Cloud Computing",
      instructor: "James Wilson",
      duration: "8 weeks",
      icon: "☁️",
      difficulty: "Advanced"
    },
    {
      id: 6,
      title: "Mobile App Development",
      instructor: "Maria Garcia",
      duration: "10 weeks",
      icon: "📱",
      difficulty: "Beginner"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = (type: 'current' | 'saved') => {
    console.log('Button clicked:', type);
    setActiveDropdown(prevState => prevState === type ? null : type);
  };

  return (
    <div className="dashboard-container">
      <div className="course-buttons" ref={dropdownRef}>
        <div className="dropdown-container">
          <button 
            className={`course-button current ${activeDropdown === 'current' ? 'active' : ''}`}
            onClick={() => handleClick('current')}
          >
            <span className="button-title">Current Courses</span>
            <div className="course-count">{currentCourses.length}</div>
          </button>
          {activeDropdown === 'current' && (
            <div className="course-dropdown-panel">
              <div className="dropdown-header">
                <span className="dropdown-title">In Progress</span>
                <span className="view-all">View All Courses</span>
              </div>
              <div className="course-list">
                {currentCourses.map(course => (
                  <div key={course.id} className="course-item">
                    <div className="course-icon">{course.icon}</div>
                    <div className="course-info">
                      <div className="course-title">{course.title}</div>
                      <div className="course-meta">
                        <span>Last accessed: {course.lastAccessed}</span>
                        <span className="dot">•</span>
                        <span>Next: {course.nextLesson}</span>
                      </div>
                      <div className="course-progress-bar">
                        <div 
                          className="course-progress-fill" 
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="progress-text">{course.progress}% Complete</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="dropdown-container">
          <button 
            className={`course-button saved ${activeDropdown === 'saved' ? 'active' : ''}`}
            onClick={() => handleClick('saved')}
          >
            <span className="button-title">Saved Courses</span>
            <div className="course-count">{savedCourses.length}</div>
          </button>
          {activeDropdown === 'saved' && (
            <div className="course-dropdown-panel">
              <div className="dropdown-header">
                <span className="dropdown-title">Saved for Later</span>
                <span className="view-all">View All Saved</span>
              </div>
              <div className="course-list">
                {savedCourses.map(course => (
                  <div key={course.id} className="course-item">
                    <div className="course-icon">{course.icon}</div>
                    <div className="course-info">
                      <div className="course-title">{course.title}</div>
                      <div className="course-meta">
                        <span>Instructor: {course.instructor}</span>
                        <span className="dot">•</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="difficulty-badge">{course.difficulty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="credits-display">
        <div className="credits-card">
          <span className="credits-label">Credits:</span>
          <span className="credits-value">20</span>
        </div>
      </div>

      <div className="completion-display">
        <div className="completion-circle">
          50%
        </div>
      </div>

      {/* Rest of the dashboard content */}
      <div className="search-container">
        {/* ... existing search content ... */}
      </div>
    </div>
  );
};

export default Dashboard; 