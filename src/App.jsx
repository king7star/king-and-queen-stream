import React, { useState, useEffect } from 'react';
import {
  Layout,
  Wallet,
  Users,
  Radio,
  ShieldCheck,
  Languages,
  Bell,
  TrendingUp,
  PlusCircle,
  MessageCircle,
  Settings,
  LogOut,
  ChevronRight,
  Gift,
  Search
} from 'lucide-react';

// Translations
const translations = {
  en: {
    appTitle: "KING LIVE QUEEN",
    home: "Home",
    wallet: "Wallet",
    referral: "Referral",
    funding: "Funding",
    admin: "Admin Dashboard",
    language: "Language",
    toggleLanguage: "العربية",
    balance: "Balance",
    points: "Points",
    referralCode: "Your Referral Code",
    inviteFriends: "Invite friends and earn points",
    activeStreams: "Active Streams",
    startStream: "Start Live",
    adminTitle: "KI👑NG ADMIN PORTAL",
    userManagement: "User Management",
    streamControl: "Stream Control",
    fundingActivities: "Funding Activities",
    sendNotification: "Send Push Notification",
    recentDonations: "Recent Donations",
    fundingGoal: "Funding Goal",
    pointsReferral: "Points Referral",
    settings: "Settings",
    logout: "Logout",
    search: "Search for streams or users...",
    viewAll: "View All",
    popularCategories: "Popular Categories",
    liveNow: "Live Now",
    referralBonus: "Bonus for successful referral",
    fundNow: "Fund Now"
  },
  ar: {
    appTitle: "KING LIVE QUEEN",
    home: "الرئيسية",
    wallet: "المحفظة",
    referral: "الإحالة",
    funding: "التمويل",
    admin: "بوابة الأدمن للـ KI👑NG",
    language: "اللغة",
    toggleLanguage: "English",
    balance: "الرصيد",
    points: "النقاط",
    referralCode: "كود الإحالة الخاص بك",
    inviteFriends: "ادعُ أصدقاءك واكسب نقاطاً",
    activeStreams: "البثوث المباشرة",
    startStream: "ابدأ بثاً مباشراً",
    adminTitle: "بوابة الأدمن للـ KI👑NG",
    userManagement: "إدارة المستخدمين",
    streamControl: "التحكم بالبث",
    fundingActivities: "نشاط التمويل",
    sendNotification: "إرسال إشعار",
    recentDonations: "التبرعات الأخيرة",
    fundingGoal: "هدف التمويل",
    pointsReferral: "نقاط الإحالة",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    search: "ابحث عن بث أو مستخدم...",
    viewAll: "عرض الكل",
    popularCategories: "فئات شائعة",
    liveNow: "مباشر الآن",
    referralBonus: "مكافأة الإحالة الناجحة",
    fundNow: "مول الآن"
  }
};

const App = () => {
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const t = translations[lang];

  // Language toggle
  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isRtl ? 'rtl' : ''} bg-background-light dark:bg-background-dark text-slate-900 dark:text-white`}>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-black text-primary tracking-tighter italic">KI👑NG</div>
          <div className="hidden md:flex relative">
            <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
            <input
              type="text"
              placeholder={t.search}
              className={`bg-slate-100 dark:bg-slate-900 border-none rounded-full py-2 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} w-64 text-sm focus:ring-2 focus:ring-primary`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={toggleLanguage} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center gap-1 text-sm font-medium">
            <Languages size={20} />
            <span className="hidden sm:inline">{t.toggleLanguage}</span>
          </button>

          <button onClick={() => setView('wallet')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
            <Wallet size={20} />
          </button>

          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          <div
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer border-2 border-white dark:border-slate-900 shadow-lg"
            onClick={() => setIsAdmin(!isAdmin)}
          >
            K
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <aside className={`w-full md:w-64 border-b md:border-b-0 ${isRtl ? 'md:border-l' : 'md:border-r'} border-slate-200 dark:border-slate-800 p-4 shrink-0`}>
          <div className="flex flex-col gap-2">
            <SidebarItem icon={<Radio size={20} />} label={t.home} active={view === 'home'} onClick={() => setView('home')} isRtl={isRtl} />
            <SidebarItem icon={<TrendingUp size={20} />} label={t.liveNow} active={false} onClick={() => {}} isRtl={isRtl} />
            <SidebarItem icon={<PlusCircle size={20} />} label={t.startStream} active={false} onClick={() => {}} isRtl={isRtl} isPrimary />
            <div className="my-4 border-t border-slate-200 dark:border-slate-800"></div>
            <SidebarItem icon={<Wallet size={20} />} label={t.wallet} active={view === 'wallet'} onClick={() => setView('wallet')} isRtl={isRtl} />
            <SidebarItem icon={<Users size={20} />} label={t.referral} active={view === 'referral'} onClick={() => setView('referral')} isRtl={isRtl} />
            <SidebarItem icon={<Gift size={20} />} label={t.funding} active={view === 'funding'} onClick={() => setView('funding')} isRtl={isRtl} />

            {(isAdmin || view === 'admin') && (
              <>
                <div className="my-4 border-t border-slate-200 dark:border-slate-800"></div>
                <SidebarItem icon={<ShieldCheck size={20} className="text-yellow-500" />} label={t.admin} active={view === 'admin'} onClick={() => setView('admin')} isRtl={isRtl} />
              </>
            )}

            <div className="mt-auto pt-10">
              <SidebarItem icon={<Settings size={20} />} label={t.settings} active={false} onClick={() => {}} isRtl={isRtl} />
              <SidebarItem icon={<LogOut size={20} />} label={t.logout} active={false} onClick={() => {}} isRtl={isRtl} />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0a0a0a] p-4 md:p-8">
          {view === 'home' && <HomeView t={t} isRtl={isRtl} />}
          {view === 'wallet' && <WalletView t={t} isRtl={isRtl} />}
          {view === 'referral' && <ReferralView t={t} isRtl={isRtl} />}
          {view === 'funding' && <FundingView t={t} isRtl={isRtl} />}
          {view === 'admin' && <AdminDashboard t={t} isRtl={isRtl} />}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, isRtl, isPrimary }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full
      ${active ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}
      ${isPrimary && !active ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}
      ${isRtl ? 'flex-row-reverse' : ''}
    `}
  >
    {icon}
    <span className="font-semibold text-sm">{label}</span>
    {active && !isRtl && <ChevronRight className="ml-auto" size={16} />}
    {active && isRtl && <ChevronRight className="mr-auto rotate-180" size={16} />}
  </button>
);

