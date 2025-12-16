import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (formData.name && formData.email && formData.message) {
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] pt-32 pb-16 px-6 text-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg text-indigo-100 leading-relaxed">
                        Have questions? We'd love to hear from you. Get in touch with our team.
                    </p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">Send us a Message</h2>
                        <p className="text-gray-600 text-center mb-12">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>

                        {submitted && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-700 font-medium">✓ Thank you! Your message has been sent successfully.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-lg space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <Input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message *
                                </label>
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us more about your inquiry..."
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards - Help Center */}
            <section id="help" className="container mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Help Center</h2>
                <div className="grid md:grid-cols-4 gap-8 mb-20">
                    {[
                        {
                            icon: Phone,
                            title: 'Phone',
                            content: '+1 (555) 123-4567',
                            subtext: 'Mon-Fri, 9AM-6PM EST',
                        },
                        {
                            icon: Mail,
                            title: 'Email',
                            content: 'support@rentwheels.com',
                            subtext: 'We reply within 24 hours',
                        },
                        {
                            icon: MapPin,
                            title: 'Office',
                            content: '123 Main Street',
                            subtext: 'New York, NY 10001',
                        },
                        {
                            icon: Clock,
                            title: 'Hours',
                            content: '9:00 AM - 6:00 PM',
                            subtext: 'Monday to Friday',
                        },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                            <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-900 font-semibold mb-1">{item.content}</p>
                            <p className="text-gray-600 text-sm">{item.subtext}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="max-w-2xl mx-auto space-y-6">
                        {[
                            {
                                q: 'What payment methods do you accept?',
                                a: 'We accept all major credit cards, debit cards, and digital payment methods for your convenience.',
                            },
                            {
                                q: 'Can I cancel my booking?',
                                a: 'Yes, you can cancel up to 24 hours before your rental start date for a full refund.',
                            },
                            {
                                q: 'Do you offer roadside assistance?',
                                a: 'Absolutely! All our rentals include 24/7 roadside assistance and emergency support.',
                            },
                            {
                                q: 'What documents do I need to rent a car?',
                                a: 'You\'ll need a valid driver\'s license, proof of insurance, and a credit card in your name.',
                            },
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-lg">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;