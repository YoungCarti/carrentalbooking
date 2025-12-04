import { MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const Hero = () => {
    return (
        <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            {/* Animated Orbs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-40 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
            <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-5" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                            Experience the road <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                                like never before
                            </span>
                        </h1>
                        <p className="text-xl text-blue-200 leading-relaxed max-w-xl">
                            Discover premium vehicles at unbeatable prices. Your journey begins here with luxury, comfort, and convenience.
                        </p>
                        <Button
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-8 py-6 text-lg shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all"
                        >
                            Explore Our Fleet
                        </Button>
                    </div>

                    {/* Right Column - Booking Widget */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-shadow">
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Book Your Ride</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-blue-200 text-sm">Pickup Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                                    <Input
                                        placeholder="Enter city, airport, or address"
                                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-500/10 rounded-xl py-6"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-blue-200 text-sm">Dropoff Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                                    <Input
                                        placeholder="Enter city, airport, or address"
                                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-500/10 rounded-xl py-6"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-blue-200 text-sm">Pickup Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                                        <Input
                                            type="date"
                                            className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-500/10 rounded-xl py-6"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-blue-200 text-sm">Dropoff Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                                        <Input
                                            type="date"
                                            className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-500/10 rounded-xl py-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-blue-200 text-sm">Pickup Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                                    <Input
                                        type="time"
                                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-500/10 rounded-xl py-6"
                                    />
                                </div>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-6 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all mt-4">
                                Search Cars
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">500+</div>
                                <div className="text-sm text-blue-200">Vehicles</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">50+</div>
                                <div className="text-sm text-blue-200">Locations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">24/7</div>
                                <div className="text-sm text-blue-200">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
