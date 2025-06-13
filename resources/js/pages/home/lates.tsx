import { useState, useEffect } from 'react';

export default function ExploreAnimePage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedGenre, setSelectedGenre] = useState('All');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const animeList = [
        {
            id: 1,
            title: 'Attack on Titan',
            studio: 'Mappa',
            genre: 'Action',
            rating: '9.0',
            year: '2013',
            image: 'https://m.media-amazon.com/images/M/MV5BNzc5MTczNjQtNDFhNS00MWI3LWE2NzQtMDUzYWQ0NWZkNWE5XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg'
        },
        {
            id: 2,
            title: 'Demon Slayer',
            studio: 'Ufotable',
            genre: 'Action',
            rating: '8.7',
            year: '2019',
            image: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg'
        },
        {
            id: 3,
            title: 'One Piece',
            studio: 'Toei Animation',
            genre: 'Adventure',
            rating: '9.2',
            year: '1999',
            image: 'https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg'
        },
        {
            id: 4,
            title: 'My Hero Academia',
            studio: 'Bones',
            genre: 'Action',
            rating: '8.5',
            year: '2016',
            image: 'https://m.media-amazon.com/images/M/MV5BNTI3YzMxN2EtYWUwZi00Y2Q0LWJjZGYtZmZjMzhlZGM3ZGY2XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg'
        },
        {
            id: 5,
            title: 'Naruto',
            studio: 'Pierrot',
            genre: 'Action',
            rating: '8.4',
            year: '2002',
            image: 'https://m.media-amazon.com/images/M/MV5BZmU5YTU4NjMtOWZjZi00OWE4LWI4YjItNjBjNzNkYjIxYjdkXkEyXkFqcGdeQXVyMTI2MzY1MjM1._V1_.jpg'
        },
        {
            id: 6,
            title: 'Death Note',
            studio: 'Madhouse',
            genre: 'Thriller',
            rating: '9.0',
            year: '2006',
            image: 'https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI0NTVmNzMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg'
        },
        {
            id: 7,
            title: 'Fullmetal Alchemist',
            studio: 'Bones',
            genre: 'Adventure',
            rating: '9.1',
            year: '2009',
            image: 'https://m.media-amazon.com/images/M/MV5BNmE5NzhhNzAtMzFmYi00NzY2LWIzZWMtNGQxNGJiMzNjNzA2XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg'
        },
        {
            id: 8,
            title: 'Dragon Ball Z',
            studio: 'Toei Animation',
            genre: 'Action',
            rating: '8.8',
            year: '1989',
            image: 'https://m.media-amazon.com/images/M/MV5BNGM5MTEyZDItZWNhOS00NzNkLTgwZTAtNzIwOWRkZmM5OTMyXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'
        },
        {
            id: 9,
            title: 'Hunter x Hunter',
            studio: 'Madhouse',
            genre: 'Adventure',
            rating: '9.0',
            year: '2011',
            image: 'https://m.media-amazon.com/images/M/MV5BZjNmZDhkN2QtNDYyZC00YzJmLTg0ODUtN2FjNjhhMzE3ZmUxXkEyXkFqcGdeQXVyNjc2NjA5MTU@._V1_.jpg'
        }
    ];

    const genres = ['All', 'Action', 'Adventure', 'Romance', 'Drama', 'Thriller', 'Comedy'];

    const filteredAnime = selectedGenre === 'All' 
        ? animeList 
        : animeList.filter(anime => anime.genre === selectedGenre);

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#1E1A2B', 
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Header */}
            <header style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid #374151',
                position: 'relative',
                zIndex: 10,
                backgroundColor: '#1E1A2B'
            }}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <a href="#" style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        transition: 'color 0.2s'
                    }}>
                        Home
                    </a>
                    <a href="#" style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        transition: 'color 0.2s'
                    }}>
                        Latest
                    </a>
                    <a href="#" style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        transition: 'color 0.2s'
                    }}>
                        Career
                    </a>
                    <a href="#" style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        transition: 'color 0.2s'
                    }}>
                        Top Anime
                    </a>
                    <a href="#" style={{ 
                        color: '#8B5CF6', 
                        textDecoration: 'none', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        transition: 'color 0.2s'
                    }}>
                        Explore Anime
                    </a>
                </nav>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'white', 
                        padding: '4px',
                        cursor: 'pointer'
                    }}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'white', 
                        padding: '4px',
                        cursor: 'pointer'
                    }}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                    <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'white', 
                        padding: '4px',
                        cursor: 'pointer'
                    }}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Page Title */}
            <div style={{ padding: '32px 32px 0' }}>
                <h1 style={{ 
                    fontSize: '32px', 
                    fontWeight: 'bold', 
                    marginBottom: '8px' 
                }}>
                    Explore Anime
                </h1>
                <p style={{ 
                    fontSize: '16px', 
                    color: '#9CA3AF', 
                    marginBottom: '32px' 
                }}>
                    Discover amazing anime series and movies
                </p>
            </div>

            {/* Filter Section */}
            <div style={{ padding: '0 32px 24px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ 
                        fontSize: '16px', 
                        fontWeight: '500', 
                        marginBottom: '12px' 
                    }}>
                        Filter by Genre
                    </h3>
                    <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        flexWrap: 'wrap' 
                    }}>
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => setSelectedGenre(genre)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    backgroundColor: selectedGenre === genre ? '#8B5CF6' : '#374151',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Anime Grid */}
            <div style={{ padding: '0 32px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px',
                    marginBottom: '48px'
                }}>
                    {filteredAnime.map((anime) => (
                        <div key={anime.id} style={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            backgroundColor: '#2A2438',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-4px)';
                            e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                        }}>
                            <div style={{ position: 'relative' }}>
                                <img 
                                    src={anime.image} 
                                    alt={anime.title} 
                                    style={{
                                        width: '100%',
                                        height: '320px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <span>★</span>
                                    <span>{anime.rating}</span>
                                </div>
                            </div>
                            <div style={{
                                padding: '16px'
                            }}>
                                <h3 style={{ 
                                    fontSize: '16px', 
                                    fontWeight: '600',
                                    marginBottom: '8px',
                                    lineHeight: '1.3'
                                }}>
                                    {anime.title}
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '8px'
                                }}>
                                    <p style={{ 
                                        fontSize: '12px', 
                                        color: '#9CA3AF',
                                        margin: 0
                                    }}>
                                        {anime.studio}
                                    </p>
                                    <p style={{ 
                                        fontSize: '12px', 
                                        color: '#6B7280',
                                        margin: 0
                                    }}>
                                        {anime.year}
                                    </p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        backgroundColor: '#374151',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                        fontWeight: '500',
                                        color: '#D1D5DB'
                                    }}>
                                        {anime.genre}
                                    </span>
                                    <button style={{
                                        background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}>
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div style={{
                margin: '0 32px 48px',
                padding: '24px',
                backgroundColor: '#2A2438',
                borderRadius: '12px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#8B5CF6',
                        marginBottom: '4px'
                    }}>
                        {animeList.length}
                    </h3>
                    <p style={{ 
                        fontSize: '12px', 
                        color: '#9CA3AF',
                        margin: 0
                    }}>
                        Total Anime
                    </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#8B5CF6',
                        marginBottom: '4px'
                    }}>
                        {genres.length - 1}
                    </h3>
                    <p style={{ 
                        fontSize: '12px', 
                        color: '#9CA3AF',
                        margin: 0
                    }}>
                        Genres Available
                    </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#8B5CF6',
                        marginBottom: '4px'
                    }}>
                        8.7
                    </h3>
                    <p style={{ 
                        fontSize: '12px', 
                        color: '#9CA3AF',
                        margin: 0
                    }}>
                        Average Rating
                    </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#8B5CF6',
                        marginBottom: '4px'
                    }}>
                        {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </h3>
                    <p style={{ 
                        fontSize: '12px', 
                        color: '#9CA3AF',
                        margin: 0
                    }}>
                        Last Updated
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                backgroundColor: '#2A2438',
                padding: '32px',
                fontSize: '12px',
                color: '#9CA3AF'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '32px'
                }}>
                    <div>
                        <h3 style={{ 
                            color: 'white', 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            marginBottom: '16px' 
                        }}>
                            Follow us
                        </h3>
                        <div style={{ 
                            display: 'flex', 
                            gap: '8px', 
                            marginBottom: '16px' 
                        }}>
                            <button style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#374151',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </button>
                            <button style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#374151',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </button>
                            <button style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#374151',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"></path>
                                </svg>
                            </button>
                        </div>
                        <p>© {new Date().getFullYear()} AnimeRevu. All rights reserved.</p>
                    </div>
                    
                    <div>
                        <h3 style={{ 
                            color: 'white', 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            marginBottom: '16px' 
                        }}>
                            About us
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '8px' }}>
                                <a href="#" style={{ 
                                    color: '#9CA3AF', 
                                    textDecoration: 'none',
                                    transition: 'color 0.2s'
                                }}>
                                    About AnimeRevu
                                </a>
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                <a href="#" style={{ 
                                    color: '#9CA3AF', 
                                    textDecoration: 'none',
                                    transition: 'color 0.2s'
                                }}>
                                    Contact Us
                                </a>
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                <a href="#" style={{ 
                                    color: '#9CA3AF', 
                                    textDecoration: 'none',
                                    transition: 'color 0.2s'
                                }}>
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 style={{ 
                            color: 'white', 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            marginBottom: '16px' 
                        }}>
                            Need Help?
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '8px' }}>
                                <a href="#" style={{ 
                                    color: '#9CA3AF', 
                                    textDecoration: 'none',
                                    transition: 'color 0.2s'
                                }}>
                                    Help Center
                                </a>
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                <a href="#" style={{ 
                                    color: '#9CA3AF', 
                                    textDecoration: 'none',
                                    transition: 'color 0.2s'
                                }}>
                                    FAQ
                                </a>
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                <a href="#" style={{ 
                                    color: '#9CA3AF', 
                                    textDecoration: 'none',
                                    transition: 'color 0.2s'
                                }}>
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}