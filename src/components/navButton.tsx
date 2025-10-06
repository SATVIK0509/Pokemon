export default function NavButton({ nav }: { nav: string }) {
  return (
    <button className="p-2 bg-red-300 border border-black cursor-pointer">
      {nav}
    </button>
  );
}
