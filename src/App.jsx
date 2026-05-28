import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import {
  Plane, Globe, MessageSquare, User, Map as MapIcon, Shield, Bell,
  Settings, LogOut, ChevronRight, ArrowLeft, Camera, Image as ImageIcon,
  Video, Send, Check, Coins, Gift, RefreshCw, X, Menu, Phone, Mail,
  Lock, UserCircle, History, Info, Languages, Trash2, ShieldCheck,
  CheckCircle, AlertCircle, Clock, Cloud, Navigation, Landmark, CreditCard,
  Mic, MicOff, Search as SearchIcon, Users, Filter, Terminal, Radio, Heart
} from 'lucide-react';

// --- GIFTS DATA ---
const GIFTS = [
  { id: 'diamond', name: 'Diamond', icon: '💎', cost: 250 },
  { id: 'crown', name: 'Crown', icon: '👑', cost: 100 },
  { id: 'coin', name: 'Coin', icon: '🪙', cost: 150 },
  { id: 'chat', name: 'Chat', icon: '💬', cost: 50 },
  { id: 'jellyfish', name: 'Jellyfish', icon: '🪼', cost: 1500 },
  { id: 'star', name: 'Star', icon: '⭐', cost: 150 },
  { id: 'skull', name: 'Skull', icon: '💀', cost: 150 },
  { id: 'heart', name: 'Heart', icon: '❤️', cost: 150 },
  { id: 'cat', name: 'Cat', icon: '🐱', cost: 250 },
  { id: 'sad_bear', name: 'Sad Bear', icon: '🐻', cost: 40 },
  { id: 'astronaut', name: 'Astronaut', icon: '🧑‍🚀', cost: 500 },
  { id: 'octopus', name: 'Octopus', icon: '🐙', cost: 1500 },
  { id: 'big_heart', name: 'Big Heart', icon: '💝', cost: 50 },
  { id: 'fire', name: 'Fire', icon: '🔥', cost: 40 },
  { id: 'target', name: 'Target', icon: '🎯', cost: 40 },
  { id: 'dragon', name: 'Dragon', icon: '🐉', cost: 1500 },
  { id: 'laughing', name: 'Laughing', icon: '😂', cost: 20 },
  { id: 'popper', name: 'Popper', icon: '🎉', cost: 40 },
  { id: 'exploding', name: 'Exploding', icon: '🤯', cost: 40 },
  { id: 'love_emoji', name: 'Love Emoji', icon: '😍', cost: 20 },
  { id: 'two_bears', name: 'Two Bears', icon: '🧸🧸', cost: 100 },
  { id: 'flying_monkey', name: 'Flying Monkey', icon: '🐵', cost: 1000 }
];

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
    destination: "Destination", passengerSearch: "Passenger Manifest", logout: "Logout"
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
    destination: "الوجهة", passengerSearch: "كشف الركاب", logout: "تسجيل الخروج"
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
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('home');
  const [profile, setProfile] = useState(null);
  const [isFlightActive, setIsFlightActive] = useState(false);
  const [flightStage, setFlightStage] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [latestBroadcast, setLatestBroadcast] = useState(null);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserData(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchUserData(session.user.id);
      else setProfile(null);
    });

    // Listen for Global Broadcasts
    supabase.channel('broadcasts').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'broadcasts' },
      payload => setLatestBroadcast(payload.new)
    ).subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);

    supabase.channel('profile_realtime').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` },
      payload => setProfile(payload.new)
    ).subscribe();
  };

  const handleSendGift = async (gift, recipientId) => {
    if (!profile || profile.miles < gift.cost) {
      alert(isRtl ? 'رصيدك غير كافٍ!' : 'Insufficient balance!');
      return;
    }
    try {
      const { error } = await supabase.rpc('transfer_miles_gift', {
        sender_uuid: profile.id,
        recipient_uuid: recipientId,
        amount: gift.cost,
        g_id: gift.id
      });
      if (error) throw error;
      alert(isRtl ? `تم إرسال ${gift.name} بنجاح!` : `Sent ${gift.name} successfully!`);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="h-screen bg-king-blue flex flex-col items-center justify-center text-king-gold font-bold italic animate-pulse"><Plane size={48} className="mb-4" /> KING...</div>;

  if (!session) return <AuthView t={t} isRtl={isRtl} setSession={setSession} setLang={setLang} lang={lang} />;

  const triggerFlight = (msg, destination = 'Dubai') => {
    setCurrentMessage({ text: msg, destination });
    setIsFlightActive(true);
    setFlightStage(0);
    setTimeout(() => setFlightStage(1), 2000);
    setTimeout(() => setFlightStage(1.5), 4000); // More Facts
    setTimeout(() => setFlightStage(2), 6000);
    setTimeout(() => {
      setIsFlightActive(false);
      if (view !== 'chat_detail') setView('chat_detail');
    }, 8000);
  };

  return (
    <div className={`min-h-screen ${isRtl ? 'rtl' : 'ltr'} bg-king-blue text-white font-sans selection:bg-king-gold/30`}>
      {isFlightActive ? (
        <FlightSimulation stage={flightStage} t={t} message={currentMessage} isRtl={isRtl} lang={lang} />
      ) : (
        <>
          {latestBroadcast && (
            <div className="fixed top-0 left-0 right-0 z-[60] bg-king-gold text-king-blue p-3 flex items-center justify-between animate-in slide-in-from-top duration-500">
               <div className="flex items-center gap-3">
                  <Bell size={18} className="animate-bounce" />
                  <p className="text-xs font-black italic uppercase">{lang === 'ar' ? latestBroadcast.content_ar : latestBroadcast.content_en}</p>
               </div>
               <button onClick={() => setLatestBroadcast(null)}><X size={18}/></button>
            </div>
          )}
          <Header t={t} profile={profile} setView={setView} isRtl={isRtl} />
          <main className="pb-24 pt-16 px-4 max-w-lg mx-auto">
            {renderView({ view, setView, t, isRtl, profile, triggerFlight, setLang, lang, handleSendGift })}
          </main>
          <Navbar view={view} setView={setView} t={t} />
        </>
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
       {profile?.role === 'admin' && <button onClick={() => setView('admin')} className="text-king-gold/50 hover:text-king-gold"><Terminal size={20}/></button>}
       <Bell size={20} className="text-king-gold/50 cursor-pointer" />
       <div onClick={() => setView('profile')} className="w-8 h-8 rounded-full border-2 border-king-gold/30 overflow-hidden cursor-pointer bg-king-blue-light">
          {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : <User size={16} className="m-auto mt-1 text-king-gold/50"/>}
       </div>
    </div>
  </header>
);

const Navbar = ({ view, setView, t }) => (
  <nav className="fixed bottom-0 left-0 right-0 h-20 bg-king-blue-deep border-t border-king-gold/10 z-40 px-8 flex items-center justify-between">
     <NavBtn active={view === 'home'} icon={<Plane size={24}/>} label={t.home} onClick={() => setView('home')} />
     <NavBtn active={view === 'map'} icon={<Globe size={24}/>} label={t.map} onClick={() => setView('map')} />
     <NavBtn active={view === 'chat' || view === 'chat_detail'} icon={<MessageSquare size={24}/>} label={t.chat} onClick={() => setView('chat')} />
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
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let email = id;

      // 1. Resolve Demo/Username to Email if needed
      if (id === 'king_dev') {
        email = 'king@gmail.com';
        if (password === 'king2024') { /* Bypass for testing if needed, but let's stick to real auth */ }
      }
      else if (id === 'alghbsi' || id === 'King7star') {
        email = 'alghbsi@gmail.com';
      }
      else if (!id.includes('@')) {
        // Assume ID is a username or phone, try to find the email
        const { data: profileData } = await supabase.from('profiles').select('email').or(`username.eq.${id},phone.eq.${id}`).maybeSingle();
        if (profileData?.email) email = profileData.email;
      }

      const { error, data } = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email, password,
            options: {
              emailRedirectTo: window.location.origin,
              data: { username: username || id, full_name: username || id }
            }
          });

      if (error) throw error;
      if (data.session) setSession(data.session);
      else if (!isLogin) alert(isRtl ? 'تم إنشاء الحساب بنجاح! يرجى تفعيل بريدك الإلكتروني' : 'Account created! Please check your email to verify');
    } catch (err) {
      alert(isRtl ? `خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
  };

  const handlePhoneLogin = async () => {
    const phone = prompt(isRtl ? 'أدخل رقم الهاتف (مع رمز الدولة):' : 'Enter phone number (with country code):');
    if (!phone) return;
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) alert(error.message);
    else alert(isRtl ? 'تم إرسال رمز التحقق إلى هاتفك' : 'Verification code sent to your phone');
  };

  return (
    <div className={`min-h-screen bg-king-blue flex flex-col items-center justify-center p-8 ${isRtl ? 'rtl' : 'ltr'}`}>
       <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="absolute top-8 right-8 bg-king-gold/10 text-king-gold px-4 py-2 rounded-full font-bold flex items-center gap-2 border border-king-gold/20"><Languages size={18}/> {lang === 'en' ? 'العربية' : 'English'}</button>

       <div className="mb-12 text-center">
          <div className="w-20 h-20 bg-king-gold rounded-3xl flex items-center justify-center text-king-blue mx-auto mb-6 shadow-2xl shadow-king-gold/20 rotate-3">
             <Plane size={48} className="-rotate-12" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter text-king-gold mb-2">{t.appTitle}</h1>
          <p className="text-king-gold/50 font-bold uppercase tracking-widest text-xs">{t.boarding}</p>
       </div>

       <form onSubmit={handleAuth} className="w-full max-w-sm space-y-4">
          {!isLogin && <input type="text" placeholder="Username" className="w-full bg-king-blue-light border border-king-gold/20 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-king-gold text-white" value={username} onChange={e => setUsername(e.target.value)} />}
          <input type="text" placeholder={t.email} className="w-full bg-king-blue-light border border-king-gold/20 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-king-gold text-white" value={id} onChange={e => setId(e.target.value)} />
          <input type="password" placeholder={t.password} className="w-full bg-king-blue-light border border-king-gold/20 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-king-gold text-white" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="w-full py-4 bg-king-gold text-king-blue rounded-2xl font-black italic uppercase tracking-tighter text-lg shadow-xl shadow-king-gold/20 active:scale-95 transition-all">{loading ? '...' : (isLogin ? t.login : t.signup)}</button>
       </form>

       <div className="w-full max-w-sm mt-8 space-y-3">
          <button onClick={handleGoogle} className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all text-sm">
             <img src="https://www.google.com/favicon.ico" className="w-4 h-4" /> {t.googleLogin}
          </button>
          <button onClick={handlePhoneLogin} className="w-full py-4 bg-king-blue-light border border-king-gold/20 text-king-gold rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all text-sm">
             <Phone size={18} /> {t.phoneLogin}
          </button>
          <button onClick={() => setSession({ user: { id: '00000000-0000-0000-0000-000000000000' } })} className="w-full py-2 text-king-gold/40 font-bold uppercase text-[10px] tracking-widest hover:text-king-gold transition-colors">{t.guestLogin}</button>
       </div>

       <button onClick={() => setIsLogin(!isLogin)} className="mt-8 text-king-gold/50 font-bold uppercase text-[10px] tracking-widest">{isLogin ? t.signup : t.login}</button>
    </div>
  );
};

