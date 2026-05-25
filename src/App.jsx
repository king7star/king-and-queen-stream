import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import {
  Plane, Globe, MessageSquare, User, Search, Map as MapIcon, Shield, Bell,
  Settings, LogOut, ChevronRight, ArrowLeft, Camera, Image as ImageIcon,
  Video, Send, Check, Coins, Gift, RefreshCw, X, Menu, Phone, Mail,
  Lock, UserCircle, History, Info, Languages, Trash2, ShieldCheck,
  CheckCircle, AlertCircle, Clock, Cloud, Navigation, Landmark, CreditCard,
  Mic, MicOff, Search as SearchIcon, Users, Filter, Terminal
} from 'lucide-react';

// --- TRANSLATIONS ---
const translations = {
  en: {
    appTitle: "KING", boarding: "Boarding Gate", slogan: "Luxury Virtual Travel",
    login: "Login", signup: "Sign Up", email: "Email/Phone/Username", password: "Password",
    googleLogin: "Sign in with Google", phoneLogin: "Phone Login", guestLogin: "Continue as Guest",
    home: "Radar", map: "World Map", chat: "Messages", profile: "Passenger",
    collect: "Collect", settings: "Settings", admin: "Control Tower",
    miles: "Miles", funding: "Free Funding", takeoff: "Taking Off...", cruising: "Cruising...",
    landing: "Landing...", original: "Original", translate: "Translate",
    searchPassenger: "Search Passenger Manifest...", approve: "Approve", reject: "Reject",
    broadcast: "Global Broadcast", broadcastAr: "Arabic Content", broadcastEn: "English Content",
    whoCanSee: "Who can see you?", rateLimit: "Change allowed in",
    fundingRequest: "Miles Request", submit: "Submit Request", language: "Language",
    culturalFact: "Cultural Fact", localTime: "Local Time", temp: "Temperature",
    destination: "Destination", passengerSearch: "Passenger Manifest",
  },
  ar: {
    appTitle: "KING", boarding: "بوابة الصعود", slogan: "السفر الافتراضي الفاخر",
    login: "تسجيل الدخول", signup: "إنشاء حساب", email: "الإيميل / الهاتف / اسم المستخدم", password: "كلمة المرور",
    googleLogin: "الدخول بواسطة جوجل", phoneLogin: "الدخول بالهاتف", guestLogin: "دخول كزائر",
    home: "الرادار", map: "خريطة العالم", chat: "الرسائل", profile: "المسافر",
    collect: "تجميع", settings: "الإعدادات", admin: "برج المراقبة",
    miles: "أميال", funding: "تمويل مجاني", takeoff: "إقلاع...", cruising: "تحليق...",
    landing: "هبوط...", original: "الأصل", translate: "ترجمة",
    searchPassenger: "البحث في كشف الركاب...", approve: "موافقة", reject: "رفض",
    broadcast: "بث عالمي", broadcastAr: "المحتوى العربي", broadcastEn: "المحتوى الإنجليزي",
    whoCanSee: "من يمكنه رؤيتك؟", rateLimit: "التغيير متاح خلال",
    fundingRequest: "طلب أميال", submit: "إرسال الطلب", language: "اللغة",
    culturalFact: "حقيقة ثقافية", localTime: "الوقت المحلي", temp: "درجة الحرارة",
    destination: "الوجهة", passengerSearch: "كشف الركاب",
  }
};

