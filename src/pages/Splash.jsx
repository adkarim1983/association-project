import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo2.png';

function Splash() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const handleClick = () => {
    navigate('/home');
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageMenuOpen(false);
  };

  const currentLanguage = i18n.language || 'fr';

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-start select-none overflow-auto"
      style={{ cursor: 'pointer' }}
    >
      {/* Styles */}
      <style>{`
        body { overflow-x: hidden; }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .fade-in-up-delay { animation: fadeInUp 0.8s ease-out 0.3s both; }
        .fade-in-up-delay-2 { animation: fadeInUp 0.8s ease-out 0.6s both; }
        .arabic-text { direction: rtl; text-align: right; font-family: 'Noto Sans Arabic', 'Arial', sans-serif; }
      `}</style>

      {/* Language Selector - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLanguageMenuOpen(!languageMenuOpen);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white"
          >
            <span className="text-2xl">🌐</span>
            <span className="font-medium">{currentLanguage.toUpperCase()}</span>
          </button>

          {languageMenuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl z-50 p-3 space-y-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageChange("fr");
                }}
                className="flex items-center gap-3 px-4 py-3 w-full hover:bg-blue-50 rounded-xl transition-all duration-200 group"
              >
                <img src="https://flagcdn.com/fr.svg" alt="Français" className="w-8 h-8 rounded-md shadow-sm" />
                <span className="font-medium text-gray-800 group-hover:text-blue-600">Français</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageChange("en");
                }}
                className="flex items-center gap-3 px-4 py-3 w-full hover:bg-blue-50 rounded-xl transition-all duration-200 group"
              >
                <img src="https://flagcdn.com/gb.svg" alt="English" className="w-8 h-8 rounded-md shadow-sm" />
                <span className="font-medium text-gray-800 group-hover:text-blue-600">English</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageChange("ar");
                }}
                className="flex items-center gap-3 px-4 py-3 w-full hover:bg-blue-50 rounded-xl transition-all duration-200 group"
              >
                <img src="https://flagcdn.com/ma.svg" alt="العربية" className="w-8 h-8 rounded-md shadow-sm" />
                <span className="font-medium text-gray-800 group-hover:text-blue-600">العربية</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '80%',
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8">
        {/* Logo */}
        <div className="fade-in-up text-center mb-8">
          <div className="relative inline-block">
            <img
              src={logo}
              alt="Association Najm"
              className="w-32 h-32 md:w-48 md:h-48 object-contain mx-auto filter drop-shadow-2xl"
            />
            <div className="absolute inset-0 shimmer rounded-full" />
          </div>
        </div>

        {/* Main Title */}
        <div className="fade-in-up-delay text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight arabic-text">
            تنزيل محور دعم ريادة الأعمال لدى شباب عمالة مقاطعات مولاي رشيد
          </h1>
        </div>

        {/* Main Paragraph */}
        <div className="fade-in-up-delay-2 mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-white leading-relaxed arabic-text">
              بفضل كفاءة أعضائها والتزام هيكلها التنظيمي الدائم، ساهمت جمعية نجم في طلب إبداء الاهتمام الذي أطلقته
              عمالة مقاطعات مولاي رشيد في نونبر 2023، والمتعلق بتنزيل محور دعم ريادة الأعمال لدى الشباب.
            </p>
            <p className="text-lg md:text-xl text-white leading-relaxed arabic-text mt-4">
              وقد مكّن تميز ملف الترشيح الذي قدمته الجمعية من نيل ثقة لجنة الانتقاء والسيد العامل، تجسدت هذه الثقة
              من خلال إسناد هذه المهمة الاستراتيجية إلى جمعية نجم. حيث وقعت الجمعية اتفاقيتي شراكة برسم سنة
              2024، بتراب عمالة مقاطعات مولاي رشيد.
            </p>
          </div>
        </div>

        {/* Images Section */}
        <div className="fade-in-up mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 h-64">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-medium">صورة 1</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 h-64">
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-medium">صورة 2</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 h-64">
              <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-medium">صورة 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="fade-in-up text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white arabic-text">
            تنزيل محور دعم ريادة الأعمال لدى شباب
          </h2>
        </div>

        {/* Two Cards Section */}
        <div className="fade-in-up-delay mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* First Card */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <p className="text-white text-lg leading-relaxed arabic-text">
                اعتمدت الجمعية منهجية عمل تقوم على تنظيم دورات تكوين
                قبلي محددة المدة (كل ثلاث أشهر)، تتخللها مجموعة من
                آليات التتبع والتقييم المستمر، حيث تختتم هذه الدورات بعقد
                الاجتماعات الدورية للجنة الإقليمية للتنمية البشرية
                (CPDH)، وذلك بهدف تمكين هياكل الحكامة الخاصة
                بالمبادرة الوطنية للتنمية البشرية من تتبع مستوى الإنجاز
                ومدى تحقيق الأهداف المسطرة.
              </p>
            </div>

            {/* Second Card */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
              </div>
              <p className="text-white text-lg leading-relaxed arabic-text">
                تعتمد جمعية نجم مقاربة تربوية حديثة ترتكز على منهج
                الأندراغوجيا، المصمم خصيصاً لتلبية احتياجات التعلم لدى
                الكبار. وتُعزَّز هذه المقاربة بتكوين تطبيقي وتفاعلي مبني
                على معالجة حالات واقعية، وفق مبدأ "التعلم من خلال
                الممارسة". ويشرف على هذا المسار فريق بيداغوجي دائم،
                يضمن مواكبة دقيقة وجودة في التكوين، من خلال تواصل
                مستمر مع خبراء ومهنيين، مما يعزز فعالية التعلم ويضمن
                تحقيق نتائج ملموسة.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Images Section */}
        <div className="fade-in-up-delay-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 h-48">
              <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-medium">صورة 4</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 h-48">
              <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-medium">صورة 5</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 h-48">
              <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-medium">صورة 6</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 h-48">
              <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-medium">صورة 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Click to Enter Hint */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300">
            <span className="text-lg font-medium arabic-text">
              انقر للدخول إلى الموقع
            </span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splash;