const HomeView = ({ t, isRtl }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <header className="relative h-64 rounded-3xl overflow-hidden shadow-2xl group">
      <img
        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        alt="Hero"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      <div className={`absolute bottom-8 ${isRtl ? 'right-8' : 'left-8'} text-white space-y-2`}>
        <div className="bg-primary px-3 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-wider">{t.liveNow}</div>
        <h1 className="text-4xl font-black italic tracking-tighter">THE KI👑NG STREAMING WORLD</h1>
        <p className="text-slate-300 max-w-md">{t.inviteFriends}</p>
      </div>
    </header>

    <section>
      <div className={`flex items-center justify-between mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Radio size={24} className="text-primary" />
          {t.activeStreams}
        </h2>
        <button className="text-primary font-semibold hover:underline text-sm">{t.viewAll}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
          <div key={id} className="group cursor-pointer">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 bg-slate-200 dark:bg-slate-800">
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + id * 1000}?auto=format&fit=crop&q=60&w=400`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt="Stream"
              />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                LIVE
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded">
                2.4k viewers
              </div>
            </div>
            <div className={`flex gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                <img src={`https://i.pravatar.cc/150?u=${id}`} alt="Avatar" />
              </div>
              <div>
                <h3 className="font-bold text-sm line-clamp-1">Pro Gaming Sessions | World Cup Qualifiers</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">User_King_{id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const WalletView = ({ t, isRtl }) => (
  <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
    <h2 className={`text-3xl font-black italic tracking-tighter ${isRtl ? 'text-right' : ''}`}>
      {t.wallet}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-primary to-purple-600 p-8 rounded-[2rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <p className="text-primary-light font-medium mb-1">{t.balance}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tighter italic">2,450.00</span>
            <span className="text-xl font-bold opacity-80">$</span>
          </div>
          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-white text-primary font-bold py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              + {isRtl ? 'إيداع' : 'Deposit'}
            </button>
            <button className="flex-1 bg-black/20 text-white font-bold py-3 rounded-2xl backdrop-blur-sm hover:bg-black/30 transition-colors">
              {isRtl ? 'سحب' : 'Withdraw'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">{t.points}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black tracking-tighter italic text-yellow-500">15,800</span>
          <PlusCircle className="text-yellow-500" size={24} />
        </div>
        <div className="mt-8">
          <p className="text-xs text-slate-400 mb-4">{t.referralBonus}</p>
          <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">CODE</span>
              <span className="text-lg font-black tracking-widest text-primary italic">KING-888</span>
            </div>
            <button className="bg-slate-200 dark:bg-slate-700 p-2 rounded-xl text-slate-600 dark:text-slate-300">
              {isRtl ? 'نسخ' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h3 className="font-bold">{isRtl ? 'المعاملات الأخيرة' : 'Recent Transactions'}</h3>
        <button className="text-sm text-primary font-bold">{t.viewAll}</button>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {[1, 2, 3].map(i => (
          <div key={i} className={`p-6 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <div className={isRtl ? 'text-right' : ''}>
                <p className="font-bold">Funding Reward</p>
                <p className="text-xs text-slate-400">Oct 24, 2023 • 14:20</p>
              </div>
            </div>
            <div className={`text-right ${isRtl ? 'text-left' : 'text-right'}`}>
              <p className="font-black text-green-500 italic">+ $15.00</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Completed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ReferralView = ({ t, isRtl }) => (
  <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-10 duration-500">
    <div className="text-center space-y-4">
      <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <Users size={48} />
      </div>
      <h2 className="text-4xl font-black italic tracking-tighter">{t.inviteFriends}</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">{t.referralBonus}</p>
    </div>

    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8">
        <Gift size={120} className="text-primary/5 -rotate-12" />
      </div>
      <div className="relative z-10 text-center space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.referralCode}</p>
          <div className="text-6xl font-black italic tracking-widest text-primary">KING-LIVE</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-white font-black py-4 px-12 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform italic tracking-tighter text-lg">
            {isRtl ? 'مشاركة الكود' : 'SHARE CODE'}
          </button>
          <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-4 px-12 rounded-2xl transition-colors italic tracking-tighter text-lg">
            {isRtl ? 'قائمة المدعوين' : 'REFERRAL LIST'}
          </button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard label="Total Referrals" value="48" icon={<Users size={20} />} isRtl={isRtl} />
      <StatCard label="Points Earned" value="12.4k" icon={<Gift size={20} />} isRtl={isRtl} />
      <StatCard label="Level" value="Gold" icon={<TrendingUp size={20} />} isRtl={isRtl} />
    </div>
  </div>
);

const StatCard = ({ label, value, icon, isRtl }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-2">
    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-2 text-slate-400">
      {icon}
    </div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-2xl font-black italic tracking-tighter text-slate-800 dark:text-white">{value}</p>
  </div>
);

const FundingView = ({ t, isRtl }) => (
  <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
    <div className={`flex items-end justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
      <div>
        <h2 className="text-4xl font-black italic tracking-tighter text-primary uppercase">{t.funding}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">{isRtl ? 'دعم مستمر للمبدعين والنمو' : 'Support creators and growth'}</p>
      </div>
      <div className="text-right">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t.fundingGoal}</div>
        <div className="text-3xl font-black italic tracking-tighter">$50,000 / $100,000</div>
      </div>
    </div>

    <div className="w-full bg-slate-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden">
      <div className="bg-primary h-full w-1/2 rounded-full shadow-[0_0_20px_rgba(233,30,99,0.5)]"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-tr from-primary to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-xl rotate-3">
             <TrendingUp size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-black italic tracking-tighter uppercase">King Plan {i}</h3>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">Exclusive benefits, premium badges, and early access to features.</p>
          </div>
          <div className="text-3xl font-black italic text-primary">
            ${i * 49}.00
          </div>
          <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-4 rounded-2xl hover:scale-105 transition-transform uppercase tracking-tighter">
            {t.fundNow}
          </button>
        </div>
      ))}
    </div>
  </div>
);

const AdminDashboard = ({ t, isRtl }) => (
  <div className="space-y-8 animate-in slide-in-from-top-10 duration-500">
    <div className="bg-slate-900 dark:bg-primary p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
      <div className="absolute right-0 top-0 p-10 opacity-10">
        <ShieldCheck size={200} />
      </div>
      <div className="relative z-10">
        <h2 className="text-5xl font-black italic tracking-tighter mb-4">{t.adminTitle}</h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3">
             <Users className="text-primary-light" />
             <div>
               <p className="text-[10px] uppercase font-bold opacity-60">Total Users</p>
               <p className="text-xl font-black tracking-tighter italic">124,582</p>
             </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3">
             <Radio className="text-primary-light" />
             <div>
               <p className="text-[10px] uppercase font-bold opacity-60">Active Streams</p>
               <p className="text-xl font-black tracking-tighter italic">1,480</p>
             </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <AdminCard title={t.userManagement} isRtl={isRtl}>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl ${isRtl ? 'flex-row-reverse' : ''}`}>
                 <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                   <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                     <img src={`https://i.pravatar.cc/150?u=admin${i}`} alt="Avatar" />
                   </div>
                   <div>
                     <p className="text-sm font-bold">User_King_{i}</p>
                     <p className="text-[10px] text-slate-400">ID: 88472-882</p>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <button className="bg-primary/10 text-primary p-2 rounded-lg"><Settings size={16} /></button>
                   <button className="bg-red-500/10 text-red-500 p-2 rounded-lg"><ShieldCheck size={16} /></button>
                 </div>
              </div>
            ))}
          </div>
       </AdminCard>

       <AdminCard title={t.sendNotification} isRtl={isRtl}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Notification Title</label>
              <input type="text" className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary" placeholder="Welcome KI👑NGs..." />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message Body</label>
              <textarea className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary h-32" placeholder="Start your journey with us..."></textarea>
            </div>
            <button className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 italic tracking-tighter text-lg uppercase">
              Broadcast Message
            </button>
          </div>
       </AdminCard>
    </div>
  </div>
);

const AdminCard = ({ title, children, isRtl }) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
    <h3 className={`text-2xl font-black italic tracking-tighter uppercase ${isRtl ? 'text-right' : ''}`}>{title}</h3>
    {children}
  </div>
);

export default App;