const FLIGHT_FACTS = [
  { country: "Japan", fact: "Japan has over 5,500,000 vending machines.", time: "GMT+9", temp: "22°C" },
  { country: "Egypt", fact: "The Great Pyramid of Giza was the tallest man-made structure for 3,800 years.", time: "GMT+2", temp: "30°C" },
  { country: "France", fact: "France is the most visited country in the world.", time: "GMT+1", temp: "18°C" },
];

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');
  const [view, setView] = useState('home');
  const [profile, setProfile] = useState(null);
  const [isFlightActive, setIsFlightActive] = useState(false);
  const [flightStage, setFlightStage] = useState(0); // 0: takeoff, 1: cruising, 2: landing
  const [currentMessage, setCurrentMessage] = useState(null);

  const t = translations[lang];
  const isRtl = lang === 'ar';
 feat/initial-king-live-queen-setup-17143322997806521655

  const isAdmin = profile?.is_admin || false;
  const isGuest = session?.user?.id === '00000000-0000-0000-0000-000000000000';
 main

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserData(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchUserData(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);
  };

  if (loading) return <div className="h-screen bg-king-blue flex flex-col items-center justify-center text-king-gold font-bold italic animate-pulse"><Plane size={48} className="mb-4" /> KING...</div>;

  if (!session) return <AuthView t={t} isRtl={isRtl} setSession={setSession} setLang={setLang} lang={lang} />;

  const triggerFlight = (msg) => {
    setCurrentMessage(msg);
    setIsFlightActive(true);
    setFlightStage(0);
    setTimeout(() => setFlightStage(1), 2000);
    setTimeout(() => setFlightStage(2), 5000);
    setTimeout(() => {
      setIsFlightActive(false);
      setView('chat_detail');
    }, 7000);
  }; feat/initial-king-live-queen-setup-17143322997806521655
  return (
    <div className={`min-h-screen ${isRtl ? 'rtl' : 'ltr'} bg-king-blue text-white font-sans selection:bg-king-gold/30`}>
      {isFlightActive ? (
        <FlightSimulation stage={flightStage} t={t} message={currentMessage} />
      ) : (
        <>
          <Header t={t} profile={profile} setView={setView} isRtl={isRtl} />
          <main className="pb-24 pt-16 px-4 max-w-lg mx-auto">
            {renderView({ view, setView, t, isRtl, profile, triggerFlight, setLang, lang })}
          </main>
          <Navbar view={view} setView={setView} t={t} />
        </>

      <main className={`${!isFullscreen ? 'pt-14 pb-20' : ''} min-h-screen`}>
        {renderView({ view, navigate, t, isRtl, setLang, profile, setProfile, unreadMessages, showNsfw, setShowNsfw, wallet, viewerCount, setShowLogout, isAdmin, isGuest })}
      </main>

      {!isFullscreen && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 px-6 h-16 flex items-center justify-between">
          <NavItem active={view === 'home'} icon={<Layout size={24} />} onClick={() => navigate('home')} />
          <NavItem active={view === 'following'} icon={<Heart size={24} />} onClick={() => navigate('following')} />
          <NavItem active={view === 'feed'} icon={<Rss size={24} />} onClick={() => navigate('feed')} />
          <NavItem active={view === 'store'} icon={<Store size={24} />} onClick={() => navigate('store')} />
          <NavItem active={view === 'profile' || view.startsWith('settings') || view === 'admin'} icon={<User size={24} />} onClick={() => navigate('profile')} />
        </nav> main
      )}
    </div>
  );
};

const Header = ({ t, profile, setView, isRtl }) => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-king-blue-deep/80 backdrop-blur-xl border-b border-king-gold/10 z-40 px-6 flex items-center justify-between">
    <div className="flex items-center gap-3">
       <div className="w-8 h-8 rounded-full bg-king-gold flex items-center justify-center text-king-blue font-black italic shadow-lg shadow-king-gold/20">K</div>
       <span className="font-black italic tracking-tighter text-xl text-king-gold uppercase">{t.appTitle}</span>
    </div>
    <div className="flex items-center gap-4">
       <button onClick={() => setView('admin')} className="text-king-gold/50 hover:text-king-gold"><Terminal size={20}/></button>
       <Bell size={20} className="text-king-gold/50 cursor-pointer" />
       <div onClick={() => setView('profile')} className="w-8 h-8 rounded-full border-2 border-king-gold/30 overflow-hidden cursor-pointer">
          {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-king-blue-light" />}
       </div>
    </div>
  </header>
);

const Navbar = ({ view, setView, t }) => (
  <nav className="fixed bottom-0 left-0 right-0 h-20 bg-king-blue-deep border-t border-king-gold/10 z-40 px-8 flex items-center justify-between">
     <NavBtn active={view === 'home'} icon={<Plane size={24}/>} label={t.home} onClick={() => setView('home')} />
     <NavBtn active={view === 'map'} icon={<Globe size={24}/>} label={t.map} onClick={() => setView('map')} />
     <NavBtn active={view === 'chat'} icon={<MessageSquare size={24}/>} label={t.chat} onClick={() => setView('chat')} />
     <NavBtn active={view === 'collect'} icon={<Coins size={24}/>} label={t.collect} onClick={() => setView('collect')} />
  </nav>
);