const FlightSimulation = ({ stage, t, message, isRtl, lang }) => {
  const destKey = message?.destination || 'Dubai';
  const cityData = DESTINATIONS[destKey] || DESTINATIONS.Dubai;

  return (
    <div className="h-screen bg-king-blue-deep flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
       <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-king-gold via-transparent to-transparent"></div>
       </div>

       {stage === 0 && (
         <div className="space-y-8 animate-in slide-in-from-bottom-20 duration-1000">
            <Plane size={120} className="text-king-gold mx-auto animate-bounce" />
            <h2 className="text-4xl font-black italic text-king-gold uppercase tracking-tighter">{t.takeoff}</h2>
         </div>
       )}

       {(stage === 1 || stage === 1.5) && (
         <div className="space-y-12 animate-in zoom-in duration-1000 max-w-sm">
            <div className="relative">
               <Cloud size={160} className="text-white/5 mx-auto" />
               <Plane size={48} className="text-king-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="bg-king-blue-light p-6 rounded-[2rem] border border-king-gold/20 space-y-4">
               <div className="flex items-center justify-between text-king-gold text-[10px] font-black uppercase">
                  <span>{lang === 'ar' ? cityData.ar : cityData.en}</span>
                  <span>{cityData.gmt} | 24°C</span>
               </div>
               <p className="text-sm italic leading-relaxed text-white/80">"{lang === 'ar' ? cityData.facts.ar : cityData.facts.en}"</p>
               <div className="flex items-center gap-2 text-king-gold/50 text-[10px] font-bold uppercase tracking-widest">
                  <Clock size={12}/> <span>{t.cruising}</span>
               </div>
            </div>
         </div>
       )}

       {stage === 2 && (
         <div className="space-y-8 animate-in slide-in-from-top-20 duration-1000">
            <Plane size={120} className="text-king-gold mx-auto rotate-45" />
            <h2 className="text-4xl font-black italic text-king-gold uppercase tracking-tighter">{t.landing}</h2>
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
    case 'live': return <LiveStreamView {...props} />;
    case 'collect': return <CollectView {...props} />;
    case 'profile': return <ProfileView {...props} />;
    case 'admin': return <AdminPanelView {...props} />;
    default: return <HomeView {...props} />;
  }
};

const HomeView = ({ t, triggerFlight, setView }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
     <div className="bg-king-gold p-8 rounded-[2.5rem] text-king-blue shadow-2xl shadow-king-gold/20 relative overflow-hidden group">
        <Plane size={120} className="absolute -right-8 -top-8 text-king-blue-deep/5 -rotate-12 group-hover:translate-x-4 transition-transform" />
        <h2 className="text-4xl font-black italic tracking-tighter mb-2 uppercase">{t.appTitle} Radar</h2>
        <div className="flex justify-between items-end">
           <p className="text-king-blue/60 font-bold text-xs uppercase tracking-widest">Active Flights: 1,482</p>
           <button onClick={() => setView('live')} className="bg-king-blue text-king-gold px-4 py-2 rounded-xl font-black italic text-[10px] uppercase shadow-lg shadow-black/20 flex items-center gap-2 active:scale-95 transition-all"><Radio size={12}/> Live Flight</button>
        </div>
     </div>

     <div className="space-y-4">
        <h3 className="font-black italic uppercase text-king-gold flex items-center gap-2"><Navigation size={18}/> Live Manifest</h3>
        {[
          {id: 1, name: 'Passenger_1', dest: 'Tokyo'},
          {id: 2, name: 'Passenger_2', dest: 'Paris'},
          {id: 3, name: 'Passenger_3', dest: 'Cairo'}
        ].map(p => (
          <div key={p.id} onClick={() => triggerFlight(`Hello from ${p.name}`, p.dest)} className="bg-king-blue-light border border-king-gold/10 p-4 rounded-2xl flex items-center justify-between hover:border-king-gold/50 transition-all cursor-pointer">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-king-blue flex items-center justify-center font-black text-king-gold">{p.name[0]}</div>
                <div><p className="font-bold text-sm">{p.name}</p><p className="text-[10px] text-king-gold/50 uppercase">Flying to {p.dest}</p></div>
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

const ChatDetailView = ({ setView, t, triggerFlight, isRtl, handleSendGift, profile }) => {
  const [text, setText] = useState('');
  const [showOriginal, setShowOriginal] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages
    supabase.from('messages').select('*').order('created_at', { ascending: true })
      .then(({data}) => data && setMessages(data));

    // Listen for new messages
    const channel = supabase.channel('chat_room').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' },
      payload => setMessages(prev => [...prev, payload.new])
    ).subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !profile?.id) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${profile.id}/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('king_media').upload(filePath, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('king_media').getPublicUrl(filePath);
      triggerFlight(`Sent a file: ${publicUrl}`);
      setMessages([...messages, { id: Date.now(), text: "Shared a file", media: publicUrl, isSender: true }]);
    } catch (err) { alert(err.message); } finally { setUploading(false); }
  };

  return (
    <div className="h-[80vh] flex flex-col relative">
       <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setView('chat')}><ArrowLeft size={24} className="text-king-gold"/></button>
          <h2 className="font-black italic text-xl uppercase tracking-tighter">Captain Alghbsi</h2>
       </div>

       <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar py-4">
          {messages.map(msg => {
            const isVideo = msg.media && (msg.media.toLowerCase().endsWith('.mp4') || msg.media.toLowerCase().endsWith('.webm'));
            return (
              <div key={msg.id} className={`max-w-[85%] p-4 rounded-[2rem] border border-king-gold/10 ${msg.isSender ? (isRtl ? 'mr-auto bg-king-blue-light' : 'ml-auto bg-king-blue-light') : (isRtl ? 'ml-auto bg-king-blue-deep' : 'mr-auto bg-king-blue-deep')}`}>
                 {msg.media ? (
                    isVideo ? (
                      <video src={msg.media} controls className="w-full rounded-2xl mb-2 max-h-60 object-cover" />
                    ) : (
                      <img src={msg.media} className="w-full rounded-2xl mb-2" />
                    )
                 ) : (
                    <p className="text-sm leading-relaxed">{showOriginal && msg.original ? msg.original : msg.text}</p>
                 )}
                 {msg.original && <button onClick={() => setShowOriginal(!showOriginal)} className="mt-2 text-[8px] font-black uppercase text-king-gold/40 border border-king-gold/20 px-2 py-0.5 rounded-full">{showOriginal ? t.translate : t.original}</button>}
              </div>
            );
          })}
       </div>

       {showGifts && (
         <div className="absolute inset-0 z-50 bg-king-blue-deep/95 backdrop-blur-md rounded-3xl p-6 animate-in slide-in-from-bottom-20 flex flex-col border border-king-gold/20">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-black italic text-king-gold uppercase text-sm">Terminal Gifts</h3>
               <button onClick={() => setShowGifts(false)} className="text-king-gold/50"><X size={20}/></button>
            </div>
            <div className="grid grid-cols-4 gap-3 overflow-y-auto no-scrollbar pb-8">
               {GIFTS.map(gift => (
                 <button key={gift.id} onClick={() => { handleSendGift(gift, 'captain-id'); setShowGifts(false); }} className="flex flex-col items-center gap-1 group">
                    <div className="w-12 h-12 bg-king-blue-light rounded-xl border border-king-gold/10 flex items-center justify-center text-2xl group-active:scale-90 transition-all">{gift.icon}</div>
                    <p className="text-[6px] font-black uppercase text-white/50">{gift.name}</p>
                    <p className="text-[8px] font-black text-king-gold italic">{gift.cost} M</p>
                 </button>
               ))}
            </div>
         </div>
       )}

       <div className="flex items-center gap-2 bg-king-blue-deep/50 p-2 rounded-full border border-king-gold/10 mt-4">
          <button onClick={() => setShowGifts(true)} className="w-10 h-10 bg-king-gold/10 rounded-full flex items-center justify-center text-king-gold active:scale-90 transition-all"><Gift size={18}/></button>
          <label className="w-10 h-10 bg-king-gold/10 rounded-full flex items-center justify-center text-king-gold active:scale-90 transition-all cursor-pointer">
             <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
             {uploading ? <RefreshCw size={18} className="animate-spin" /> : <ImageIcon size={18}/>}
          </label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent px-2 outline-none text-sm placeholder:text-king-gold/20" />
          <button
            onClick={async () => {
              if(text.trim()){
                triggerFlight(text);
                await supabase.from('messages').insert({
                  sender_id: profile.id,
                  content: text,
                  flight_state: 'arrived'
                });
                setText('');
              }
            }}
            className="w-10 h-10 bg-king-gold rounded-full flex items-center justify-center text-king-blue active:scale-90 transition-all"
          >
            <Send size={18}/>
          </button>
       </div>
    </div>
  );
};

const CollectView = ({ t, isRtl, profile }) => (
  <div className="space-y-6 animate-in slide-in-from-bottom-10">
     <h2 className="text-2xl font-black italic uppercase text-king-gold">{t.collect}</h2>
     <div className="bg-gradient-to-br from-king-gold to-king-gold-dim p-8 rounded-[2.5rem] text-king-blue shadow-xl">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Total Balance</p>
        <p className="text-5xl font-black italic tracking-tighter">{profile?.miles || '1,000'} <span className="text-lg uppercase">Miles</span></p>
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
             <button key={amt} onClick={async () => {
                const { error } = await supabase.from('funding_requests').insert({ user_id: profile.id, amount: amt });
                if(!error) alert(isRtl ? 'تم إرسال الطلب' : 'Request Sent');
             }} className="py-3 bg-king-blue border border-king-gold/10 rounded-2xl font-black text-king-gold hover:bg-king-gold hover:text-king-blue transition-all">{amt}</button>
           ))}
        </div>
        <button className="w-full py-4 bg-king-gold/10 text-king-gold rounded-2xl font-black uppercase italic tracking-widest text-xs border border-king-gold/20">{t.submit}</button>
     </div>
  </div>
);

