
import { Shield, Heart, ThumbsUp, Zap } from 'lucide-react';
import ImageWithFallback from '../figma/ImageWithFallback';

const WhyChooseUs = () => {
    const benefits = [
        {
            icon: Shield,
            title: 'Premium Quality',
            description: 'Top-tier vehicles maintained to the highest standards'
        },
        {
            icon: Heart,
            title: 'Expert Team',
            description: 'Professional staff dedicated to your satisfaction'
        },
        {
            icon: ThumbsUp,
            title: 'Easy Process',
            description: 'Streamlined booking and pickup experience'
        },
        {
            icon: Zap,
            title: 'Instant Confirmation',
            description: 'Get your booking confirmed within minutes'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -z-10 -top-12 -left-12 w-72 h-72 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-3xl opacity-20" />
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574&auto=format&fit=crop"
                                alt="Luxury Car Interior"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-6">Why choose RentWheels</h2>
                        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                            Experience the perfect blend of luxury, convenience, and exceptional service with every rental.
                        </p>

                        <div className="grid gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300">
                                        <benefit.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