const NavBtn = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-king-gold scale-110' : 'text-king-gold/30'}`}>
     {icon}
     <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

const AuthView = ({ t, isRtl, setSession, setLang, lang }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
 feat/initial-king-live-queen-setup-17143322997806521655
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        if (error.message.includes('not enabled')) {
          alert(isRtl
            ? 'عذراً، يجب تفعيل تسجيل الدخول بجوجل من لوحة تحكم Supabase أولاً (Authentication > Providers > Google)'
            : 'Google login is not enabled yet. Please enable it in your Supabase Dashboard (Authentication > Providers > Google)');
          return;
        }
        throw error;
      }
    } catch (err) {
      alert(isRtl ? `خطأ في تسجيل الدخول بـ Google: ${err.message}` : `Google login error: ${err.message}`);
    }
  }; main

  const handleAuth = async (e) => {
    e.preventDefault();
    // Testing logic for king_dev and alghbsi
    if (id === 'king_dev' || id === 'king@gmail.com') {
      if (password === 'king2024') {
        setSession({ user: { id: 'admin-id', email: 'king@gmail.com' } });
        return;
      }
    }
    if (id === 'alghbsi' || id === 'captain@gmail.com') {
      if (password === 'password123') {
        setSession({ user: { id: 'captain-id', email: 'captain@gmail.com' } });
        return;
      }
    }
    alert(isRtl ? 'خطأ في البيانات' : 'Invalid credentials');
  };

  return (
    <div className={`min-h-screen bg-king-blue flex flex-col items-center justify-center p-8 ${isRtl ? 'rtl' : 'ltr'}`}>
       <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="absolute top-8 right-8 bg-king-gold/10 text-king-gold px-4 py-2 rounded-full font-bold flex items-center gap-2 border border-king-gold/20"><Languages size={18}/> {lang === 'en' ? 'العربية' : 'English'}</button>

       <div className="mb-12 text-center animate-in zoom-in duration-700">
          <div className="w-20 h-20 bg-king-gold rounded-3xl flex items-center justify-center text-king-blue mx-auto mb-6 shadow-2xl shadow-king-gold/20 rotate-3">
             <Plane size={48} className="-rotate-12" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter text-king-gold mb-2">{t.appTitle}</h1>
          <p className="text-king-gold/50 font-bold uppercase tracking-widest text-xs">{t.boarding}</p>
       </div>

       <form onSubmit={handleAuth} className="w-full max-w-sm space-y-4">
          <div className="space-y-1">
            <input type="text" placeholder={t.email} className="w-full bg-king-blue-light border border-king-gold/20 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-king-gold text-white placeholder:text-white/20" value={id} onChange={e => setId(e.target.value)} />
          </div>
          <div className="relative">
            <input type="password" placeholder={t.password} className="w-full bg-king-blue-light border border-king-gold/20 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-king-gold text-white placeholder:text-white/20" value={password} onChange={e => setPassword(e.target.value)} />
            <Lock className="absolute right-4 top-4 text-king-gold/20" size={20} />
          </div>
          <button className="w-full py-4 bg-king-gold text-king-blue rounded-2xl font-black italic uppercase tracking-tighter text-lg shadow-xl shadow-king-gold/20 active:scale-95 transition-all">{isLogin ? t.login : t.signup}</button>
       </form>

       <div className="w-full max-w-sm mt-8 space-y-3">
          <button className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all">
             <img src="https://www.google.com/favicon.ico" className="w-5 h-5" /> {t.googleLogin}
          </button>
          <button className="w-full py-4 bg-king-blue-light border border-king-gold/20 text-king-gold rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all">
             <Phone size={20} /> {t.phoneLogin}
          </button>
       </div>

       <button onClick={() => setIsLogin(!isLogin)} className="mt-8 text-king-gold/50 font-bold uppercase text-[10px] tracking-widest">{isLogin ? t.signup : t.login}</button>
    </div>
  );
};

