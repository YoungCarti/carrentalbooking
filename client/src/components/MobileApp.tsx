
import { Smartphone, MapPin, Clock, Star, CreditCard, Download } from 'lucide-react';
import { Button } from './ui/button';

const MobileApp = () => {
    const features = [
        { icon: MapPin, text: 'Track your rental in real-time' },
        { icon: Clock, text: 'Quick and easy booking' },
        { icon: Star, text: 'Exclusive app-only deals' },
        { icon: CreditCard, text: 'Secure payment options' }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-6">
                            <Smartphone className="w-4 h-4" />
                            <span className="text-sm font-medium">Download Our App</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-6">
                            Enjoy every mile with <br />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                adorable companionship
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            Download our mobile app for a seamless car rental experience. Book, manage, and track your rentals all in one place.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/30 flex-shrink-0">
                                        <feature.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-gray-900 text-white rounded-xl px-6 py-6 flex items-center gap-3 hover:bg-gray-800 hover:scale-105 transition-all">
                                <Download className="w-6 h-6" />
                                <div className="text-left">
                                    <div className="text-[10px] uppercase tracking-wider">Download on the</div>
                                    <div className="text-sm font-bold">App Store</div>
                                </div>
                            </Button>
                            <Button className="bg-gray-900 text-white rounded-xl px-6 py-6 flex items-center gap-3 hover:bg-gray-800 hover:scale-105 transition-all">
                                <Download className="w-6 h-6" />
                                <div className="text-left">
                                    <div className="text-[10px] uppercase tracking-wider">Get it on</div>
                                    <div className="text-sm font-bold">Google Play</div>
                                </div>
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-indigo-600/30 rounded-full blur-3xl -z-10" />

                        <div className="relative z-10 w-full max-w-sm mx-auto aspect-[9/19] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800">
                            <div className="h-full w-full bg-white rounded-[2.5rem] overflow-hidden relative">
                                {/* Status Bar */}
                                <div className="absolute top-0 left-0 right-0 h-12 bg-white z-20 flex justify-between items-center px-6">
                                    <span className="text-xs font-bold">9:41</span>
                                    <div className="flex gap-1">
                                        <div className="w-4 h-4 bg-gray-900 rounded-full opacity-20" />
                                        <div className="w-4 h-4 bg-gray-900 rounded-full opacity-20" />
                                    </div>
                                </div>

                                {/* App Content Mockup */}
                                <div className="pt-12 pb-6 px-6 h-full bg-gray-50 flex flex-col">
                                    <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/20" />
                                    <div className="space-y-4 flex-1">
                                        <div className="h-24 bg-white rounded-xl shadow-sm" />
                                        <div className="h-24 bg-white rounded-xl shadow-sm" />
                                        <div className="h-24 bg-white rounded-xl shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileApp;
