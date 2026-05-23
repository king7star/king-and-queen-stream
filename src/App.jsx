import React, { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Heart,
  Rss,
  Store,
  User,
  Search,
  MessageCircle,
  Video,
  Plus,
  ArrowLeft,
  ChevronRight,
  Pencil,
  Shield,
  UserX,
  History,
  CreditCard,
  Settings,
  HelpCircle,
  FileText,
  Trash2,
  LogOut,
  RefreshCw,
  Mic,
  MicOff,
  X,
  Package,
  Globe,
  Eye,
  CheckCircle2,
  AlertCircle,
  Gift,
  Radio,
  ChevronDown,
  Monitor,
  Camera,
  Lock,
  Users as UsersIcon,
  Globe2,
  MessageSquare,
  MessageSquareOff,
  Image as ImageIcon,
  Zap,
  ShieldCheck,
  TrendingUp,
  Bell
} from 'lucide-react';

// --- TRANSLATIONS ---
const translations = {
  en: {
    appTitle: "KING LIVE QUEEN",
    home: "Home",
    following: "Following",
    feed: "Feed",
    store: "Store",
    profile: "Profile",
    settings: "Settings",
    searchPlaceholder: "Search...",
    emptyState: "Humph! It looks like no one is here",
    startLive: "Start Live",
    createPost: "Create Post",
    walletBalance: "Wallet Balance",
    rechargeOptions: "Recharge Options",
    extra: "Extra",
    posts: "Posts",
    followers: "Followers",
    following_count: "Following",
    location: "Location",
    gender: "Gender",
    bio: "Bio",
    editProfile: "Edit Profile",
    privacy: "Privacy",
    blockedUsers: "Blocked Users",
    transactions: "Transactions",
    withdrawal: "Withdrawal",
    chatMods: "Chat Moderators",
    pastStreams: "Past Streams",
    language: "Language",
    contentExp: "Content Experience",
    support: "Contact Support",
    tos: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    dangerZone: "Danger Zone",
    deleteAccount: "Delete Account",
    logout: "Logout",
    cancel: "Cancel",
    confirmLogout: "Are you sure you want to logout?",
    deleteConfirm: "Are you sure you want to delete your account? This action is permanent.",
    birthDate: "Birth Date",
    country: "Country",
    save: "Save Changes",
    whoCanSeeBirth: "Who can see your birthday?",
    whoCanSeeStatus: "Who can see your online status?",
    whoCanMessage: "Who can message you?",
    anyone: "Anyone",
    friends: "Friends Only",
    noOne: "No one",
    blockEmpty: "People you block will appear here so you can decide who to forgive or judge forever!",
    withdrawalEquiv: "Every 100 coins = $0.4",
    withdrawAmount: "Amount to withdraw",
    paymentMethod: "Payment Method",
    withdrawAction: "Withdraw",
    sensitiveContent: "Show potentially sensitive content (NSFW)",
    start: "Start",
    connecting: "Connecting...",
    viewers: "Viewers",
    male: "Male ♂️",
    female: "Female ♀️",
    quality: "Quality",
    premium: "Premium",
    premiumNote: "Switching to Premium allows you to earn money from your content",
    entryTicket: "Entry Ticket",
    whoCanJoin: "Who can join?",
    whoCanComment: "Who can comment?",
    chatDisabled: "Chat Disabled",
    anybodyNote: "Anyone you haven't blocked will be able to join",
    anybodyCommentNote: "Anyone will be able to comment",
    thumbnail: "Thumbnail",
    update: "Update",
    nsfwNote: "Tagging as NSFW will inform people and let them decide to risk joining or not",
    admin: "Admin Dashboard",
    adminTitle: "KI👑NG ADMIN PORTAL",
    userManagement: "User Management",
    sendNotification: "Send Push Notification",
    broadcast: "Broadcast Message"
  },
  ar: {
    appTitle: "KING LIVE QUEEN",
    home: "الرئيسية",
    following: "أتابعهم",
    feed: "الخلاصة",
    store: "المتجر",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    searchPlaceholder: "بحث...",
    emptyState: "همف! يبدو أنه لا يوجد أحد",
    startLive: "بث مباشر",
    createPost: "إنشاء منشور",
    walletBalance: "رصيد المحفظة الحالي",
    rechargeOptions: "خيارات الشحن",
    extra: "!إضافي",
    posts: "المنشورات",
    followers: "المتابعون",
    following_count: "يتابع",
    location: "الموقع",
    gender: "الجنس",
    bio: "السيرة الذاتية",
    editProfile: "تحديث الملف الشخصي",
    privacy: "خصوصية الحساب",
    blockedUsers: "المستخدمون المحظورون",
    transactions: "سجل المعاملات",
    withdrawal: "سحب الأرباح",
    chatMods: "مشرفو الدردشة",
    pastStreams: "البثوث السابقة",
    language: "اللغة",
    contentExp: "تجربة المحتوى",
    support: "الاتصال بالدعم",
    tos: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    dangerZone: "منطقة الخطر",
    deleteAccount: "حذف الحساب",
    logout: "تسجيل الخروج",
    cancel: "إلغاء",
    confirmLogout: "هل أنت متأكد من أنك تريد تسجيل الخروج؟",
    deleteConfirm: "هل أنت متأكد من رغبتك في حذف حسابك؟ هذا الإجراء نهائي ولا يمكن التراجع عنه...",
    birthDate: "تاريخ الميلاد",
    country: "البلد",
    save: "حفظ التعديلات",
    whoCanSeeBirth: "من يمكنه رؤية تاريخ ميلادك؟",
    whoCanSeeStatus: "من يمكنه رؤية آخر ظهور لك وحالتك على الإنترنت؟",
    whoCanMessage: "من يمكنه إرسال رسائل إليك؟",
    anyone: "أي شخص",
    friends: "الأصدقاء فقط",
    noOne: "لا أحد",
    blockEmpty: "سيظهر الأشخاص الذين تحظرهم لتتمكن من تحديد من يجب مسامحته بلطف أو من يجب الحكم عليه بالخلود إلى الأبد!",
    withdrawalEquiv: "كل 100 عملة تساوي 0.4$",
    withdrawAmount: "كمية العملات المراد سحبها",
    paymentMethod: "طريقة السحب",
    withdrawAction: "سحب",
    sensitiveContent: "إظهار المحتوى الذي يحتمل أن يكون حساساً (NSFW)",
    start: "ابدأ",
    connecting: "جاري الاتصال...",
    viewers: "مشاهد",
    male: "ذكر ♂️",
    female: "أنثى ♀️",
    quality: "الجودة",
    premium: "مميز",
    premiumNote: "يسمح لك التبديل إلى مميز بكسب المال من محتواك",
    entryTicket: "تذكرة الدخول",
    whoCanJoin: "من يمكنه الانضمام؟",
    whoCanComment: "من يمكنه التعليق؟",
    chatDisabled: "الدردشة معطلة للتحكم التام",
    anybodyNote: "سيتمكن أي شخص لم تقم بحظره من الانضمام",
    anybodyCommentNote: "سيكون أي شخص قادراً على التعليق",
    thumbnail: "صورة مصغرة",
    update: "تحديث",
    nsfwNote: "سيساعدهم في NSFW إعلام الأشخاص بأن بثك هو تحديد ما إذا كانوا يريدون المخاطرة بالانضمام أم لا",
    admin: "بوابة الأدمن للـ KI👑NG",
    adminTitle: "بوابة الأدمن للـ KI👑NG",
    userManagement: "إدارة المستخدمين",
    sendNotification: "إرسال إشعار",
    broadcast: "إرسال الرسالة"
  }
};

