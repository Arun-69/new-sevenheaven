import CameraLoader from "@/components/CameraLoader";

// Shown instantly when a story card is clicked, while the story loads.
export default function StoryLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <CameraLoader size={160} />
    </div>
  );
}