const FlightSimulation = ({ stage, t, message }) => {
  const fact = FLIGHT_FACTS[Math.floor(Math.random() * FLIGHT_FACTS.length)];
  return (
    <div className="h-screen bg-king-blue-deep flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 overflow-hidden relative">
       <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-king-gold via-transparent to-transparent"></div>
       </div>

       {stage === 0 && (
         <div className="space-y-8 animate-in slide-in-from-bottom-20 duration-1000">
            <Plane size={120} className="text-king-gold mx-auto animate-bounce" />
            <h2 className="text-4xl font-black italic text-king-gold uppercase tracking-tighter">{t.takeoff}</h2>
            <div className="text-king-gold/50 font-bold">Origin: Sender Country</div>
         </div>
       )}

       {stage === 1 && (
         <div className="space-y-12 animate-in zoom-in duration-1000 max-w-sm">
            <div className="relative">
               <Cloud size={160} className="text-white/5 mx-auto" />
               <Plane size={48} className="text-king-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="bg-king-blue-light p-6 rounded-[2rem] border border-king-gold/20 space-y-4">
               <div className="flex items-center justify-between text-king-gold text-xs font-black uppercase">
                  <span>{fact.country}</span>
                  <span>{fact.time}</span>
               </div>
               <p className="text-sm italic leading-relaxed text-white/80">"{fact.fact}"</p>
               <div className="flex items-center gap-2 text-king-gold/50 text-xs">
                  <Clock size={14}/> <span>Cruising...</span>
               </div>
            </div>
         </div>
       )}

       {stage === 2 && (
         <div className="space-y-8 animate-in slide-in-from-top-20 duration-1000">
            <Plane size={120} className="text-king-gold mx-auto rotate-45" />
            <h2 className="text-4xl font-black italic text-king-gold uppercase tracking-tighter">{t.landing}</h2>
            <div className="text-king-gold/50 font-bold">Dest: Receiver Country</div>
         </div>
       )}
    </div>
  );
};

const renderView = (props) => {
  const { view } = props;
  switch (view) {
    case 'home': return <HomeView {...props} />;
    case 'map': return <MapView {...props} />;
    case 'chat': return <ChatListView {...props} />;
    case 'chat_detail': return <ChatDetailView {...props} />;
    case 'collect': return <CollectView {...props} />;
    case 'profile': return <ProfileView {...props} />;
    case 'admin': return <AdminPanelView {...props} />;
    default: return <HomeView {...props} />;
  }
};

const HomeView = ({ t, triggerFlight }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
     <div className="bg-king-gold p-8 rounded-[2.5rem] text-king-blue shadow-2xl shadow-king-gold/20 relative overflow-hidden group">
        <Plane size={120} className="absolute -right-8 -top-8 text-king-blue-deep/5 -rotate-12 group-hover:translate-x-4 transition-transform" />
        <h2 className="text-4xl font-black italic tracking-tighter mb-2 uppercase">{t.appTitle} Radar</h2>
        <p className="text-king-blue/60 font-bold text-xs uppercase tracking-widest">Active Flights: 1,482</p>
     </div>

     <div className="space-y-4">
        <h3 className="font-black italic uppercase text-king-gold flex items-center gap-2"><Navigation size={18}/> Live Manifest</h3>
        {[1, 2, 3].map(i => (
          <div key={i} onClick={() => triggerFlight({ id: i, text: "Sample Message" })} className="bg-king-blue-light border border-king-gold/10 p-4 rounded-2xl flex items-center justify-between hover:border-king-gold/50 transition-all cursor-pointer">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-king-blue flex items-center justify-center font-black text-king-gold">P</div>
                <div><p className="font-bold">Passenger_{i}</p><p className="text-[10px] text-king-gold/50 uppercase">Flying to Dubai</p></div>
             </div>
             <ChevronRight size={18} className="text-king-gold/30" />
          </div>
        ))}
     </div>
  </div>
);

const ChatListView = ({ setView, t }) => (
  <div className="space-y-4">
     <h2 className="text-2xl font-black italic uppercase text-king-gold">{t.chat}</h2>
     {[1, 2].map(i => (
       <div key={i} onClick={() => setView('chat_detail')} className="p-4 bg-king-blue-light rounded-3xl flex items-center gap-4 border border-king-gold/5 cursor-pointer hover:border-king-gold/20">
          <div className="w-12 h-12 rounded-2xl bg-king-blue border border-king-gold/20 flex items-center justify-center text-king-gold font-bold">C</div>
          <div className="flex-1">
             <p className="font-bold">Captain_Alghbsi</p>
             <p className="text-xs text-king-gold/50 truncate">Welcome aboard the KING flight...</p>
          </div>
          <div className="text-[10px] text-king-gold/30">12:45</div>
       </div>
     ))}
  </div>
);
 feat/initial-king-live-queen-setup-17143322997806521655