const GIFTS = [
  { id: 'heart', name: 'Heart', value: 10, icon: <Heart size={16} /> },
  { id: 'gift', name: 'Gift', value: 50, icon: <Gift size={16} /> },
  { id: 'crown', name: 'Crown', value: 500, icon: <Zap size={16} /> },
];

const App = () => {
  // --- GLOBAL STATE ---
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('home');
  const [prevView, setPrevView] = useState('home');
  const [showLogout, setShowLogout] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(1);
  const [showNsfw, setShowNsfw] = useState(false);
  const [walletBalance, setWalletBalance] = useState(3410.00);
  const [viewerCount, setViewerCount] = useState(1240);
  const [isAdmin, setIsAdmin] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "kingstar",
    avatar: null,
    gender: "Male",
    bio: "Streaming my journey to the top! 👑 #KING #QUEEN",
    location: "United Kingdom",
    birthDate: "1999-05-15",
    posts: 12,
    followers: 1400,
    following: 840
  });

  const t = translations[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    if (view === 'active_stream') {
      const interval = setInterval(() => {
        setViewerCount(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [view]);

  const navigate = (newView) => {
    setPrevView(view);
    setView(newView);
  };

  const isFullscreen = ['stream_setup', 'connecting', 'active_stream'].includes(view);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isRtl ? 'rtl' : 'ltr'} bg-white dark:bg-black text-black dark:text-white font-sans overflow-x-hidden`}>

      {/* Top Navigation */}
      {!isFullscreen && (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 h-14 flex items-center justify-between">
          <div className="text-xl font-black italic tracking-tighter text-pink-500 cursor-pointer" onClick={() => setIsAdmin(!isAdmin)}>
            {t.appTitle}
          </div>
          <div className="flex items-center gap-4">
            <Search size={22} className="cursor-pointer hover:text-pink-500 transition-colors" />
            <div className="relative cursor-pointer" onClick={() => { navigate('messages'); setUnreadMessages(0); }}>
              <MessageCircle size={22} className="hover:text-pink-500 transition-colors" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold border-2 border-white dark:border-black">
                  {unreadMessages}
                </span>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={`${!isFullscreen ? 'pt-14 pb-20' : ''} min-h-screen`}>
        {renderView({ view, navigate, t, isRtl, setLang, currentUser, setCurrentUser, unreadMessages, showNsfw, setShowNsfw, walletBalance, viewerCount, setShowLogout, isAdmin })}
      </main>

      {/* Bottom Navigation */}
      {!isFullscreen && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-6 h-16 flex items-center justify-between">
          <NavItem active={view === 'home'} icon={<Layout size={24} />} onClick={() => navigate('home')} />
          <NavItem active={view === 'following'} icon={<Heart size={24} />} onClick={() => navigate('following')} />
          <NavItem active={view === 'feed'} icon={<Rss size={24} />} onClick={() => navigate('feed')} />
          <NavItem active={view === 'store'} icon={<Store size={24} />} onClick={() => navigate('store')} />
          <NavItem active={view === 'profile' || view.startsWith('settings') || view === 'admin'} icon={<User size={24} />} onClick={() => navigate('profile')} />
        </nav>
      )}

      {/* FABs */}
      {!isFullscreen && view === 'home' && (
        <button
          onClick={() => navigate('stream_setup')}
          className={`fixed bottom-20 ${isRtl ? 'left-6' : 'right-6'} z-30 bg-pink-500 text-white px-5 py-3 rounded-full shadow-lg shadow-pink-500/30 flex items-center gap-2 font-bold transition-transform active:scale-95`}
        >
          <Video size={20} />
          <span>{t.startLive}</span>
        </button>
      )}

      {!isFullscreen && view === 'feed' && (
        <button className={`fixed bottom-20 ${isRtl ? 'left-6' : 'right-6'} z-30 bg-pink-500 text-white px-5 py-3 rounded-full shadow-lg shadow-pink-500/30 flex items-center gap-2 font-bold transition-transform active:scale-95`}>
          <Plus size={20} />
          <span>{t.createPost}</span>
        </button>
      )}

      {/* Logout Pop-up */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogout(false)}></div>
          <div className="relative w-full max-w-xs bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-2">{t.logout}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{t.confirmLogout}</p>
            <div className="flex flex-col gap-2">
              <button className="w-full py-3 rounded-2xl bg-pink-500 text-white font-bold" onClick={() => { setShowLogout(false); navigate('home'); }}>{t.logout}</button>
              <button className="w-full py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 font-bold" onClick={() => setShowLogout(false)}>{t.cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ active, icon, onClick }) => (
  <button onClick={onClick} className={`p-2 transition-all duration-300 ${active ? 'text-pink-500 scale-110' : 'text-gray-400 dark:text-gray-600'}`}>
    {icon}
  </button>
);

const renderView = (props) => {
  const { view } = props;
  switch (view) {
    case 'home': return <EmptyState {...props} title={props.t.home} />;
    case 'following': return <EmptyState {...props} title={props.t.following} />;
    case 'feed': return <FeedView {...props} />;
    case 'store': return <StoreView {...props} />;
    case 'profile': return <ProfileView {...props} />;
    case 'settings': return <SettingsView {...props} />;
    case 'settings_edit_profile': return <EditProfileView {...props} />;
    case 'settings_privacy': return <PrivacySettingsView {...props} />;
    case 'settings_blocked': return <BlockedUsersView {...props} />;
    case 'settings_transactions': return <TransactionsView {...props} />;
    case 'settings_withdrawal': return <WithdrawalView {...props} />;
    case 'settings_delete_account': return <DeleteAccountView {...props} />;
    case 'settings_static': return <StaticPageView {...props} />;
    case 'stream_setup': return <StreamSetupView {...props} />;
    case 'connecting': return <ConnectingView {...props} />;
    case 'active_stream': return <ActiveStreamView {...props} />;
    case 'admin': return <AdminDashboardView {...props} />;
    default: return <EmptyState {...props} title="404" />;
  }
};

const EmptyState = ({ t, title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center animate-in fade-in duration-500">
    <div className="w-32 h-32 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
      <Package size={64} className="text-gray-300 dark:text-gray-700" />
    </div>
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-gray-500 dark:text-gray-400">{t.emptyState}</p>
  </div>
);

const FeedView = ({ t, isRtl, showNsfw }) => (
  <div className="p-4 space-y-4 animate-in slide-in-from-bottom-10 duration-500">
    <h2 className="text-2xl font-black italic mb-4">{t.feed}</h2>
    {[1, 2, 3].map(id => (
      <div key={id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-4 shadow-sm">
        <div className={`flex items-center gap-3 mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center font-bold text-pink-500">K</div>
          <div className={isRtl ? 'text-right' : ''}>
            <p className="font-bold text-sm">User_King_{id}</p>
            <p className="text-[10px] text-gray-500">2h ago</p>
          </div>
        </div>
        <p className={`text-sm mb-4 ${isRtl ? 'text-right' : ''}`}>
          {id === 2 && showNsfw ? "[NSFW CONTENT] Adult content active." : "Normal feed content here."}
        </p>
        <div className={`flex gap-4 text-gray-500 text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-1"><Heart size={14} /> 1.2k</div>
          <div className="flex items-center gap-1"><MessageCircle size={14} /> 45</div>
        </div>
      </div>
    ))}
  </div>
);

const StoreView = ({ t, isRtl, walletBalance }) => (
  <div className="p-6 space-y-6 animate-in fade-in duration-500">
    <h2 className="text-2xl font-black italic mb-2">{t.store}</h2>
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-[2.5rem] text-white shadow-xl">
      <p className="text-white/70 text-xs font-bold uppercase mb-1">{t.walletBalance}</p>
      <p className="text-4xl font-black italic">{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
    </div>
    <div className="space-y-4">
      <h3 className={`font-bold text-lg ${isRtl ? 'text-right' : ''}`}>{t.rechargeOptions}</h3>
      <div className="grid grid-cols-1 gap-3">
        {[ { coins: 100, price: '0.99', extra: null }, { coins: 500, price: '4.99', extra: '8%' } ].map((pkg, i) => (
          <div key={i} className={`bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white"><Store size={20} /></div>
              <div className={isRtl ? 'text-right' : ''}><p className="font-bold">{pkg.coins} Coins</p>{pkg.extra && <span className="text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full font-bold">{t.extra} {pkg.extra}</span>}</div>
            </div>
            <button className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-xl font-bold text-sm">${pkg.price}</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProfileView = ({ t, navigate, isRtl, currentUser, isAdmin }) => (
  <div className="animate-in fade-in duration-500">
    <div className="p-6 text-center space-y-4 border-b border-gray-100 dark:border-gray-800">
      <div className="relative inline-block">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 p-1 mx-auto">
          <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center font-black text-3xl text-pink-500">
            {currentUser.avatar ? <img src={currentUser.avatar} className="w-full h-full rounded-full object-cover" /> : currentUser.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <button onClick={() => navigate('settings_edit_profile')} className="absolute bottom-0 right-0 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg border border-gray-100 dark:border-gray-800"><Pencil size={14} className="text-pink-500" /></button>
      </div>
      <div>
        <h2 className="text-2xl font-black italic">{currentUser.name}, {new Date().getFullYear() - new Date(currentUser.birthDate).getFullYear()}</h2>
        <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1"><Globe size={14} /> <span>{currentUser.location}</span></div>
      </div>
      <div className="flex justify-center gap-8 py-2">
        <StatItem value={currentUser.posts} label={t.posts} />
        <StatItem value={(currentUser.followers/1000).toFixed(1) + 'k'} label={t.followers} />
        <StatItem value={currentUser.following} label={t.following_count} />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">{currentUser.bio}</p>

      <div className="flex flex-col gap-2">
        <button onClick={() => navigate('settings')} className="w-full py-3 bg-gray-100 dark:bg-gray-900 rounded-2xl font-bold flex items-center justify-center gap-2"><Settings size={18} /><span>{t.settings}</span></button>
        {isAdmin && <button onClick={() => navigate('admin')} className="w-full py-3 bg-pink-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2"><ShieldCheck size={18} /><span>{t.admin}</span></button>}
      </div>
    </div>
    <div className="p-4 grid grid-cols-3 gap-2">{[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl"></div>)}</div>
  </div>
);

const StatItem = ({ value, label }) => (
  <div className="text-center">
    <p className="font-black text-lg italic">{value}</p>
    <p className="text-[10px] uppercase font-bold text-gray-400">{label}</p>
  </div>
);

const SettingsView = ({ t, navigate, isRtl, setLang, setShowLogout }) => (
  <div className="animate-in slide-in-from-right-10 duration-300">
    <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button onClick={() => navigate('profile')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
      <h2 className="text-xl font-bold">{t.settings}</h2>
    </div>
    <div className="p-2 space-y-4">
      <SettingsSection title={isRtl ? 'الحساب' : 'Account'}>
        <SettingsItem icon={<User size={20} />} label={t.editProfile} onClick={() => navigate('settings_edit_profile')} isRtl={isRtl} />
        <SettingsItem icon={<Shield size={20} />} label={t.privacy} onClick={() => navigate('settings_privacy')} isRtl={isRtl} />
        <SettingsItem icon={<UserX size={20} />} label={t.blockedUsers} onClick={() => navigate('settings_blocked')} isRtl={isRtl} />
      </SettingsSection>
      <SettingsSection title={t.store}>
        <SettingsItem icon={<History size={20} />} label={t.transactions} onClick={() => navigate('settings_transactions')} isRtl={isRtl} />
        <SettingsItem icon={<CreditCard size={20} />} label={t.withdrawal} onClick={() => navigate('settings_withdrawal')} isRtl={isRtl} />
      </SettingsSection>
      <SettingsSection title={isRtl ? 'عام' : 'General'}>
        <SettingsItem icon={<Globe size={20} />} label={`${t.language} (${isRtl ? 'العربية' : 'English'})`} onClick={() => setLang(isRtl ? 'en' : 'ar')} isRtl={isRtl} />
        <SettingsItem icon={<Eye size={20} />} label={t.contentExp} onClick={() => navigate('settings_static')} isRtl={isRtl} />
      </SettingsSection>
      <SettingsSection title={t.dangerZone}>
        <SettingsItem icon={<Trash2 size={20} className="text-pink-500" />} label={t.deleteAccount} onClick={() => navigate('settings_delete_account')} isRtl={isRtl} />
        <SettingsItem icon={<LogOut size={20} className="text-pink-500" />} label={t.logout} onClick={() => setShowLogout(true)} isRtl={isRtl} />
      </SettingsSection>
    </div>
  </div>
);

const SettingsSection = ({ title, children }) => (
  <div className="space-y-1"><p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 py-2">{title}</p>{children}</div>
);

const SettingsItem = ({ icon, label, onClick, isRtl }) => (
  <button onClick={onClick} className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 rounded-2xl transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
    <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}><span className="text-pink-500">{icon}</span><span className="font-bold text-sm">{label}</span></div>
    <ChevronRight size={18} className={`text-gray-300 ${isRtl ? 'rotate-180' : ''}`} />
  </button>
);

const EditProfileView = ({ t, navigate, isRtl, currentUser, setCurrentUser }) => {
  const [formData, setFormData] = useState(currentUser);
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => { setCurrentUser(formData); setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); };

  return (
    <div className="animate-in slide-in-from-bottom-10 duration-300">
      <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button onClick={() => navigate('settings')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
        <h2 className="text-xl font-bold">{t.editProfile}</h2>
      </div>
      <div className="p-6 space-y-6">
        <div className="text-center">
           <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-900 mx-auto relative group cursor-pointer mb-2">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 rounded-full transition-opacity"><Pencil size={20} className="text-white" /></div>
              {formData.avatar ? <img src={formData.avatar} className="w-full h-full rounded-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-2xl">{formData.name.charAt(0).toUpperCase()}</div>}
           </div>
        </div>
        <div className="space-y-4">
          <EditInput label={isRtl ? 'اسم المستخدم' : 'Username'} value={formData.name} onChange={v => setFormData({...formData, name: v})} isRtl={isRtl} icon={<Pencil size={14}/>}/>
          <div className="space-y-1">
            <label className={`block text-[10px] font-black uppercase text-gray-400 ${isRtl ? 'text-right' : ''}`}>{t.gender}</label>
            <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
               {['Male', 'Female'].map(g => (
                 <button key={g} onClick={() => setFormData({...formData, gender: g})} className={`flex-1 py-3 rounded-2xl font-bold text-sm border transition-all ${formData.gender === g ? 'bg-pink-500 border-pink-500 text-white' : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800'}`}>{g === 'Male' ? t.male : t.female}</button>
               ))}
            </div>
          </div>
          <EditInput label={t.birthDate} value={formData.birthDate} type="date" onChange={v => setFormData({...formData, birthDate: v})} isRtl={isRtl} icon={<Pencil size={14}/>}/>
          <button onClick={handleSave} className={`w-full py-4 font-black rounded-2xl shadow-xl uppercase transition-all ${isSaved ? 'bg-green-500 text-white' : 'bg-pink-500 text-white'}`}>{isSaved ? '✅' : t.save}</button>
        </div>
      </div>
    </div>
  );
};

const EditInput = ({ label, value, type = "text", onChange, isRtl, icon }) => (
  <div className="space-y-1">
    <label className={`block text-[10px] font-black uppercase text-gray-400 ${isRtl ? 'text-right' : ''}`}>{label}</label>
    <div className={`relative flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
      <input type={type} className={`w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-sm outline-none ${isRtl ? 'text-right' : ''}`} value={value} onChange={e => onChange(e.target.value)} />
      {icon && <div className={`absolute ${isRtl ? 'left-4' : 'right-4'} text-gray-300 pointer-events-none`}>{icon}</div>}
    </div>
  </div>
);

const StreamSetupView = ({ t, navigate, isRtl, walletBalance, showNsfw, setShowNsfw }) => {
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

      {/* Header Controls */}
      <div className="relative z-10 p-6 flex justify-between items-start">
         <button onClick={() => navigate('home')} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"><X size={24} /></button>
         <div className="flex flex-col gap-2">
            <button onClick={() => setUseFrontCamera(!useFrontCamera)} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"><RefreshCw size={20} /></button>
            <button onClick={() => setIsMuted(!isMuted)} className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center text-white ${isMuted ? 'bg-pink-500' : 'bg-black/40'}`}>{isMuted ? <MicOff size={20} /> : <Mic size={20} />}</button>
            <div className="relative">
              <button onClick={() => setShowQualityMenu(!showQualityMenu)} className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1 uppercase">
                <Monitor size={12} /> {quality} <ChevronDown size={12} />
              </button>
              {showQualityMenu && (
                <div className="absolute right-0 top-10 bg-black/80 backdrop-blur-xl rounded-2xl p-2 w-32 border border-white/10">
                  {['480p', '720p HD', '1080p FHD'].map(q => (
                    <button key={q} onClick={() => { setQuality(q); setShowQualityMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-white hover:bg-pink-500 rounded-lg">{q}</button>
                  ))}
                </div>
              )}
            </div>
         </div>
      </div>

      {/* Settings Scroll Area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 no-scrollbar space-y-6 pb-24">
         {/* Premium Switch */}
         <div className="bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-2 text-pink-500"><Zap size={20} /><span className="font-bold">{t.premium}</span></div>
               <button onClick={() => setIsPremium(!isPremium)} className={`w-12 h-6 rounded-full relative transition-colors ${isPremium ? 'bg-pink-500' : 'bg-gray-600'}`}>
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPremium ? (isRtl ? 'left-1' : 'right-1') : (isRtl ? 'right-1' : 'left-1')}`}></div>
               </button>
            </div>
            <p className="text-[10px] text-white/50">{t.premiumNote}</p>
            {isPremium && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[10px] font-bold text-white/70 uppercase mb-3">{t.entryTicket}</p>
                <div className="flex gap-2">
                   {GIFTS.map(gift => (
                     <button key={gift.id} onClick={() => setSelectedGift(gift)} className={`flex-1 p-2 rounded-xl border transition-all ${selectedGift.id === gift.id ? 'bg-pink-500 border-pink-500' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex flex-col items-center gap-1">
                          {gift.icon}
                          <span className="text-[10px] font-bold">{gift.value}</span>
                        </div>
                     </button>
                   ))}
                </div>
              </div>
            )}
         </div>

         {/* Permissions */}
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

         {/* Thumbnail & NSFW */}
         <div className="bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><ImageIcon size={18} className="text-gray-400"/><span className="text-xs font-bold">{t.thumbnail}</span></div>
              <button className="bg-pink-500 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase">{t.update}</button>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
               <div className="flex items-center gap-2 text-pink-500"><Lock size={18}/><span className="text-xs font-bold uppercase">NSFW</span></div>
               <button onClick={() => setShowNsfw(!showNsfw)} className={`w-12 h-6 rounded-full relative transition-colors ${showNsfw ? 'bg-pink-500' : 'bg-gray-600'}`}>
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showNsfw ? (isRtl ? 'left-1' : 'right-1') : (isRtl ? 'right-1' : 'left-1')}`}></div>
               </button>
            </div>
            <p className="text-[10px] text-white/50">{t.nsfwNote}</p>
         </div>
      </div>

      {/* Start Button */}
      <div className="absolute bottom-6 left-6 right-6 z-20">
         <button onClick={() => navigate('connecting')} className="w-full bg-pink-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-pink-500/30 uppercase italic tracking-widest animate-pulse">{t.start}</button>
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
};

const ActiveStreamView = ({ t, navigate, isRtl, viewerCount }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => { navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(s => { if (videoRef.current) videoRef.current.srcObject = s; }); }, []);

  return (
    <div className="h-screen bg-black relative">
      <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white border border-white/10">
          <UserIcon size={14} className="text-pink-500" />
          <span className="text-xs font-bold tracking-tighter">{viewerCount.toLocaleString()} {t.viewers}</span>
        </div>
        <button onClick={() => navigate('home')} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-pink-500"><X size={24} /></button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent space-y-4">
         <div className="h-40 overflow-y-auto space-y-2 no-scrollbar">
            {[1, 2].map(i => <div key={i} className={`flex items-start gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}><span className="font-black text-xs text-pink-500">User_{i}:</span><span className="text-xs text-white">KING LIVE! 👑👑👑</span></div>)}
         </div>
         <div className={`flex gap-2 items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
            <input type="text" placeholder="Say something..." className={`flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white outline-none ${isRtl ? 'text-right' : ''}`} />
            <button className="bg-pink-500 text-white p-2 rounded-full"><Gift size={20} /></button>
            <button onClick={() => setIsMuted(!isMuted)} className={`p-2 rounded-full backdrop-blur-md ${isMuted ? 'bg-pink-500' : 'bg-white/10'} text-white`}>{isMuted ? <MicOff size={20} /> : <Mic size={20} />}</button>
         </div>
      </div>
    </div>
  );
};

const PrivacySettingsView = ({ t, navigate, isRtl }) => (
  <div className="animate-in fade-in duration-300">
    <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button onClick={() => navigate('settings')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
      <h2 className="text-xl font-bold">{t.privacy}</h2>
    </div>
    <div className="p-6 space-y-8">
      <PrivacyToggle label={t.whoCanSeeBirth} t={t} isRtl={isRtl} />
      <PrivacyToggle label={t.whoCanSeeStatus} t={t} isRtl={isRtl} />
      <PrivacyToggle label={t.whoCanMessage} t={t} isRtl={isRtl} />
    </div>
  </div>
);

const PrivacyToggle = ({ label, t, isRtl }) => (
  <div className="space-y-3">
    <p className={`font-bold text-sm ${isRtl ? 'text-right' : ''}`}>{label}</p>
    <div className={`flex flex-wrap gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
      {[t.anyone, t.friends, t.noOne].map((opt, i) => (
        <button key={i} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${i === 0 ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-200 dark:border-gray-800'}`}>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const BlockedUsersView = ({ t, navigate, isRtl }) => (
  <div className="animate-in fade-in duration-300">
    <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button onClick={() => navigate('settings')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
      <h2 className="text-xl font-bold">{t.blockedUsers}</h2>
    </div>
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-10 text-center space-y-6">
      <div className="w-24 h-24 bg-pink-50 dark:bg-pink-900/10 rounded-3xl flex items-center justify-center rotate-12">
        <UserX size={48} className="text-pink-500" />
      </div>
      <p className="text-sm font-medium text-gray-500 leading-relaxed italic">{t.blockEmpty}</p>
    </div>
  </div>
);

const TransactionsView = ({ t, navigate, isRtl }) => (
  <div className="animate-in slide-in-from-bottom-10 duration-300">
    <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button onClick={() => navigate('settings')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
      <h2 className="text-xl font-bold">{t.transactions}</h2>
    </div>
    <div className="p-4 space-y-3">
      {[
        { name: 'Sarah_K', date: '2024-03-10', amount: '+40' },
        { name: 'Boss_99', date: '2024-03-09', amount: '+250' },
        { name: 'Queen_Bee', date: '2024-03-08', amount: '+1.5k' },
      ].map((tx, i) => (
        <div key={i} className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={isRtl ? 'text-right' : ''}>
            <p className="font-bold text-sm">Gift from {tx.name}</p>
            <p className="text-[10px] text-gray-400">{tx.date}</p>
          </div>
          <p className="font-black italic text-green-500 text-lg tracking-tighter">{tx.amount}</p>
        </div>
      ))}
    </div>
  </div>
);

const WithdrawalView = ({ t, navigate, isRtl, walletBalance }) => (
  <div className="animate-in fade-in duration-300">
    <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button onClick={() => navigate('settings')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
      <h2 className="text-xl font-bold">{t.withdrawal}</h2>
    </div>
    <div className="p-6 space-y-6">
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl text-center border border-gray-100 dark:border-gray-800">
        <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Available Balance</p>
        <p className="text-4xl font-black italic mb-1">{walletBalance.toLocaleString()}</p>
        <p className="text-pink-500 font-bold text-xs">{t.withdrawalEquiv}</p>
      </div>
      <div className="space-y-4">
        <EditInput label={t.withdrawAmount} value="1000" isRtl={isRtl} onChange={() => {}} />
        <div className="space-y-1">
          <label className={`block text-[10px] font-black uppercase text-gray-400 ${isRtl ? 'text-right' : ''}`}>{t.paymentMethod}</label>
          <select className={`w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-sm focus:ring-1 focus:ring-pink-500 outline-none appearance-none ${isRtl ? 'text-right' : ''}`}>
            <option>PayPal</option>
            <option>Bank Transfer</option>
            <option>Crypto Wallet</option>
          </select>
        </div>
        <button className="w-full py-4 bg-pink-500 text-white font-black rounded-2xl shadow-xl shadow-pink-500/20 italic tracking-tighter uppercase">
          {t.withdrawAction}
        </button>
      </div>
    </div>
  </div>
);

const DeleteAccountView = ({ t, navigate, isRtl }) => (
  <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in zoom-in-95 duration-300">
    <div className="w-24 h-24 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center text-pink-500 relative">
      <Trash2 size={48} />
      <AlertCircle size={24} className="absolute top-0 right-0 bg-white dark:bg-black rounded-full" />
    </div>
    <div className="space-y-2">
      <h2 className="text-2xl font-black italic text-pink-500">{t.deleteAccount}</h2>
      <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{t.deleteConfirm}</p>
    </div>
    <div className="w-full space-y-3">
      <button className="w-full py-4 bg-pink-500 text-white font-black rounded-2xl shadow-xl shadow-pink-500/20 italic tracking-tighter uppercase">
        Confirm Delete
      </button>
      <button onClick={() => navigate('settings')} className="w-full py-4 bg-gray-100 dark:bg-gray-900 font-black rounded-2xl italic tracking-tighter uppercase">
        {t.cancel}
      </button>
    </div>
  </div>
);

const StaticPageView = ({ t, navigate, isRtl, showNsfw, setShowNsfw }) => (
  <div className="animate-in fade-in duration-300">
    <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button onClick={() => navigate('settings')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
      <h2 className="text-xl font-bold">Details</h2>
    </div>
    <div className="p-6 space-y-6">
       <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-3xl mx-auto flex items-center justify-center text-gray-300 dark:text-gray-700">
         <FileText size={40} />
       </div>
       <div className="space-y-4">
         <p className={`text-sm leading-relaxed text-gray-600 dark:text-gray-400 ${isRtl ? 'text-right' : ''}`}>
           This page contains detailed information about the selected setting.
         </p>
         <div className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl ${isRtl ? 'flex-row-reverse' : ''}`}>
           <span className="font-bold text-sm">{t.sensitiveContent}</span>
           <button
            onClick={() => setShowNsfw(!showNsfw)}
            className={`w-12 h-6 rounded-full relative transition-colors ${showNsfw ? 'bg-pink-500' : 'bg-gray-300 dark:bg-gray-700'}`}
           >
             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showNsfw ? (isRtl ? 'left-1' : 'right-1') : (isRtl ? 'right-1' : 'left-1')}`}></div>
           </button>
         </div>
       </div>
    </div>
  </div>
);

const AdminDashboardView = ({ t, navigate, isRtl }) => (
  <div className="p-6 space-y-8 animate-in slide-in-from-top-10 duration-500">
    <div className="bg-pink-500 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-3xl font-black italic tracking-tighter mb-4">{t.adminTitle}</h2>
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
             <p className="text-[8px] uppercase font-bold opacity-60">Total Users</p>
             <p className="text-lg font-black italic">124,582</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
             <p className="text-[8px] uppercase font-bold opacity-60">Live Now</p>
             <p className="text-lg font-black italic">1,480</p>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-6">
       <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
          <h3 className="font-bold">{t.userManagement}</h3>
          <div className="space-y-2">
            {[1, 2].map(i => (
              <div key={i} className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-black rounded-2xl ${isRtl ? 'flex-row-reverse' : ''}`}>
                 <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                   <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center font-bold text-pink-500 text-xs">K</div>
                   <p className="text-xs font-bold">User_{i}</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg"><Settings size={14}/></button>
                    <button className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-lg"><Shield size={14}/></button>
                 </div>
              </div>
            ))}
          </div>
       </div>

       <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
          <h3 className="font-bold">{t.sendNotification}</h3>
          <input type="text" placeholder="Title" className="w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-gray-800 rounded-xl p-3 text-xs outline-none" />
          <textarea placeholder="Message" className="w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-gray-800 rounded-xl p-3 text-xs outline-none h-24" />
          <button className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl uppercase text-xs">{t.broadcast}</button>
       </div>
    </div>
  </div>
);

export default App;
