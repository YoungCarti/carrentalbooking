
import { Shield, Headphones, BadgeDollarSign, Users } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Shield,
            title: 'Fully Insured',
            description: 'All our vehicles come with comprehensive insurance coverage for your peace of mind.'
        },
        {
            icon: Headphones,
            title: '24/7 Support',
            description: 'Our dedicated team is available around the clock to assist you with any queries.'
        },
        {
            icon: BadgeDollarSign,
            title: 'Best Price Guarantee',
            description: 'We offer competitive rates and price match guarantee on all our rentals.'
        },
        {
            icon: Users,
            title: 'Customer Service',
            description: 'Experience exceptional service from booking to return with our professional team.'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Why Choose RentWheels</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the difference with our premium car rental service
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/50 mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-3">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