const ChatDetailView = ({ setView, t, triggerFlight, isRtl }) => {
  const [text, setText] = useState('');
  const [showOriginal, setShowOriginal] = useState(false);
const SettingsSection = ({ title, children }) => (
  <div className="space-y-1"><p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 py-2">{title}</p>{children}</div>
);

const SettingsItem = ({ icon, label, onClick, isRtl }) => (
  <button onClick={onClick} className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 rounded-2xl transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
    <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}><span className="text-pink-500">{icon}</span><span className="font-bold text-sm">{label}</span></div>
    <ChevronRight size={18} className={`text-gray-300 ${isRtl ? 'rotate-180' : ''}`} />
  </button>
);

const EditProfileView = ({ t, navigate, isRtl, profile, setProfile, isGuest }) => {
  const [formData, setFormData] = useState(profile || { username: '', gender: 'Male', birth_date: '', location: '', bio: '' });
  const [isSaved, setIsSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    if (isGuest) {
      alert(isRtl ? 'عذراً، يجب تسجيل الدخول لحفظ التغييرات' : 'Sorry, you must be logged in to save changes');
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from('profiles').upsert({ id: user.id, ...formData, updated_at: new Date() });
    if (!error) { setProfile(formData); setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }
  };

  const uploadAvatar = async (e) => {
    if (isGuest) {
      alert(isRtl ? 'عذراً، يجب إنشاء حساب لرفع الصور' : 'Sorry, you must create an account to upload photos');
      return;
    }
    try {
      setUploading(true);
      const file = e.target.files[0];
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;
      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setFormData({ ...formData, avatar_url: publicUrl });
    } catch (e) { alert(e.message); } finally { setUploading(false); }
  }; main

  return (
    <div className="h-[80vh] flex flex-col">
       <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setView('chat')}><ArrowLeft size={24} className="text-king-gold"/></button>
          <h2 className="font-black italic text-xl uppercase">Alghbsi</h2>
       </div>
       <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar py-4">
          <div className={`max-w-[80%] p-4 rounded-3xl bg-king-blue-light border border-king-gold/10 ${isRtl ? 'mr-auto' : 'ml-auto'}`}>
             <p className="text-sm">Welcome to Dubai! Hope you had a nice virtual flight. 🛫</p>
             <button onClick={() => setShowOriginal(!showOriginal)} className="mt-2 text-[10px] font-black uppercase text-king-gold/50 border border-king-gold/20 px-2 py-0.5 rounded-full">{t.original}</button>
          </div>
       </div>
       <div className="flex items-center gap-2 bg-king-blue-deep/50 p-2 rounded-full border border-king-gold/10">
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent px-4 py-2 outline-none text-sm placeholder:text-king-gold/20" />
          <button onClick={() => { triggerFlight(text); setText(''); }} className="w-10 h-10 bg-king-gold rounded-full flex items-center justify-center text-king-blue active:scale-90 transition-all"><Send size={18}/></button>
       </div>
    </div>
  );
};

const CollectView = ({ t, isRtl }) => (
  <div className="space-y-6 animate-in slide-in-from-bottom-10">
     <h2 className="text-2xl font-black italic uppercase text-king-gold">{t.collect}</h2>
     <div className="bg-gradient-to-br from-king-gold to-king-gold-dim p-8 rounded-[2.5rem] text-king-blue shadow-xl">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Total Balance</p>
        <p className="text-5xl font-black italic tracking-tighter">12,450 <span className="text-lg uppercase">Miles</span></p>
     </div>

     <div className="grid grid-cols-2 gap-4">
        <div className="bg-king-blue-light p-6 rounded-3xl border border-king-gold/10 flex flex-col items-center text-center">
           <Gift size={32} className="text-king-gold mb-3" />
           <p className="font-bold text-sm">Daily Reward</p>
           <button className="mt-3 bg-king-gold/10 text-king-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Claim</button>
        </div>
        <div className="bg-king-blue-light p-6 rounded-3xl border border-king-gold/10 flex flex-col items-center text-center">
           <Users size={32} className="text-king-gold mb-3" />
           <p className="font-bold text-sm">Invite Friends</p>
           <button className="mt-3 bg-king-gold/10 text-king-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Copy Link</button>
        </div>
     </div>

     <div className="bg-king-blue-light p-6 rounded-[2.5rem] border border-king-gold/10 space-y-4">
        <h3 className="font-black italic uppercase text-king-gold text-xs">{t.fundingRequest}</h3>
        <div className="grid grid-cols-2 gap-2">
           {[500, 1000, 5000, 10000].map(amt => (
             <button key={amt} className="py-3 bg-king-blue border border-king-gold/10 rounded-2xl font-black text-king-gold hover:bg-king-gold hover:text-king-blue transition-all">{amt}</button>
           ))}
        </div>
        <button className="w-full py-4 bg-king-gold/10 text-king-gold rounded-2xl font-black uppercase italic tracking-widest text-xs border border-king-gold/20">{t.submit}</button>
     </div>
  </div>
);
 feat/initial-king-live-queen-setup-17143322997806521655
