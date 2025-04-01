import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mockUsers from '../data/mockUsers.json';
import "../styles/global.css";
import { FaSearch, FaTimes, FaPlus } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';

type User = {
  name: string;
  level: string;
  credits: number;
  rating: number;
  skills?: string[];
};

type CurrentCourse = {
  id: number;
  title: string;
  progress: number;
  icon: string;
  lastAccessed: string;
  nextLesson: string;
};

type SavedCourse = {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  icon: string;
  difficulty: string;
};

// Initial mock data
const initialCurrentCourses = [
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

const initialSavedCourses = [
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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Initialize state with localStorage data or defaults
  const [filteredUsers, setFilteredUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem('filteredUsers');
    return stored ? JSON.parse(stored) : mockUsers;
  });
  
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem('allUsers');
    return stored ? JSON.parse(stored) : mockUsers;
  });

  const [filterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'current' | 'saved' | null>(null);
  
  const [currentCourses, setCurrentCourses] = useState(() => {
    const stored = localStorage.getItem('currentCourses');
    return stored ? JSON.parse(stored) : initialCurrentCourses;
  });
  
  const [savedCourses, setSavedCourses] = useState(() => {
    const stored = localStorage.getItem('savedCourses');
    return stored ? JSON.parse(stored) : initialSavedCourses;
  });

  const [userCredits, setUserCredits] = useState(() => {
    return parseInt(localStorage.getItem('userCredits') || '20');
  });

  const [completionPercentage, setCompletionPercentage] = useState(() => {
    return parseInt(localStorage.getItem('completionPercentage') || '50');
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('filteredUsers', JSON.stringify(filteredUsers));
  }, [filteredUsers]);

  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('currentCourses', JSON.stringify(currentCourses));
  }, [currentCourses]);

  useEffect(() => {
    localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
  }, [savedCourses]);

  useEffect(() => {
    localStorage.setItem('userCredits', userCredits.toString());
  }, [userCredits]);

  useEffect(() => {
    localStorage.setItem('completionPercentage', completionPercentage.toString());
  }, [completionPercentage]);

  // Handle click outside of search suggestions and dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      const results = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.level.toLowerCase().includes(searchTerm) ||
        (user.skills && user.skills.some(skill => skill.toLowerCase().includes(searchTerm)))
      );
      setFilteredUsers(results);
      setShowSuggestions(true);
    } else {
      setFilteredUsers(allUsers);
      setShowSuggestions(false);
    }
  };

  const handleFilterByLevel = (level: string) => {
    const results = allUsers.filter(user => user.level === level);
    setFilteredUsers(results);
    setFilterVisible(false);
  };

  const handleFilterByRating = (min: number, max: number) => {
    const results = allUsers.filter(user => user.rating >= min && user.rating < max);
    setFilteredUsers(results);
    setFilterVisible(false);
  };

  const resetFilter = () => {
    setFilteredUsers(allUsers);
    setFilterVisible(false);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleClick = (type: 'current' | 'saved') => {
    setActiveDropdown(prevState => prevState === type ? null : type);
  };

  const handleMessageClick = (user: User) => {
    localStorage.setItem('selectedChatUser', JSON.stringify(user));
    navigate('/messages');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
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
                  {currentCourses.map((course: CurrentCourse) => (
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
                  {savedCourses.map((course: SavedCourse) => (
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
          <span className="credits-label">Credits</span>
          <span className="credits-value">{userCredits}</span>
        </div>

        <div className="completion-display">
          <div className="completion-circle" style={{ '--percentage': completionPercentage } as React.CSSProperties}>
            <span>{completionPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="search-container" ref={searchRef}>
        <div className="search-bar">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search instructors by name, level, or skills..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={resetFilter}>
                <FaTimes />
              </button>
            )}
          </div>
          <button
            className="filter-btn"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <IoFilter className="filter-icon" />
            Filter
          </button>
        </div>

        {showSuggestions && searchQuery && (
          <div className="search-suggestions">
            {filteredUsers.slice(0, 5).map((user, index) => (
              <div key={index} className="suggestion-item">
                <div className="suggestion-avatar">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    alt={user.name}
                  />
                </div>
                <div className="suggestion-info">
                  <div className="suggestion-name">{user.name}</div>
                  <div className="suggestion-details">
                    <span className="suggestion-level">{user.level}</span>
                    <span className="suggestion-rating">⭐ {user.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filterVisible && (
          <div className="filter-dropdown">
            <p>Filter by Level</p>
            <button onClick={() => handleFilterByLevel('Beginner')}>Beginner</button>
            <button onClick={() => handleFilterByLevel('Intermediate')}>
              Intermediate
            </button>
            <button onClick={() => handleFilterByLevel('Advanced')}>Advanced</button>
            <p>Filter by Rating</p>
            <button onClick={() => handleFilterByRating(4, 5)}>4+ Stars</button>
            <button onClick={() => handleFilterByRating(3, 4)}>3+ Stars</button>
            <button className="reset-btn" onClick={resetFilter}>
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <div className="user-list">
        {filteredUsers.map((user, index) => (
          <div key={index} className="user-row">
            <div className="user-info">
              <div className="avatar">{user.name[0]}</div>
              <span className="username">{user.name}</span>
            </div>
            <span>{user.level}</span>
            <span>{user.credits} credits</span>
            <span>{user.rating}/5</span>
            <button className="msg-btn" onClick={() => handleMessageClick(user)}>
              MSG
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;