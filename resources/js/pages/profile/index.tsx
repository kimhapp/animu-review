import { useState, useEffect, useRef } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Anime, ProfilePageProps, ReviewWithAnime } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

export default function ProfilePage({ user: initialUser, favoriteAnime, reviewedAnime, ratingAnime }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'favorites' | 'reviews' | 'rating'>('favorites');

  const [favList, setFavList] = useState<Anime[]>(favoriteAnime.data);
  const [revList, setRevList] = useState<ReviewWithAnime[]>(reviewedAnime.data);
  const [ratingList, setRatingList] = useState<Anime[]>(ratingAnime.data);

  const [favPage, setFavPage] = useState(2);
  const [revPage, setRevPage] = useState(2);
  const [ratingPage, setRatingPage] = useState(2);

  const favHasMore = favoriteAnime.next_page_url !== null;
  const revHasMore = reviewedAnime.next_page_url !== null;
  const ratingHasMore = ratingAnime.next_page_url !== null;

  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const savedData = localStorage.getItem('profileFormData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUser((prev) => ({
        ...prev,
        name: parsed.username ?? prev.name,
        bio: parsed.bio ?? prev.bio,
        imageUrl: parsed.image ?? prev.imageUrl,
        coverImageUrl: parsed.banner ?? prev.coverImageUrl,
        email: parsed.email ?? prev.email,
      }));
      localStorage.removeItem('profileFormData');
    }
  }, []);

  const list: Anime[] =
    activeTab === 'favorites'
      ? favList
      : activeTab === 'reviews'
      ? revList.map((r) => r.anime).filter(Boolean)
      : activeTab === 'rating'
      ? ratingList
      : [];

  const loadMore = async () => {
    if (isLoading) return;
    const bottom = containerRef.current?.getBoundingClientRect().bottom ?? 0;
    if (bottom <= window.innerHeight + 100) {
      setIsLoading(true);
      try {
        if (activeTab === 'favorites' && favHasMore) {
          const res = await fetch(`/profile?page=${favPage}&type=favorites`);
          const json = await res.json();
          setFavList((prev) => [...prev, ...json.favoriteAnime.data]);
          setFavPage((p) => p + 1);
        }
        if (activeTab === 'reviews' && revHasMore) {
          const res = await fetch(`/profile?page=${revPage}&type=reviews`);
          const json = await res.json();
          setRevList((prev) => [...prev, ...json.reviewedAnime.data]);
          setRevPage((p) => p + 1);
        }
        if (activeTab === 'rating' && ratingHasMore) {
          const res = await fetch(`/profile?page=${ratingPage}&type=ratings`);
          const json = await res.json();
          setRatingList((prev) => [...prev, ...json.ratingAnime.data]);
          setRatingPage((p) => p + 1);
        }
      } catch (error) {
        console.error('Failed to load more:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const onScroll = () => loadMore();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeTab, favPage, revPage, ratingPage, isLoading]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-900 text-white px-8 py-12">
        <Head title="My Profile" />

        {/* Cover */}
        <div className="relative w-full h-60 md:h-60 bg-sidebar-primary">
          {user?.coverImageUrl ? (
            <img
              src={
                typeof user.coverImageUrl === 'object' && 'url' in user.coverImageUrl
                  ? (user.coverImageUrl as { url: string }).url
                  : (user.coverImageUrl as string)
              }
              alt="Cover"
              className="object-cover w-full h-full brightness-90"
            />
          ) : (
            <div className="w-full h-full bg-sidebar-primary flex items-center justify-center text-sidebar-accent-foreground">
              No Cover Image
            </div>
          )}
          <Link
            href={route('profile.edit')}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-foreground text-sm px-4 py-2 rounded-full transition"
          >
            Edit Profile
          </Link>
        </div>

        {/* Profile Info */}
        <div className="relative bg-gray-1000 px-4 pt-8 pb-8 max-w-8xl mx-full flex flex-col items-start">
          <div className="-mt-22 mb-4">
            <img
              src={user.imageUrl || '/images/default-avatar.jpg'}
              alt="Profile"
              className="w-30 h-30 md:w-28 md:h-28 rounded-full border-4 border-border bg-sidebar object-cover"
            />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold">{user.name || 'No name'}</h2>
            <p className="mt-1">{user.bio?.trim() !== '' ? user.bio : <span className="text-muted-foreground">No bio</span>}</p>
            <p className="mt-1 text-muted-foreground">0 follower ・ 0 following</p>
            <p className="text-muted-foreground mt-1">Role: {user.role === 'admin' ? 'Admin' : user.role === 'reviewer' ? 'Reviewer' : 'User'}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-4">
          <div className={`flex border border-border rounded-lg bg-card p-1 w-[360px] md:w-[480px]`}>
            <Button onClick={() => setActiveTab('favorites')} className={`flex-1 py-2 mx-1 transition ${activeTab === 'favorites' ? 'text-sidebar-primary font-semibold' : 'text-muted-foreground'} hover:text-sidebar-primary-foreground`}>Favorite</Button>
            <Button onClick={() => setActiveTab('reviews')} className={`flex-1 py-2 mx-1 transition ${activeTab === 'reviews' ? 'text-sidebar-primary font-semibold' : 'text-muted-foreground'} hover:text-sidebar-primary-foreground`}>Review</Button>
            <Button onClick={() => setActiveTab('rating')} className={`flex-1 py-2 mx-1 transition ${activeTab === 'rating' ? 'text-sidebar-primary font-semibold' : 'text-muted-foreground'} hover:text-sidebar-primary-foreground`}>Rating</Button>
          </div>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {list.map((anime) => (
            <div key={anime.id} className="bg-gray-800 p-2 rounded-lg">
              <img src={anime.imageUrl || '/images/default-cover.jpg'} className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-2 font-semibold">{anime.title}</h3>
            </div>
          ))}
        </div>

        {/* Infinite Scroll Trigger */}
        <div ref={containerRef} className="h-10"></div>
      </div>
    </AppLayout>
  );
}
