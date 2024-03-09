export default function Loading() {
  return (
    <div className="absolute left-0 top-0 z-40 flex h-dvh w-full items-center justify-center bg-white">
      <div className="z-50 flex h-20 w-20 flex-col items-center gap-5">
        <span className="daisy-loading daisy-loading-spinner daisy-loading-lg text-accent" />
        <p>Loading</p>
      </div>
    </div>
  );
}
