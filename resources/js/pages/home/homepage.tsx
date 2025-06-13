import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Homepage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [comment, setComment] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date:any) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTimeAgo = (dateString:any) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.floor(diffDays / 365);
        
        if (diffYears > 0) {
            return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
        }
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    const handleCommentSubmit = (e:any) => {
        e.preventDefault();
        console.log('Comment submitted:', comment);
        setComment('');
    };

    const similarAnime = [
        {
            id: 1,
            title: 'Spirited Away',
            studio: 'Studio Ghibli',
            image: 'https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
        },
        {
            id: 2,
            title: 'A Silent Voice',
            studio: 'Kyoto Animation',
            image: 'https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_FMjpg_UX1000_.jpg'
        },
        {
            id: 3,
            title: '5 Centimeters per Second',
            studio: 'CoMix Wave Films',
            image: 'https://m.media-amazon.com/images/M/MV5BZmY2NjUzNDQtNTgxNC00M2Q4LTljOWQtMjNjNDBjNWUxNmJlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg'
        },
        {
            id: 4,
            title: 'Weathering With You',
            studio: 'CoMix Wave Films',
            image: 'https://m.media-amazon.com/images/M/MV5BNmE1OWI2ZGItMDUyOS00MmU5LWE0MzUtYTQ0YzA1YTE5MGYxXkEyXkFqcGdeQXVyMDMxOTEwOA@@._V1_.jpg'
        },
        {
            id: 5,
            title: 'Princess Mononoke',
            studio: 'Studio Ghibli',
            image: 'https://m.media-amazon.com/images/M/MV5BNDI4MGEwZDAtZDg0Yy00MjFhLTg1MjctODdmZTMyNTUyNDI3L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg'
        },
        
    ];

    const latestAnime = [
         {
            id: 10,
            title: 'Spirited Away',
            studio: 'Studio Ghibli',
            image: 'https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
        },
        {
            id: 11,
            title: 'Jujutsu Kaisen 0',
            studio: 'MAPPA',
            releaseDate: '2021-12-24',
            image: 'https://m.media-amazon.com/images/M/MV5BNjY2NmEwOWYtZWViMS00NGI1LWIzMWQtZTBkMGZiNzUxMjkzXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg'
        },
        {
            id: 12,
            title: 'Belle',
            studio: 'Studio Chizu',
            releaseDate: '2021-07-16',
            image: 'https://m.media-amazon.com/images/M/MV5BNjE2NzE4NDktNzlkNy00YzgxLWE3NjAtYWI4ZGZkMWUwYWZkXkEyXkFqcGdeQXVyMTI2MzY1MjM1._V1_.jpg'
        },
        {
            id: 13,
            title: 'Akira',
            studio: 'Akira Committee',
            releaseDate: '1988-07-16',
            image: 'https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRhMjI2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
        },
        {
            id: 14,
            title: 'Ghost in the Shell',
            studio: 'Production I.G',
            releaseDate: '1995-11-18',
            image: 'https://m.media-amazon.com/images/M/MV5BNzQxOTVjMGMtNDdhYy00ZWFmLWIwMmItZTBiNGY2NjRmNjk4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg'
        },
      
    ];
   
    const featuredAnime = {
        title: 'Your Name',
        description: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?',
        japaneseTitle: '君の名は (Kimi no Na wa)',
        type: 'Movie (1h 46min)',
        studio: 'CoMix Wave Films',
        releaseDate: '2016-08-26',
        genre: 'Drama, Romance, Supernatural',
        rating: '8.9',
        image: 'https://wallpapercave.com/wp/wp8963675.jpg'
    };

    return (
        <>
            <Head title="Homepage - AnimeRevu" />
            
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
                            color: 'white', 
                            textDecoration: 'none', 
                            fontSize: '14px', 
                            fontWeight: '500',
                            transition: 'color 0.2s'
                        }}>
                            Favorite
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

                {/* Hero Section */}
                <div style={{
                    position: 'relative',
                    height: '500px',
                    backgroundImage: `url('${featuredAnime.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to right, rgba(30, 26, 43, 0.9), rgba(30, 26, 43, 0.3), transparent)',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            padding: '32px',
                            maxWidth: '500px',
                            color: 'white'
                        }}>
                            <h1 style={{
                                fontSize: '48px',
                                fontWeight: 'bold',
                                marginBottom: '16px',
                                lineHeight: '1.2'
                            }}>
                                {featuredAnime.title}
                            </h1>
                            
                            <p style={{
                                fontSize: '16px',
                                color: '#D1D5DB',
                                marginBottom: '24px',
                                lineHeight: '1.5'
                            }}>
                                {featuredAnime.description}
                            </p>
                            
                            <div style={{
                                marginBottom: '24px',
                                fontSize: '12px',
                                color: '#9CA3AF',
                                lineHeight: '1.6'
                            }}>
                                <p>Japanese Title: {featuredAnime.japaneseTitle}</p>
                                <p>Type: {featuredAnime.type}</p>
                                <p>Studios: {featuredAnime.studio}</p>
                                <p>Date aired: {featuredAnime.releaseDate} ({getTimeAgo(featuredAnime.releaseDate)})</p>
                                <p>Genre: {featuredAnime.genre}</p>
                            </div>
                            
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Rating</div>
                                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    {featuredAnime.rating}/10 ★★★★★
                                </div>
                            </div>
                            
                            <div>
                                <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px' }}>Share</div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button style={{
                                        width: '32px',
                                        height: '32px',
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
                                        width: '32px',
                                        height: '32px',
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
                                        width: '32px',
                                        height: '32px',
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: '32px' }}>
                    {/* Combined Comment & Similar Anime Section */}
                    <div style={{ marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Comment & Similar Anime</h2>
                        <div style={{ borderBottom: '1px solid #374151', marginBottom: '24px' }}></div>
                        
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px'
                        }}>
                            {similarAnime.map((anime) => (
                                <div key={anime.id} style={{
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}>
                                    <img 
                                        src={anime.image} 
                                        alt={anime.title} 
                                        style={{
                                            width: '100%',
                                            height: '280px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{
                                        padding: '12px',
                                        backgroundColor: '#2A2438'
                                    }}>
                                        <h3 style={{ 
                                            fontSize: '14px', 
                                            fontWeight: '500',
                                            marginBottom: '4px'
                                        }}>
                                            {anime.title}
                                        </h3>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#9CA3AF' 
                                        }}>
                                            {anime.studio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Latest Section */}
                    <div style={{ marginBottom: '48px' }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            marginBottom: '24px' 
                        }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Latest</h2>
                            <a href="#" style={{ 
                                fontSize: '12px', 
                                color: '#8B5CF6', 
                                textDecoration: 'none' 
                            }}>
                                View All »
                            </a>
                        </div>
                        
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px'
                        }}>
                            {latestAnime.map((anime) => (
                                <div key={anime.id} style={{
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}>
                                    <img 
                                        src={anime.image} 
                                        alt={anime.title} 
                                        style={{
                                            width: '100%',
                                            height: '280px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{
                                        padding: '12px',
                                        backgroundColor: '#2A2438'
                                    }}>
                                        <h3 style={{ 
                                            fontSize: '14px', 
                                            fontWeight: '500',
                                            marginBottom: '4px'
                                        }}>
                                            {anime.title}
                                        </h3>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#9CA3AF',
                                            marginBottom: '2px'
                                        }}>
                                            {anime.studio}
                                        </p>
                                        {anime.releaseDate && (
                                            <p style={{ 
                                                fontSize: '12px', 
                                                color: '#6B7280' 
                                            }}>
                                                {new Date(anime.releaseDate).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    year: 'numeric' 
                                                })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Current Time Section */}
                    <div style={{
                        marginBottom: '48px',
                        padding: '24px',
                        backgroundColor: '#2A2438',
                        borderRadius: '8px'
                    }}>
                        <h2 style={{ 
                            fontSize: '18px', 
                            fontWeight: '600', 
                            marginBottom: '12px' 
                        }}>
                            Current Time
                        </h2>
                        <p style={{ 
                            fontSize: '14px', 
                            color: '#D1D5DB',
                            marginBottom: '8px'
                        }}>
                            {formatDate(currentTime)}
                        </p>
                        <p style={{ 
                            fontSize: '12px', 
                            color: '#9CA3AF' 
                        }}>
                            Your Name was released {getTimeAgo('2016-08-26')}
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
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
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
                                <li style={{ marginBottom: '8px' }}>
                                    <a href="#" style={{ 
                                        color: '#9CA3AF', 
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}>
                                        Privacy Policy
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
                                <li style={{ marginBottom: '8px' }}>
                                    <a href="#" style={{ 
                                        color: '#9CA3AF', 
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}>
                                        Feedback
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