const ProfileView = ({ t, profile, isRtl, setLang, lang }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
     <div className="text-center space-y-4">
        <div className="w-32 h-32 rounded-[2.5rem] bg-king-blue-light border-2 border-king-gold mx-auto overflow-hidden relative group">
           {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-king-gold font-black text-4xl">K</div>}
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><Camera size={24}/></div>
        </div>
        <div>
           <h2 className="text-3xl font-black italic text-king-gold uppercase tracking-tighter">{profile?.username || 'KING_DEV'}</h2>
           <p className="text-[10px] font-black uppercase tracking-widest text-king-gold/40">Status: First Class Passenger</p>
        </div>
     </div>
const StreamSetupView = ({ t, navigate, isRtl, showNsfw, setShowNsfw, isGuest }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [useFrontCamera, setUseFrontCamera] = useState(true);
  const [quality, setQuality] = useState('720p HD');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedGift, setSelectedGift] = useState(GIFTS[0]);
  const [joinPermission, setJoinPermission] = useState('anybody');
  const [commentPermission, setCommentPermission] = useState('anybody');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: useFrontCamera ? 'user' : 'environment' }, audio: true })
      .then(s => { setStream(s); if (videoRef.current) videoRef.current.srcObject = s; });
    return () => stream?.getTracks().forEach(t => t.stop());
  }, [useFrontCamera]);

  return (
    <div className="h-screen bg-black relative overflow-hidden flex flex-col">
      <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
      <div className="relative z-10 p-6 flex justify-between items-start">
         <button onClick={() => navigate('home')} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"><X size={24} /></button>
         <div className="flex flex-col gap-2">
            <button onClick={() => setUseFrontCamera(!useFrontCamera)} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"><RefreshCw size={20} /></button>
            <button onClick={() => setIsMuted(!isMuted)} className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center text-white ${isMuted ? 'bg-pink-500' : 'bg-black/40'}`}>{isMuted ? <MicOff size={20} /> : <Mic size={20} />}</button>
            <div className="relative">
              <button onClick={() => setShowQualityMenu(!showQualityMenu)} className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1 uppercase"><Monitor size={12} /> {quality} <ChevronDown size={12} /></button>
              {showQualityMenu && (
                <div className="absolute right-0 top-10 bg-black/80 backdrop-blur-xl rounded-2xl p-2 w-32 border border-white/10">
                  {['480p', '720p HD', '1080p FHD'].map(q => <button key={q} onClick={() => { setQuality(q); setShowQualityMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-white hover:bg-pink-500 rounded-lg">{q}</button>)}
                </div>
              )}
            </div>
         </div>
      </div>
      <div className="relative z-10 flex-1 overflow-y-auto px-6 no-scrollbar space-y-6 pb-24">
         <div className="bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-2 text-pink-500"><Zap size={20} /><span className="font-bold">{t.premium}</span></div>
               <button onClick={() => setIsPremium(!isPremium)} className={`w-12 h-6 rounded-full relative transition-colors ${isPremium ? 'bg-pink-500' : 'bg-gray-600'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPremium ? (isRtl ? 'left-1' : 'right-1') : (isRtl ? 'right-1' : 'left-1')}`}></div></button>
            </div>
            <p className="text-[10px] text-white/50">{t.premiumNote}</p>
            {isPremium && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[10px] font-bold text-white/70 uppercase mb-3">{t.entryTicket}</p>
                <div className="flex gap-2">
                   {GIFTS.map(gift => <button key={gift.id} onClick={() => setSelectedGift(gift)} className={`flex-1 p-2 rounded-xl border transition-all ${selectedGift.id === gift.id ? 'bg-pink-500 border-pink-500' : 'bg-white/5 border-white/10'}`}><div className="flex flex-col items-center gap-1">{gift.icon}<span className="text-[10px] font-bold">{gift.value}</span></div></button>)}
                </div>
              </div>
            )}
         </div>
         <div className="bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/10 space-y-6">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-white/70 uppercase flex items-center gap-2"><UsersIcon size={12}/> {t.whoCanJoin}</p>
              <div className="flex flex-col gap-2">
                <PermOption icon={<Globe2 size={14}/>} label={t.anyone} active={joinPermission === 'anybody'} onClick={() => setJoinPermission('anybody')} note={t.anybodyNote} isRtl={isRtl}/>
                <PermOption icon={<Heart size={14}/>} label={t.friends} active={joinPermission === 'friends'} onClick={() => setJoinPermission('friends')} isRtl={isRtl}/>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-white/70 uppercase flex items-center gap-2"><MessageSquare size={12}/> {t.whoCanComment}</p>
              <div className="flex flex-col gap-2">
                <PermOption icon={<Globe2 size={14}/>} label={t.anyone} active={commentPermission === 'anybody'} onClick={() => setCommentPermission('anybody')} note={t.anybodyCommentNote} isRtl={isRtl}/>
                <PermOption icon={<MessageSquareOff size={14}/>} label={t.chatDisabled} active={commentPermission === 'disabled'} onClick={() => setCommentPermission('disabled')} isRtl={isRtl}/>
              </div>
            </div>
         </div>
         <div className="bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><ImageIcon size={18} className="text-gray-400"/><span className="text-xs font-bold">{t.thumbnail}</span></div>
              <button className="bg-pink-500 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase">{t.update}</button>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
               <div className="flex items-center gap-2 text-pink-500"><Lock size={18}/><span className="text-xs font-bold uppercase">NSFW</span></div>
               <button onClick={() => setShowNsfw(!showNsfw)} className={`w-12 h-6 rounded-full relative transition-colors ${showNsfw ? 'bg-pink-500' : 'bg-gray-600'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showNsfw ? (isRtl ? 'left-1' : 'right-1') : (isRtl ? 'right-1' : 'left-1')}`}></div></button>
            </div>
            <p className="text-[10px] text-white/50">{t.nsfwNote}</p>
         </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6 z-20">
        <button
          onClick={() => {
            if (isGuest) {
              alert(isRtl ? 'يجب تسجيل الدخول لبدء بث مباشر' : 'You must log in to start a live stream');
              return;
            }
            navigate('connecting');
          }}
          className="w-full bg-pink-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-pink-500/30 uppercase italic tracking-widest animate-pulse"
        >
          {t.start}
        </button>
      </div>
    </div>
  );
};

const PermOption = ({ icon, label, active, onClick, note, isRtl }) => (
  <button onClick={onClick} className="text-left w-full group">
    <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${active ? 'border-pink-500 bg-pink-500' : 'border-white/30'}`}>{active && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}</div>
      <div className={`flex items-center gap-2 text-sm font-bold ${active ? 'text-white' : 'text-white/60'}`}>{icon} {label}</div>
    </div>
    {active && note && <p className={`text-[10px] text-white/40 mt-1 ${isRtl ? 'text-right mr-7' : 'ml-7'}`}>{note}</p>}
  </button>
);

