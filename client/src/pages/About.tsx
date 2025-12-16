import { Award, Users, Globe, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] pt-32 pb-16 px-6 text-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl font-bold mb-4">About RentWheels</h1>
                    <p className="text-lg text-indigo-100 leading-relaxed">
                        We're on a mission to make car rental simple, affordable, and hassle-free for everyone.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Founded in 2020, RentWheels started with a simple idea: make car rental accessible to everyone. What began as a small fleet has grown into a trusted service with thousands of happy customers.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            We believe that renting a car shouldn't be complicated or expensive. That's why we've built a platform focused on transparency, reliability, and outstanding customer service.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl h-80 shadow-lg flex items-center justify-center">
                        <span className="text-white text-6xl">🚗</span>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section id="mission" className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To provide affordable, reliable, and convenient car rental services that empower people to explore the world at their own pace.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To become the most trusted and customer-friendly car rental platform, known for transparency, quality, and exceptional service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section id="values" className="container mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { icon: Award, title: 'Quality', desc: 'Well-maintained, reliable vehicles' },
                        { icon: Users, title: 'Customer First', desc: 'Your satisfaction is our priority' },
                        { icon: Globe, title: 'Accessibility', desc: 'Fair prices for everyone' },
                        { icon: Zap, title: 'Efficiency', desc: 'Fast, easy booking process' },
                    ].map((value, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                            <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                            <p className="text-gray-600 text-sm">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 mx-6 rounded-2xl my-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to rent your next car?</h2>
                    <p className="text-lg mb-8 text-blue-100">Browse our fleet and find the perfect vehicle for your journey.</p>
                    <Link to="/vehicles">
                        <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold rounded-lg">
                            Browse Cars
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;