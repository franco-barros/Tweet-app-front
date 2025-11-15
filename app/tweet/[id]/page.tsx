import { Tweet } from "../../../components/ui/tweet";
import { fakeTweets, fakeReplies } from "@/lib/fakeTweets";

export default async function TweetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Desestructurar params correctamente
  const { id } = await params;

  const tweet = fakeTweets.find((t) => t.id === id);
  const replies = fakeReplies[id] ?? [];

  if (!tweet) return <p className="p-6">Tweet no encontrado</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Tweet data={tweet} />

      <div className="border-t pt-4 space-y-4">
        {replies.map((r) => (
          <Tweet key={r.id} data={r} />
        ))}
      </div>
    </div>
  );
}
