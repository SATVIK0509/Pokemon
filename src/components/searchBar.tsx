interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <div className="mb-10">
      <input
        className="search-bar ml-10 mt-10 p-2 border border-gray-400 rounded"
        type="text"
        placeholder="Search Pokemon Here "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