const ConnectingView = ({ t, navigate }) => {
  useEffect(() => { setTimeout(() => navigate('active_stream'), 2000); }, []);
  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="font-black italic text-xl uppercase tracking-widest">{t.connecting}</p>
    </div>
  );
}; main

     <div className="bg-king-blue-light rounded-[2.5rem] border border-king-gold/10 overflow-hidden">
        <ProfileItem icon={<Mail size={18}/>} label={t.email} value="king@gmail.com" />
        <ProfileItem icon={<Languages size={18}/>} label={t.language} value={lang === 'en' ? 'English' : 'العربية'} onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} />
        <ProfileItem icon={<History size={18}/>} label="Flight History" value="12 Flights" />
        <ProfileItem icon={<ShieldCheck size={18}/>} label="Account Status" value="Verified" last />
     </div>

     <button className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase italic tracking-widest text-xs border border-red-500/20">{t.logout}</button>
  </div>
);

const ProfileItem = ({ icon, label, value, onClick, last }) => (
  <div onClick={onClick} className={`p-5 flex items-center justify-between cursor-pointer active:bg-king-blue/50 transition-colors ${!last ? 'border-b border-king-gold/5' : ''}`}>
     <div className="flex items-center gap-4">
        <span className="text-king-gold/50">{icon}</span>
        <span className="font-bold text-sm text-white/70">{label}</span>
     </div>
     <span className="font-black italic text-king-gold text-xs">{value}</span>
  </div>
);

