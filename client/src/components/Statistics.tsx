

const Statistics = () => {
    const stats = [
        { value: '10,000+', label: 'Happy Customers' },
        { value: '500+', label: 'Vehicles Available' },
        { value: '50+', label: 'Service Locations' },
        { value: '99%', label: 'Satisfaction Rate' }
    ];

    return (
        <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
            {/* Animated Orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white tracking-tight">Facts in Numbers</h2>
                    <p className="text-blue-200 mt-4 max-w-2xl mx-auto">
                        Trusted by thousands of customers worldwide for exceptional service and reliability
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-blue-200">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
