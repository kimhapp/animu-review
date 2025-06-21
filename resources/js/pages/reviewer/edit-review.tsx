import ReviewForm from '@/components/reviewer/review-form';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

interface InitialReviewAnime {
  id: number;
  title: string;
  imageUrl: string;
}

interface InitialReview {
  anime_id: number;
  rating: number;
  content: string;
  anime: InitialReviewAnime;
}

interface EditReviewPageProps {
  initialReview: InitialReview;
}

export default function EditReviewPage({ initialReview }: EditReviewPageProps) {
  const handleCancel = () => {
    router.visit(route('home.index'));
  };

  const handleSave = (data: { anime_id: number; rating: number; reviewText: string }) => {
    router.put(route('review.update', initialReview.anime_id), {
      rating_amount: data.rating,
      content: data.reviewText,
    });
  };

  return (
    <AppLayout>
      <Head title="Edit Review" />
      <div className="min-h-screen w-full p-4 text-white flex flex-col gap-4 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center">EDIT REVIEW</h2>
        <ReviewForm
          animeList={[initialReview.anime]} // limit list to the anime being reviewed
          initialReview={initialReview}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      </div>
    </AppLayout>
  );
}