const MapView = ({ t, isRtl }) => (
  <div className="h-[75vh] bg-king-blue-light rounded-[2.5rem] border border-king-gold/10 overflow-hidden relative">
     <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1,0,0/400x400?access_token=pk.ey')] bg-cover"></div>
     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-king-blue-deep/90"></div>

     <div className="absolute bottom-8 left-8 right-8 space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
           {['Dubai', 'Tokyo', 'Paris', 'Cairo'].map(city => (
             <button key={city} className="px-4 py-2 bg-king-gold/10 border border-king-gold/20 text-king-gold rounded-full text-[10px] font-black uppercase whitespace-nowrap">{city}</button>
           ))}
        </div>
        <div className="bg-king-blue/80 backdrop-blur-xl p-6 rounded-3xl border border-king-gold/20">
           <h3 className="font-black italic text-king-gold text-xl uppercase mb-2">Dubai International</h3>
           <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <div className="flex items-center gap-2"><Clock size={12}/> {t.localTime}: 22:45</div>
              <div className="flex items-center gap-2"><Landmark size={12}/> GMT+4</div>
           </div>
        </div>
     </div>
  </div>
);

const AdminPanelView = ({ t, isRtl, setView }) => (
  <div className="space-y-8 animate-in slide-in-from-top-10">
     <div className="flex items-center gap-4">
        <button onClick={() => setView('home')}><ArrowLeft size={24} className="text-king-gold"/></button>
        <h2 className="text-2xl font-black italic uppercase text-king-gold">{t.admin}</h2>
     </div>

     <div className="space-y-4">
        <div className="relative">
           <input type="text" placeholder={t.searchPassenger} className="w-full bg-king-blue-light border border-king-gold/20 rounded-2xl p-4 pl-12 outline-none focus:ring-1 focus:ring-king-gold text-sm" />
           <SearchIcon className="absolute left-4 top-4 text-king-gold/30" size={20} />
        </div>

        <div className="bg-king-blue-light rounded-[2.5rem] border border-king-gold/10 overflow-hidden">
           <div className="p-4 bg-king-gold/5 border-b border-king-gold/10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-king-gold tracking-widest">Pending Requests</span>
              <span className="w-5 h-5 bg-king-gold text-king-blue rounded-full flex items-center justify-center text-[10px] font-black">3</span>
           </div>
           {[1, 2].map(i => (
             <div key={i} className="p-4 flex items-center justify-between border-b border-king-gold/5 last:border-0">
                <div><p className="font-bold text-sm">Alghbsi</p><p className="text-king-gold font-black text-xs">5,000 Miles</p></div>
                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-king-gold text-king-blue rounded-xl text-[10px] font-black uppercase">{t.approve}</button>
                   <button className="px-4 py-2 bg-king-blue border border-red-500/30 text-red-500 rounded-xl text-[10px] font-black uppercase">{t.reject}</button>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-king-blue-light p-6 rounded-[2.5rem] border border-king-gold/10 space-y-4">
           <h3 className="font-black italic uppercase text-king-gold text-xs">{t.broadcast}</h3>
           <textarea placeholder={t.broadcastEn} className="w-full bg-king-blue border border-king-gold/10 rounded-2xl p-4 text-xs h-20 outline-none focus:ring-1 focus:ring-king-gold" />
           <textarea placeholder={t.broadcastAr} dir="rtl" className="w-full bg-king-blue border border-king-gold/10 rounded-2xl p-4 text-xs h-20 outline-none focus:ring-1 focus:ring-king-gold" />
           <button className="w-full py-4 bg-king-gold text-king-blue rounded-2xl font-black uppercase italic tracking-widest text-xs">{t.submit}</button>
        </div>
     </div>
  </div>
);

export default App;
