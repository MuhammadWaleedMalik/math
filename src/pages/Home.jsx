import React from 'react';

const Home = () => {
  return (
    <div className="font-sans bg-white text-gray-900 max-w-4xl mx-auto p-6">
      {/* Header with Logo */}
      <header className="flex items-center mb-8">
        <img 
          src="/images/logo.jpg" 
          alt="SageMath Logo" 
          className="h-12 mr-4"
        />
        <h1 className="text-2xl font-bold text-[#2d6f9a]">SageMath</h1>
      </header>

      {/* Main Content */}
      <main>
        {/* Introduction Paragraph */}
        <section className="mb-8">
          <p className="text-lg text-gray-800 leading-relaxed">
            <span className="font-bold">SageMath is a free open-source mathematics software system focused under the GPL.</span> It builds on top of many existing open-source packages: NumPy, SciPy, matplotlib, Sympy, Macrim, GAP, FLINT, X and many more. Access their combined power through a common, Python-based language or directly via interfaces or wrappers.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-8 p-4 bg-[#e8f4fc] border-l-4 border-[#2d6f9a]">
          <h2 className="text-xl font-bold text-[#2d6f9a] mb-2">Mission:</h2>
          <p className="text-gray-800">
            Creating a viable free open source alternative to Magma, Maple, Mathematica and Matlab.
          </p>
        </section>

        {/* Learn Section */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-[#2d6f9a] mb-3">Learn how to use SageMath:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            <li>Sage for Undergraduates by Gregory Bard (Spanish: Sage para Estudiantes de Pregrado)</li>
            <li>Mathematical Computation with Sage by Paul Zimmermann et al.</li>
            <li className="text-gray-600">(French: Calcul mathematique avec Sage, German: Reclaren mit Sage)</li>
          </ul>
        </section>

        {/* Blue Divider */}
        <div className="h-1 bg-[#2d6f9a] my-6"></div>

        {/* Feature Boxes */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* SageMathCell */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-[#2d6f9a] mb-1">SageMathCell</h4>
            <p className="text-sm text-gray-600">sagean@ciccic</p>
          </div>

          {/* Help - Documentation */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-[#2d6f9a] mb-1">Help - Documentation</h4>
            <p className="text-sm text-gray-600">Video - Subj Quiz - Return - Tussen! - Help - Questions?</p>
          </div>

          {/* Library */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-[#2d6f9a] mb-1">Library</h4>
            <p className="text-sm text-gray-600">Dartmouth's - Stoke - Publication - From us</p>
          </div>

          {/* Install 10.6 - Release Tour */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-[#2d6f9a] mb-1">Install 10.6 - Release Tour</h4>
            <p className="text-sm text-gray-600">Release Tour - Ching-Higi - Source tablid</p>
          </div>

          {/* Feature Tour */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-[#2d6f9a] mb-1">Feature Tour</h4>
            <p className="text-sm text-gray-600">Customer - Season1 - Singles</p>
          </div>

          {/* Search */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-[#2d6f9a] mb-1">Search</h4>
            <select className="w-full p-1 text-sm border border-gray-300 rounded bg-white text-gray-700">
              <option>[Choose]</option>
            </select>
          </div>
        </section>

        {/* Blue Divider */}
        <div className="h-1 bg-[#2d6f9a] my-6"></div>

        {/* Sponsor Section */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-[#2d6f9a] mb-3">
            Help SageMath by becoming a <span className="italic">Sponsor</span>
          </h3>
          <p className="text-gray-800 leading-relaxed">
            Donations are handled via SageMath GitHub Organization with Open Source Collective as fiscal host. One-time and recurring downloads can also be done via SageMath Open Source Collective, credit card/PhyPu/Mark transfers are accepted. Open Source Collective is a USA NCC PUY(i)(i) registered tax-exempt charity.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-300">
        <div className="flex flex-wrap gap-4 justify-between text-sm">
          <a href="#" className="text-[#2d6f9a] hover:underline">About</a>
          <a href="#" className="text-[#2d6f9a] hover:underline">Download</a>
          <a href="#" className="text-[#2d6f9a] hover:underline">Documentation</a>
          <a href="#" className="text-[#2d6f9a] hover:underline">Support</a>
          <a href="#" className="text-[#2d6f9a] hover:underline">Development</a>
          <a href="#" className="text-[#2d6f9a] hover:underline">Contributing</a>
          <a href="#" className="text-[#2d6f9a] hover:underline">License</a>
          <a href="#" className="text-[#2d6f9a] hover:underline">Privacy</a>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p>Copyright © The Sage Development Team</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;