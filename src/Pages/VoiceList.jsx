import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import AudioFileList from "../Component/AudioFileList";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../Context/UserProvider";

const VoiceList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { recordings } = useContext(UserContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchContainerRef = useRef(null);

  // Handle search input change
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    setShowSearchResults(searchTerm.length > 0);
  };

  // Filter recordings when search changes
  useEffect(() => {
    if (search.length === 0) {
      setFilteredItems([]);
      setShowSearchResults(false);
      return;
    }

    const searchResults = recordings.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.date.toLowerCase().includes(search) ||
        item.time.toLowerCase().includes(search)
    );

    const limitedResults = searchResults.slice(0, 5);
    setFilteredItems(limitedResults);
  }, [search, recordings]);

  // Handle click outside of search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle selecting a search result
  const handleSelectItem = (item) => {
    setSearch(item.name);
    setShowSearchResults(false);
  };

  return (
    <div className="min-h-screen bg-[#04121C]">
      <div className="flex flex-col items-center justify-start w-full bg-transparent max-w-[1200px] mx-auto relative px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        {/* Header Section with Back Button and Search */}
        <div
          ref={searchContainerRef}
          className="relative flex flex-col items-start justify-between w-full gap-3 mt-4 sm:flex-row sm:items-center sm:mt-6 md:mt-8 lg:mt-10 sm:gap-4"
        >
          {/* Back Button */}
          <FaArrowLeftLong
            className="text-[#F3B204] cursor-pointer text-xl sm:text-2xl md:text-3xl hover:text-[#F3B204]/80 transition-colors flex-shrink-0"
            onClick={() => navigate(-1)}
          />

          {/* Search Container */}
          <div className="relative w-full ">
            <input
              type="search"
              className="w-full pl-4 pr-10 py-2.5 sm:py-3 md:py-3.5 rounded-md bg-[#111E28] text-white placeholder-[#F3B204] focus:outline-none focus:ring-2 focus:ring-[#F3B204] text-sm sm:text-base md:text-lg"
              placeholder="Search recordings..."
              value={search}
              onChange={handleSearch}
              onFocus={() => setShowSearchResults(search.length > 0)}
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F3B204] text-base sm:text-lg md:text-xl pointer-events-none" />

            {/* Search Results Dropdown */}
            {showSearchResults && filteredItems.length > 0 && (
              <div className="absolute z-10 w-full mt-2 overflow-hidden bg-[#04121C] border border-[#F3B204]/30 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredItems.map((item) => (
                  <Link key={item.id} to={`/VoiceDetails/${item.id}`}>
                    <div
                      className="flex items-center p-3 transition-colors cursor-pointer hover:bg-[#111E28] border-b border-[#111E28] last:border-b-0"
                      onClick={() => handleSelectItem(item)}
                    >
                      <h1 className="text-[#F3B204] text-sm sm:text-base md:text-lg truncate">{item.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Audio File List */}
        <AudioFileList recordings={filteredItems.length > 0 ? filteredItems : recordings} />
      </div>
    </div>
  );
};

export default VoiceList;