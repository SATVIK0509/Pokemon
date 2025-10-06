export default function ShimmerUI() {
  const arr = Array.from({ length: 20 }, (_, idx) => {
    return idx + 1;
  });

  return (
    <div className="shimmer-container flex flex-wrap gap-6 p-2 ml-2 mr-2 mt-4">
      {arr.map((num) => (
        <div
          className="card  h-72 w-72 p-3 border  bg-emerald-50 shadow-md rounded-xl"
          key={num + 1}
        ></div>
      ))}
    </div>
  );
}
