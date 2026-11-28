import { Link } from 'react-router-dom';
import { 
  FaBalanceScale, FaGavel, FaUsers, FaBuilding, FaLandmark, 
  FaFileContract, FaCheckCircle, FaArrowRight, FaGem, 
  FaUserTie, FaUserShield, FaHandsHelping, FaAward, FaLock,
  FaBullseye, FaEye
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const values = [
    { icon: FaGem, title: 'Integrity', desc: 'We uphold the highest moral and ethical standards in every case we handle.' },
    { icon: FaUserTie, title: 'Professionalism', desc: 'Delivering legal services with competence, diligence, and respect.' },
    { icon: FaLock, title: 'Confidentiality', desc: 'Ensuring absolute privacy and security of our clients\' information.' },
    { icon: FaHandsHelping, title: 'Client Commitment', desc: 'Dedicated to protecting your rights and achieving the best outcomes.' },
    { icon: FaBalanceScale, title: 'Justice', desc: 'Fighting for fairness and equality under the law for every individual.' },
    { icon: FaAward, title: 'Trust', desc: 'Building long-term relationships based on transparency and reliability.' },
  ];

  const expertise = [
    { icon: FaFileContract, title: 'Civil Law' },
    { icon: FaGavel, title: 'Criminal Law' },
    { icon: FaUsers, title: 'Family Law' },
    { icon: FaBuilding, title: 'Corporate Law' },
    { icon: FaLandmark, title: 'Property Law' },
    { icon: FaBalanceScale, title: 'Constitutional Law' },
  ];

  const team = [
    { name: 'Adv. Muhammad Ali', role: 'Senior Lawyer', img: 'https://ui-avatars.com/api/?name=Muhammad+Ali&background=0c4a6e&color=fff&size=256' },
    { name: 'Adv. Fatima Khan', role: 'Associate Lawyer', img: 'https://ui-avatars.com/api/?name=Fatima+Khan&background=0c4a6e&color=fff&size=256' },
    { name: 'Adv. Ahmed Raza', role: 'Associate Lawyer', img: 'https://ui-avatars.com/api/?name=Ahmed+Raza&background=0c4a6e&color=fff&size=256' },
  ];

  const strengths = [
    'Experienced legal professionals',
    'Personalized legal guidance',
    'Confidential handling of information',
    'Professional case management',
    'Client-focused service approach'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-20">
        
        {/* Page Header */}
        <section className="bg-hero-gradient dark:from-gray-900 dark:via-primary-900 dark:to-gray-900 py-16 text-center text-white">
          <h1 
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            data-aos="fade-up" 
            /* KYUN LIKHA: Heading ko scroll/load par neeche se upar smoothly appear karne ke liye fade-up lagaya. */
          >
            About Our Firm
          </h1>
          <p 
            className="text-gray-200 max-w-2xl mx-auto px-4"
            data-aos="fade-up" 
            data-aos-delay="100"
            /* KYUN LIKHA: Heading ke foran baad is text ko 100ms ke delay ke sath fade-up kiya taake ek ke baad ek (staggered) effect aaye, jo professional lagta hai. */
          >
            Dedicated to providing reliable, professional, and client-focused legal services.
          </p>
        </section>

        {/* 1. About the Firm */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div 
              className="order-2 md:order-1"
              data-aos="fade-up"
              /* KYUN LIKHA: Text wale hisse ko fade-up diya taake jab user yahan scroll kare toh text smoothly nazar aaye. */
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-800 dark:text-white mb-6">
                About Our Firm
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-lg">
                <strong className="text-primary-800 dark:text-white">M/S Meer Ahmed Mangrio & Associates</strong> is a premier law firm based in Hyderabad, Sindh, with a distinguished presence at the High Court of Sindh and the Supreme Court of Pakistan. Founded by <strong className="text-primary-800 dark:text-white">Advocate Meer Ahmed Mangrio</strong>, the firm has built a legacy of legal excellence, integrity, and an unwavering commitment to justice.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                With decades of combined experience, our team of seasoned advocates specializes in <strong className="text-primary-700 dark:text-accent-400">Criminal Litigation, Constitutional Petitions, Civil Law, Family Law, Human Rights Advocacy, and Pro Bono Litigation</strong>. We pride ourselves on delivering strategic legal solutions tailored to each client's unique needs, while also actively contributing to legal education and professional development in the community.
              </p>
            </div>
            <div 
              className="order-1 md:order-2"
              data-aos="fade-up"
              data-aos-delay="200"
              /* KYUN LIKHA: Image ko text se 200ms baad fade-up hone ke liye delay diya, taake pehle text aaye, phir image, jo dekhne mein bohat premium lagta hai. */
            >
              <img 
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=1000" 
                alt="M/S Meer Ahmed Mangrio & Associates Office" 
                className="rounded-2xl shadow-xl w-full object-cover" 
              />
            </div>
          </div>
        </section>

        {/* 2 & 3. Mission & Vision */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div 
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border-l-4 border-primary-600"
              data-aos="fade-up"
              /* KYUN LIKHA: Mission wale card ko poora ka poora fade-up diya taake wo ek solid box ki tarah upar aaye. */
            >
              <div className="flex items-center gap-3 mb-4">
                <FaBullseye className="text-3xl text-primary-600" />
                <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To provide professional, accessible, and reliable legal services while protecting the rights and interests of our clients. We strive to make justice accessible to everyone through transparent and ethical practices.
              </p>
            </div>
            {/* Vision */}
            <div 
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border-l-4 border-accent-500"
              data-aos="fade-up"
              data-aos-delay="150"
              /* KYUN LIKHA: Vision card ko bhi fade-up diya, lekin 150ms ka delay isliye diya taake Mission aur Vision ek sath na aayen, balki ek ke baad ek aayen. */
            >
              <div className="flex items-center gap-3 mb-4">
                <FaEye className="text-3xl text-accent-500" />
                <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To become a trusted and respected legal firm known for professionalism, integrity, and effective legal solutions. We aim to set new standards in legal practice through innovation and client-centric approaches.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Core Values */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 
              className="font-serif text-3xl md:text-4xl font-bold text-primary-800 dark:text-white mb-4"
              data-aos="fade-up"
              /* KYUN LIKHA: Section ki main heading ko fade-up diya taake wo prominent tareeqay se nazar aaye. */
            >
              Our Core Values
            </h2>
            <p 
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
              data-aos="fade-up"
              data-aos-delay="100"
              /* KYUN LIKHA: Sub-heading ko heading ke baad 100ms delay ke sath fade-up kiya. */
            >
              The principles that guide our practice and define our relationship with our clients.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <div 
                  key={idx} 
                  className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100} 
                  /* KYUN LIKHA: Har value card ko fade-up diya. `idx * 100` ka matlab hai ke pehla card 0ms, doosra 100ms, teesra 200ms par aayega. Is se cards ek ke baad ek (cascade mein) upar aate hain, jo bohat hi modern aur premium effect hai. */
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors mx-auto">
                    <value.icon className="text-3xl text-primary-700 dark:text-accent-400 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

                {/* 5. Legal Expertise */}
        <section className="py-20 bg-primary-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 
              className="font-serif text-3xl md:text-4xl font-bold mb-4"
              data-aos="fade-up"
              /* KYUN LIKHA: Heading ko fade-up rakha taake cards aane se pehle heading smoothly nazar aaye. */
            >
              Our Legal Expertise
            </h2>
            <p 
              className="text-gray-300 max-w-2xl mx-auto mb-12"
              data-aos="fade-up"
              data-aos-delay="100"
              /* KYUN LIKHA: Sub-heading ko heading ke baad 100ms delay ke sath fade-up kiya. */
            >
              We specialize in a comprehensive range of legal domains to serve your diverse needs.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {expertise.map((area, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                  data-aos={
                    idx < 2 ? 'fade-right' :    /* KYUN LIKHA: Left ke 2 cards (Civil, Criminal) left edge se slide hokar aayenge (fade-right). */
                    idx < 4 ? 'fade-up' :       /* KYUN LIKHA: Beech ke 2 cards (Family, Corporate) neeche se upar aayenge (fade-up). */
                    'fade-left'                 /* KYUN LIKHA: Right ke 2 cards (Property, Constitutional) right edge se slide hokar aayenge (fade-left). */
                  }
                  data-aos-delay={idx * 50}
                  /* KYUN LIKHA: Har card ko 100ms ka staggered delay diya taake cards ek ek karke, direction ke mutabiq, smooth cascade mein aayen. */
                >
                  <area.icon className="text-3xl text-accent-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-sm md:text-base">{area.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
             

        {/* 7. Why Clients Choose Us */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className="font-serif text-3xl md:text-4xl font-bold text-primary-800 dark:text-white mb-12 text-center"
              data-aos="fade-up"
              /* KYUN LIKHA: 'Why Choose Us' heading ko fade-up diya. */
            >
              Why Clients Choose Us
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {strengths.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  /* KYUN LIKHA: Har strength point (check mark wale) ko fade-up aur dynamic delay diya taake list padhte waqt ek smooth flowing effect mehsoos ho. */
                >
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
                  </div>
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Call to Action */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden"
              data-aos="fade-up"
              /* KYUN LIKHA: Poore CTA (Call to Action) box ko ek sath fade-up diya taake wo ek solid, attention-grabbing unit ki tarah screen par aaye. */
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative z-10">Need Professional Legal Assistance?</h2>
              <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                Let our experienced team guide you through your legal matters with expertise and care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link to="/login" className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-gray-900 font-bold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2">
                  Book an Appointment <FaArrowRight />
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                  Contact Our Firm <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;