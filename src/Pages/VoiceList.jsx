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
      <div className="flex flex-col items-center justify-start w-full max-w-[1440px] mx-auto relative">
        {/* Header Section with Back Button and Search */}
        <div
          ref={searchContainerRef}
          className="relative flex flex-row items-center justify-between w-full px-3 mt-2 space-y-4 md:mt-10 md:items-start md:justify-start md:px-10 sm:space-y-0"
        >
          {/* Back Button */}
          <FaArrowLeftLong
            className="text-[#F3B204] cursor-pointer text-xl md:text-3xl mt-3 md:mt-0"
            onClick={() => navigate(-1)}
          />

          {/* Search Container */}
          <div className="relative w-full md:w-[58%] ml-4 md:ml-[238px]">
            <input
              type="search"
              className="w-full pl-4 pr-10 py-2 sm:py-3 rounded-md bg-[#111E28] text-white placeholder-[#F3B204] focus:outline-none text-sm sm:text-base"
              placeholder="Search recordings..."
              value={search}
              onChange={handleSearch}
              onFocus={() => setShowSearchResults(search.length > 0)}
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F3B204] text-lg sm:text-xl" />

            {/* Search Results Dropdown */}
            {showSearchResults && filteredItems.length > 0 && (
              <div className="absolute z-10 w-full mt-2 overflow-hidden bg-[#04121C] rounded-lg shadow-lg">
                {filteredItems.map((item) => (
                  <Link key={item.id} to={`/VoiceDetails/${item.id}`}>
                    <div
                      className="flex items-center p-3 transition-colors cursor-pointer hover:bg-[#111E28]"
                      onClick={() => handleSelectItem(item)}
                    >
                      <h1 className="text-[#F3B204]">{item.name}</h1>
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