const ProfileView = ({ t, profile, isRtl, setLang, lang }) => {
  const handleUpdate = async (field, value, type) => {
    // Enforcement of Server-Side matching rate limits
    const now = new Date();
    const lastUpdate = new Date(profile[`last_${type}_update`] || 0);
    const diff = now - lastUpdate;
    const limits = { avatar: 86400000, name: 604800000, username: 2592000000 }; // 1d, 1w, 1mo

    if (diff < limits[type]) {
      const remainingHours = Math.ceil((limits[type] - diff)/3600000);
      alert(isRtl
        ? `عذراً، لا يمكنك تحديث الـ ${type} إلا مرة واحدة كل فترة. يرجى المحاولة بعد ${remainingHours} ساعة.`
        : `${t.rateLimit} ${remainingHours} hours.`);
      return;
    }

    try {
      const updates = { [field]: value, [`last_${type}_update`]: now.toISOString(), updated_at: now.toISOString() };
      const { error } = await supabase.from('profiles').update(updates).eq('id', profile.id);
      if (error) throw error;
      alert(isRtl ? 'تم التحديث بنجاح!' : 'Profile updated successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="text-center space-y-4">
          <div className="w-32 h-32 rounded-[2.5rem] bg-king-blue-light border-2 border-king-gold mx-auto overflow-hidden relative group">
             {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-king-gold font-black text-4xl">K</div>}
             <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <input type="file" className="hidden" onChange={async (e) => {
                   const file = e.target.files[0];
                   const { data } = await supabase.storage.from('avatars').upload(`${profile.id}/${Date.now()}`, file);
                   if (data) handleUpdate('avatar_url', supabase.storage.from('avatars').getPublicUrl(data.path).data.publicUrl, 'avatar');
                }} />
                <Camera size={24}/>
             </label>
          </div>
          <div>
             <h2 className="text-3xl font-black italic text-king-gold uppercase tracking-tighter">{profile?.username || 'Passenger'}</h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-king-gold/40">Role: {profile?.role}</p>
          </div>
       </div>

       <div className="bg-king-blue-light rounded-[2.5rem] border border-king-gold/10 overflow-hidden">
          <ProfileItem icon={<Mail size={18}/>} label="Email" value={profile?.email} />
          <ProfileItem icon={<Languages size={18}/>} label={t.language} value={lang === 'en' ? 'English' : 'العربية'} onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} />
          <ProfileItem icon={<ShieldCheck size={18}/>} label="Account Status" value="Verified" last />
       </div>

       <button onClick={() => supabase.auth.signOut()} className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase italic tracking-widest text-xs border border-red-500/20">{t.logout}</button>
    </div>
  );
};

const ProfileItem = ({ icon, label, value, onClick, last }) => (
  <div onClick={onClick} className={`p-5 flex items-center justify-between cursor-pointer active:bg-king-blue/50 transition-colors ${!last ? 'border-b border-king-gold/5' : ''}`}>
     <div className="flex items-center gap-4">
        <span className="text-king-gold/50">{icon}</span>
        <span className="font-bold text-sm text-white/70">{label}</span>
     </div>
     <span className="font-black italic text-king-gold text-xs">{value || '...'}</span>
  </div>
);

const DESTINATIONS = {
  Dubai: { ar: 'دبي', en: 'Dubai', facts: { ar: 'برج خليفة هو أطول مبنى في العالم.', en: 'Burj Khalifa is the world\'s tallest building.' }, gmt: 'GMT+4' },
  Tokyo: { ar: 'طوكيو', en: 'Tokyo', facts: { ar: 'طوكيو هي المدينة الأكثر ازدحاماً في العالم.', en: 'Tokyo is the most populous city in the world.' }, gmt: 'GMT+9' },
  Paris: { ar: 'باريس', en: 'Paris', facts: { ar: 'برج إيفل يزورها ملايين السياح سنوياً.', en: 'Eiffel Tower attracts millions of tourists every year.' }, gmt: 'GMT+1' },
  Cairo: { ar: 'القاهرة', en: 'Cairo', facts: { ar: 'الأهرامات عمرها أكثر من 4500 عام.', en: 'The pyramids are over 4,500 years old.' }, gmt: 'GMT+2' }
};

const MapView = ({ t, isRtl, lang }) => {
  const [selectedCity, setSelectedCity] = useState('Dubai');
  const cityData = DESTINATIONS[selectedCity];

  return (
    <div className="h-[75vh] bg-king-blue-light rounded-[2.5rem] border border-king-gold/10 overflow-hidden relative">
       {/* Dynamic Map Visualization (SVG based for instant translation) */}
       <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <Globe size={300} className="text-king-gold animate-pulse" />
       </div>
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-king-blue-deep/20 to-king-blue-deep/90"></div>

       <div className="absolute inset-0 p-8 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-auto">
             {Object.keys(DESTINATIONS).map(city => (
               <button
                 key={city}
                 onClick={() => setSelectedCity(city)}
                 className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all border ${selectedCity === city ? 'bg-king-gold text-king-blue border-king-gold' : 'bg-king-gold/5 text-king-gold border-king-gold/20'}`}
               >
                  {lang === 'ar' ? DESTINATIONS[city].ar : city}
               </button>
             ))}
          </div>

          <div className="bg-king-blue/80 backdrop-blur-xl p-6 rounded-3xl border border-king-gold/20 animate-in slide-in-from-bottom-10">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="font-black italic text-king-gold text-2xl uppercase mb-1">{lang === 'ar' ? cityData.ar : cityData.en}</h3>
                   <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      <Landmark size={12} className="text-king-gold" /> {cityData.gmt}
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-king-gold uppercase mb-1">{t.localTime}</p>
                   <p className="text-xl font-black italic">22:45</p>
                </div>
             </div>

             <div className="bg-king-gold/5 p-4 rounded-2xl border border-king-gold/10">
                <p className="text-[8px] font-black uppercase text-king-gold tracking-widest mb-2 flex items-center gap-2">
                   <Info size={10}/> {t.culturalFact}
                </p>
                <p className="text-sm italic leading-relaxed text-white/80">"{lang === 'ar' ? cityData.facts.ar : cityData.facts.en}"</p>
             </div>
          </div>
       </div>
    </div>
  );
};

const LiveStreamView = ({ t, setView, isRtl, handleSendGift, profile }) => {
  const [showGifts, setShowGifts] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(s => {
      if (videoRef.current) videoRef.current.srcObject = s;
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
       <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-60" />
       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

       <div className="relative z-10 p-6 flex justify-between items-start">
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10">
             <div className="w-10 h-10 rounded-xl bg-king-gold flex items-center justify-center text-king-blue font-black">C</div>
             <div>
                <p className="text-xs font-black text-white">Captain Alghbsi</p>
                <div className="flex items-center gap-1 text-[8px] font-bold text-king-gold uppercase tracking-widest"><Radio size={8} className="animate-pulse"/> Live Flight</div>
             </div>
          </div>
          <button onClick={() => setView('home')} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10"><X size={20}/></button>
       </div>

       <div className="mt-auto relative z-10 p-6 space-y-4 pb-12">
          <div className="h-48 overflow-y-auto no-scrollbar space-y-2">
             {[1, 2].map(i => (
               <div key={i} className={`flex items-start gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="font-black text-[10px] text-king-gold">Passenger_{i}:</span>
                  <p className="text-[10px] text-white/80 bg-black/20 px-2 py-1 rounded-lg">Smooth flight Captain! ✈️</p>
               </div>
             ))}
          </div>

          <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
             <input type="text" placeholder="Terminal Chat..." className="flex-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 text-xs text-white outline-none" />
             <button onClick={() => setShowGifts(true)} className="w-12 h-12 bg-king-gold rounded-full flex items-center justify-center text-king-blue shadow-xl shadow-king-gold/20 active:scale-90 transition-all"><Gift size={22}/></button>
          </div>
       </div>

       {showGifts && (
         <div className="absolute inset-0 z-50 bg-king-blue-deep/95 backdrop-blur-md p-8 animate-in slide-in-from-bottom-20 flex flex-col">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h3 className="font-black italic text-king-gold text-xl uppercase tracking-tighter">Luxury Terminal Gifts</h3>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Balance: {profile?.miles || 0} Miles</p>
               </div>
               <button onClick={() => setShowGifts(false)} className="text-king-gold/50"><X size={28}/></button>
            </div>
            <div className="grid grid-cols-4 gap-6 overflow-y-auto no-scrollbar pb-12">
               {GIFTS.map(gift => (
                 <button key={gift.id} onClick={() => { handleSendGift(gift, 'captain-id'); setShowGifts(false); }} className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 bg-king-blue-light rounded-3xl border border-king-gold/10 flex items-center justify-center text-4xl group-active:scale-90 transition-all group-hover:border-king-gold/50 shadow-lg">{gift.icon}</div>
                    <p className="text-[10px] font-black uppercase text-white/60">{gift.name}</p>
                    <p className="text-[12px] font-black text-king-gold italic">{gift.cost} M</p>
                 </button>
               ))}
            </div>
         </div>
       )}
    </div>
  );
};

const AdminPanelView = ({ t, isRtl, setView }) => {
  const [passengers, setPassengers] = useState([]);
  const [search, setSearch] = useState('');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
       let query = supabase.from('profiles').select('*');
       if (search) {
          query = query.or(`username.ilike.%${search}%,full_name.ilike.%${search}%`);
       }
       const { data: profs } = await query.limit(10);
       if (profs) setPassengers(profs);

       const { data: reqs } = await supabase.from('funding_requests').select('*, profiles(username)').eq('status', 'pending');
       if (reqs) setRequests(reqs);
    };
    fetchAdminData();
  }, [search]);

  const handleFunding = async (id, userId, amount, status) => {
    try {
      if (status === 'approved') {
         const { error: rpcError } = await supabase.rpc('add_miles', { user_id: userId, amount });
         if (rpcError) throw rpcError;
      }
      const { error: updateError } = await supabase.from('funding_requests').update({ status }).eq('id', id);
      if (updateError) throw updateError;

      setRequests(requests.filter(r => r.id !== id));
      alert(isRtl ? 'تم تحديث الطلب بنجاح' : 'Request updated successfully');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-top-10 pb-20">
       <div className="flex items-center gap-4">
          <button onClick={() => setView('home')}><ArrowLeft size={24} className="text-king-gold"/></button>
          <h2 className="text-2xl font-black italic uppercase text-king-gold tracking-tighter">Control Tower</h2>
       </div>

       <div className="space-y-6">
          <div className="relative">
             <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t.searchPassenger} className="w-full bg-king-blue-light border border-king-gold/20 rounded-2xl p-4 pl-12 outline-none focus:ring-1 focus:ring-king-gold text-sm" />
             <SearchIcon className="absolute left-4 top-4 text-king-gold/30" size={20} />
          </div>

          <div className="bg-king-blue-light rounded-[2.5rem] border border-king-gold/10 overflow-hidden">
             <div className="p-4 bg-king-gold/5 border-b border-king-gold/10">
                <span className="text-[10px] font-black uppercase text-king-gold tracking-widest">Passenger Manifest ({passengers.length})</span>
             </div>
             <div className="max-h-48 overflow-y-auto no-scrollbar">
                {passengers.map(p => (
                  <div key={p.id} className="p-4 flex items-center justify-between border-b border-king-gold/5 last:border-0">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-king-blue flex items-center justify-center text-king-gold font-black text-xs">{p.username?.[0].toUpperCase()}</div>
                        <div><p className="font-bold text-xs">{p.username}</p><p className="text-[8px] text-white/40 uppercase">{p.role}</p></div>
                     </div>
                     <span className="text-[10px] font-black text-king-gold">{p.miles} M</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-king-blue-light rounded-[2.5rem] border border-king-gold/10 overflow-hidden">
             <div className="p-4 bg-king-gold/5 border-b border-king-gold/10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-king-gold tracking-widest">Funding Requests</span>
                <span className="w-5 h-5 bg-king-gold text-king-blue rounded-full flex items-center justify-center text-[10px] font-black">{requests.length}</span>
             </div>
             {requests.map(req => (
               <div key={req.id} className="p-4 flex items-center justify-between border-b border-king-gold/5 last:border-0">
                  <div><p className="font-bold text-sm">{req.profiles?.username}</p><p className="text-king-gold font-black text-xs">{req.amount} Miles</p></div>
                  <div className="flex gap-2">
                     <button onClick={() => handleFunding(req.id, req.user_id, req.amount, 'approved')} className="px-4 py-2 bg-king-gold text-king-blue rounded-xl text-[10px] font-black uppercase">{t.approve}</button>
                     <button onClick={() => handleFunding(req.id, req.user_id, req.amount, 'rejected')} className="px-4 py-2 bg-king-blue border border-red-500/30 text-red-500 rounded-xl text-[10px] font-black uppercase">{t.reject}</button>
                  </div>
               </div>
             ))}
          </div>

          <div className="bg-king-blue-light p-6 rounded-[2.5rem] border border-king-gold/10 space-y-4">
             <h3 className="font-black italic uppercase text-king-gold text-xs">{t.broadcast}</h3>
             <textarea id="broadcastEn" placeholder={t.broadcastEn} className="w-full bg-king-blue border border-king-gold/10 rounded-2xl p-4 text-xs h-20 outline-none focus:ring-1 focus:ring-king-gold" />
             <textarea id="broadcastAr" placeholder={t.broadcastAr} dir="rtl" className="w-full bg-king-blue border border-king-gold/10 rounded-2xl p-4 text-xs h-20 outline-none focus:ring-1 focus:ring-king-gold" />
             <button onClick={async () => {
                const en = document.getElementById('broadcastEn').value;
                const ar = document.getElementById('broadcastAr').value;
                if (!en || !ar) return;
                const { error } = await supabase.from('broadcasts').insert({
                  content_en: en,
                  content_ar: ar,
                  admin_id: passengers.find(p => p.role === 'admin')?.id || null
                });
                if(!error) {
                  alert(isRtl ? 'تم إرسال البث العالمي!' : 'Global broadcast sent!');
                  document.getElementById('broadcastEn').value = '';
                  document.getElementById('broadcastAr').value = '';
                }
             }} className="w-full py-4 bg-king-gold text-king-blue rounded-2xl font-black uppercase italic tracking-widest text-xs">{t.submit}</button>
          </div>
       </div>
    </div>
  );
};

export default App;
