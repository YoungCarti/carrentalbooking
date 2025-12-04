import { useState, useRef, useEffect } from 'react';
import { Search, Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
    const [location, setLocation] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    // Debounced Search Effect
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (location.length > 2) {
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=5`
                    );
                    const data = await response.json();
                    setFilteredLocations(data.map((item: any) => item.display_name));
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Error fetching locations:", error);
                    setFilteredLocations([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setFilteredLocations([]);
                setIsLoading(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [location]);

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
        // We don't set showSuggestions(true) here immediately to avoid flashing empty lists
        // It will be set to true when data comes back in the effect
    };

    const handleLocationSelect = (loc: string) => {
        setLocation(loc);
        setShowSuggestions(false);
    };

    return (
        <section className="relative h-[600px] flex items-center justify-center pt-16 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            {/* Background Image Placeholder */}
            {/* Replace the bg-transparent class or the div content with your image */}
            <div className="absolute inset-0 z-0">
                {/* Example: <img src="/your-image.jpg" alt="Background" className="w-full h-full object-cover opacity-40" /> */}
                <div className="absolute inset-0 bg-black/20" /> {/* Overlay for better text visibility */}

                {/* Optional: Animated Orbs for that premium feel if no image is present */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute bottom-40 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
            </div>

            <div className="container mx-auto px-4 relative z-10 w-full max-w-7xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 drop-shadow-lg leading-tight">
                    Find your perfect <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                        rental car
                    </span>
                </h1>

                {/* Search Bar Container */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-2xl shadow-blue-900/20">
                    <div className="bg-slate-900/60 rounded-xl flex flex-col lg:flex-row items-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">

                        {/* Location */}
                        <div className="flex-grow p-4 w-full lg:w-auto hover:bg-white/5 transition-colors rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none relative" ref={wrapperRef}>
                            <div className="flex items-center gap-3">
                                <Search className="w-5 h-5 text-blue-400" />
                                <div className="flex-grow">
                                    <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Pick-up location</label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={handleLocationChange}
                                        onFocus={() => {
                                            if (location.length > 2 && filteredLocations.length > 0) setShowSuggestions(true);
                                        }}
                                        placeholder="Airport, city or station"
                                        className="w-full outline-none bg-transparent text-white placeholder-slate-400 font-medium"
                                    />
                                </div>
                                {isLoading && <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />}
                            </div>

                            {/* Autocomplete Dropdown */}
                            {showSuggestions && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                                    {filteredLocations.length > 0 ? (
                                        filteredLocations.map((loc, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleLocationSelect(loc)}
                                                className="px-4 py-3 hover:bg-white/10 cursor-pointer flex items-center gap-3 text-white transition-colors border-b border-white/5 last:border-0"
                                            >
                                                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                                <span className="truncate text-sm">{loc}</span>
                                            </div>
                                        ))
                                    ) : (
                                        !isLoading && <div className="px-4 py-3 text-gray-400 text-sm">No locations found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Pick-up Date */}
                        <div className="p-4 w-full lg:w-auto lg:min-w-[180px] hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                <div>
                                    <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Pick-up date</label>
                                    <input type="date" className="w-full outline-none bg-transparent text-white font-medium [color-scheme:dark]" />
                                </div>
                            </div>
                        </div>

                        {/* Pick-up Time */}
                        <div className="p-4 w-full lg:w-auto lg:min-w-[140px] hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-blue-400" />
                                <div>
                                    <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Time</label>
                                    <input type="time" className="w-full outline-none bg-transparent text-white font-medium [color-scheme:dark]" defaultValue="10:00" />
                                </div>
                            </div>
                        </div>

                        {/* Drop-off Date */}
                        <div className="p-4 w-full lg:w-auto lg:min-w-[180px] hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                <div>
                                    <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Drop-off date</label>
                                    <input type="date" className="w-full outline-none bg-transparent text-white font-medium [color-scheme:dark]" />
                                </div>
                            </div>
                        </div>

                        {/* Drop-off Time */}
                        <div className="p-4 w-full lg:w-auto lg:min-w-[140px] hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-blue-400" />
                                <div>
                                    <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Time</label>
                                    <input type="time" className="w-full outline-none bg-transparent text-white font-medium [color-scheme:dark]" defaultValue="10:00" />
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="p-2 w-full lg:w-auto">
                            <Button className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg h-full text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
