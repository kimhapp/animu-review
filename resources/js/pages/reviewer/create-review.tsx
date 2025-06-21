import ReviewForm from '@/components/reviewer/review-form';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

type AnimeForForm = { id: number; title: string; imageUrl: string };

interface CreateReviewPageProps {
  animeList: AnimeForForm[];
}

export default function CreateReviewPage({ animeList }: CreateReviewPageProps) {
  const handleCancel = () => {
    router.visit(route('home.index'));
  };

  const handleSave = (data: { anime_id: number; rating: number; reviewText: string }) => {
    router.post(route('review.store'), {
      anime_id: data.anime_id,
      rating_amount: data.rating,
      content: data.reviewText,
    });
  };

  return (
    <AppLayout>
      <Head title="Add Review" />
      <div className="min-h-screen w-full flex justify-center items-start py-8 px-4">
        {/* Inner container limits max width and centers content */}
        <div className="max-w-lg w-full text-white flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">ADD REVIEW</h2>
          <ReviewForm animeList={animeList} onCancel={handleCancel} onSave={handleSave} />
        </div>
      </div>
    </AppLayout>
  );
}
