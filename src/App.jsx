import React, { useState, useEffect } from 'react';
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
  X,
  Radio,
  Gift,
  Package,
  Globe,
  Eye,
  CheckCircle2,
  AlertCircle
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
    save: "Save",
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
    sensitiveContent: "Show potentially sensitive content",
    start: "Start",
    connecting: "Connecting...",
    viewers: "Viewers"
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
    save: "حفظ",
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
    sensitiveContent: "إظهار المحتوى الذي يحتمل أن يكون حساساً",
    start: "ابدأ",
    connecting: "جاري الاتصال...",
    viewers: "مشاهد"
  }
};

// --- COMPONENTS ---

const App = () => {
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('home');
  const [prevView, setPrevView] = useState('home');
  const [showLogout, setShowLogout] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  const navigate = (newView) => {
    setPrevView(view);
    setView(newView);
  };

  // Views that don't show NavBars
  const isFullscreen = ['stream_setup', 'connecting', 'active_stream'].includes(view);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isRtl ? 'rtl' : 'ltr'} bg-white dark:bg-black text-black dark:text-white font-sans overflow-x-hidden`}>

      {/* Top Navigation Bar */}
      {!isFullscreen && (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 h-14 flex items-center justify-between">
          <div className="text-xl font-black italic tracking-tighter text-pink-500">
            {t.appTitle}
          </div>
          <div className="flex items-center gap-4">
            <Search size={22} className="cursor-pointer hover:text-pink-500 transition-colors" />
            <div className="relative cursor-pointer" onClick={() => navigate('messages')}>
              <MessageCircle size={22} className="hover:text-pink-500 transition-colors" />
              {hasNewMessage && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold border-2 border-white dark:border-black">
                  1
                </span>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={`${!isFullscreen ? 'pt-14 pb-20' : ''} min-h-screen`}>
        {renderView(view, navigate, t, isRtl, setLang)}
      </main>

      {/* Bottom Navigation Bar */}
      {!isFullscreen && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-6 h-16 flex items-center justify-between">
          <NavItem active={view === 'home'} icon={<Layout size={24} />} onClick={() => navigate('home')} />
          <NavItem active={view === 'following'} icon={<Heart size={24} />} onClick={() => navigate('following')} />
          <NavItem active={view === 'feed'} icon={<Rss size={24} />} onClick={() => navigate('feed')} />
          <NavItem active={view === 'store'} icon={<Store size={24} />} onClick={() => navigate('store')} />
          <NavItem active={view === 'profile' || view.startsWith('settings')} icon={<User size={24} />} onClick={() => navigate('profile')} />
        </nav>
      )}

      {/* Floating Action Buttons */}
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

      {/* Logout Dialog */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogout(false)}></div>
          <div className="relative w-full max-w-xs bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-2">{t.logout}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{t.confirmLogout}</p>
            <div className="flex flex-col gap-2">
              <button
                className="w-full py-3 rounded-2xl bg-pink-500 text-white font-bold transition-transform active:scale-95"
                onClick={() => { setShowLogout(false); navigate('home'); }}
              >
                {t.logout}
              </button>
              <button
                className="w-full py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 font-bold transition-colors"
                onClick={() => setShowLogout(false)}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ active, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 transition-all duration-300 ${active ? 'text-pink-500 scale-110' : 'text-gray-400 dark:text-gray-600'}`}
  >
    {icon}
  </button>
);

const renderView = (view, navigate, t, isRtl, setLang) => {
  switch (view) {
    case 'home': return <EmptyState t={t} title={t.home} />;
    case 'following': return <EmptyState t={t} title={t.following} />;
    case 'feed': return <FeedView t={t} isRtl={isRtl} />;
    case 'store': return <StoreView t={t} isRtl={isRtl} />;
    case 'profile': return <ProfileView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'settings': return <SettingsView t={t} navigate={navigate} isRtl={isRtl} setLang={setLang} />;
    case 'settings_edit_profile': return <EditProfileView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'settings_privacy': return <PrivacySettingsView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'settings_blocked': return <BlockedUsersView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'settings_transactions': return <TransactionsView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'settings_withdrawal': return <WithdrawalView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'settings_delete_account': return <DeleteAccountView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'settings_static': return <StaticPageView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'stream_setup': return <StreamSetupView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'connecting': return <ConnectingView t={t} navigate={navigate} isRtl={isRtl} />;
    case 'active_stream': return <ActiveStreamView t={t} navigate={navigate} isRtl={isRtl} />;
    default: return <EmptyState t={t} title="404" />;
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

const FeedView = ({ t, isRtl }) => (
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
        <p className={`text-sm mb-4 ${isRtl ? 'text-right' : ''}`}>This is a sample post on the KING LIVE QUEEN feed. Everything adjusts to your theme!</p>
        <div className={`flex gap-4 text-gray-500 text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-1"><Heart size={14} /> 1.2k</div>
          <div className="flex items-center gap-1"><MessageCircle size={14} /> 45</div>
        </div>
      </div>
    ))}
  </div>
);

const StoreView = ({ t, isRtl }) => (
  <div className="p-6 space-y-6 animate-in fade-in duration-500">
    <h2 className="text-2xl font-black italic mb-2">{t.store}</h2>
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-[2.5rem] text-white shadow-xl shadow-pink-500/20">
      <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{t.walletBalance}</p>
      <p className="text-4xl font-black italic">3,410.00</p>
    </div>
    <div className="space-y-4">
      <h3 className={`font-bold text-lg ${isRtl ? 'text-right' : ''}`}>{t.rechargeOptions}</h3>
      <div className="grid grid-cols-1 gap-3">
        {[
          { coins: 100, price: '0.99', extra: null },
          { coins: 500, price: '4.99', extra: '8%' },
          { coins: 1000, price: '9.99', extra: '12%' },
        ].map((pkg, i) => (
          <div key={i} className={`bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-sm">
                <Store size={20} />
              </div>
              <div className={isRtl ? 'text-right' : ''}>
                <p className="font-bold">{pkg.coins} Coins</p>
                {pkg.extra && <span className="text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full font-bold">{t.extra} {pkg.extra}</span>}
              </div>
            </div>
            <button className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-pink-500 transition-colors">
              ${pkg.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProfileView = ({ t, navigate, isRtl }) => (
  <div className="animate-in fade-in duration-500">
    <div className="p-6 text-center space-y-4 border-b border-gray-100 dark:border-gray-800">
      <div className="relative inline-block">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 p-1 mx-auto">
          <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center font-black text-3xl text-pink-500">K</div>
        </div>
        <button
          onClick={() => navigate('settings_edit_profile')}
          className="absolute bottom-0 right-0 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg border border-gray-100 dark:border-gray-800"
        >
          <Pencil size={14} className="text-pink-500" />
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-black italic">King_User_99, 24</h2>
        <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1">
          <Globe size={14} /> <span>United Kingdom</span>
        </div>
      </div>
      <div className="flex justify-center gap-8 py-2">
        <div className="text-center">
          <p className="font-black text-lg italic">12</p>
          <p className="text-[10px] uppercase font-bold text-gray-400">{t.posts}</p>
        </div>
        <div className="text-center">
          <p className="font-black text-lg italic">1.4k</p>
          <p className="text-[10px] uppercase font-bold text-gray-400">{t.followers}</p>
        </div>
        <div className="text-center">
          <p className="font-black text-lg italic">840</p>
          <p className="text-[10px] uppercase font-bold text-gray-400">{t.following_count}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">Streaming my journey to the top! 👑 #KING #QUEEN</p>

      <div className="flex gap-2">
        <button
          onClick={() => navigate('settings')}
          className="flex-1 py-3 bg-gray-100 dark:bg-gray-900 rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <Settings size={18} />
          <span>{t.settings}</span>
        </button>
      </div>
    </div>

    <div className="p-4 grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Eye size={20} className="text-white" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsView = ({ t, navigate, isRtl, setLang }) => (
  <div className="animate-in slide-in-from-right-10 duration-300">
    <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button onClick={() => navigate('profile')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
      <h2 className="text-xl font-bold">{t.settings}</h2>
    </div>

    <div className="p-2 space-y-6">
      <SettingsSection title={isRtl ? 'الحساب' : 'Account'}>
        <SettingsItem icon={<User size={20} />} label={t.editProfile} onClick={() => navigate('settings_edit_profile')} isRtl={isRtl} />
        <SettingsItem icon={<Shield size={20} />} label={t.privacy} onClick={() => navigate('settings_privacy')} isRtl={isRtl} />
        <SettingsItem icon={<UserX size={20} />} label={t.blockedUsers} onClick={() => navigate('settings_blocked')} isRtl={isRtl} />
      </SettingsSection>

      <SettingsSection title={t.store}>
        <SettingsItem icon={<History size={20} />} label={t.transactions} onClick={() => navigate('settings_transactions')} isRtl={isRtl} />
        <SettingsItem icon={<CreditCard size={20} />} label={t.withdrawal} onClick={() => navigate('settings_withdrawal')} isRtl={isRtl} />
      </SettingsSection>

      <SettingsSection title={isRtl ? 'مباشر' : 'Live'}>
        <SettingsItem icon={<User size={20} />} label={t.chatMods} onClick={() => navigate('settings_static')} isRtl={isRtl} />
        <SettingsItem icon={<Video size={20} />} label={t.pastStreams} onClick={() => navigate('settings_static')} isRtl={isRtl} />
      </SettingsSection>

      <SettingsSection title={isRtl ? 'عام' : 'General'}>
        <SettingsItem
          icon={<Globe size={20} />}
          label={`${t.language} (${isRtl ? 'العربية' : 'English'})`}
          onClick={() => setLang(isRtl ? 'en' : 'ar')}
          isRtl={isRtl}
        />
        <SettingsItem icon={<Eye size={20} />} label={t.contentExp} onClick={() => navigate('settings_static')} isRtl={isRtl} />
        <SettingsItem icon={<HelpCircle size={20} />} label={t.support} onClick={() => navigate('settings_static')} isRtl={isRtl} />
        <SettingsItem icon={<FileText size={20} />} label={t.tos} onClick={() => navigate('settings_static')} isRtl={isRtl} />
        <SettingsItem icon={<Shield size={20} />} label={t.privacyPolicy} onClick={() => navigate('settings_static')} isRtl={isRtl} />
      </SettingsSection>

      <SettingsSection title={t.dangerZone}>
        <SettingsItem icon={<Trash2 size={20} className="text-pink-500" />} label={t.deleteAccount} onClick={() => navigate('settings_delete_account')} isRtl={isRtl} />
        <SettingsItem icon={<LogOut size={20} className="text-pink-500" />} label={t.logout} onClick={() => {}} isRtl={isRtl} />
      </SettingsSection>
    </div>
  </div>
);

const SettingsSection = ({ title, children }) => (
  <div className="space-y-1">
    <p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 py-2">{title}</p>
    {children}
  </div>
);

const SettingsItem = ({ icon, label, onClick, isRtl }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 rounded-2xl transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
  >
    <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <span className="text-pink-500">{icon}</span>
      <span className="font-bold text-sm">{label}</span>
    </div>
    <ChevronRight size={18} className={`text-gray-300 ${isRtl ? 'rotate-180' : ''}`} />
  </button>
);

const EditProfileView = ({ t, navigate, isRtl }) => (
  <div className="animate-in slide-in-from-bottom-10 duration-300">
    <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button onClick={() => navigate('settings')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
      <h2 className="text-xl font-bold">{t.editProfile}</h2>
    </div>
    <div className="p-6 space-y-6">
      <div className="text-center">
         <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-900 mx-auto relative group cursor-pointer mb-2">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 rounded-full transition-opacity">
              <Pencil size={20} className="text-white" />
            </div>
         </div>
         <p className="text-pink-500 font-bold text-xs">Change Photo</p>
      </div>
      <div className="space-y-4">
        <EditInput label={isRtl ? 'اسم المستخدم' : 'Username'} value="King_User_99" isRtl={isRtl} />
        <EditInput label={t.gender} value="Male" isRtl={isRtl} />
        <EditInput label={t.birthDate} value="1999-05-15" isRtl={isRtl} />
        <EditInput label={t.country} value="United Kingdom" isRtl={isRtl} />
        <div className="space-y-1">
          <label className={`block text-[10px] font-black uppercase text-gray-400 ${isRtl ? 'text-right' : ''}`}>{t.bio}</label>
          <textarea className={`w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-sm focus:ring-1 focus:ring-pink-500 outline-none ${isRtl ? 'text-right' : ''}`} value="Streaming my journey to the top! 👑 #KING #QUEEN" />
        </div>
        <button className="w-full py-4 bg-pink-500 text-white font-black rounded-2xl shadow-xl shadow-pink-500/20 italic tracking-tighter uppercase">
          {t.save}
        </button>
      </div>
    </div>
  </div>
);

const EditInput = ({ label, value, isRtl }) => (
  <div className="space-y-1">
    <label className={`block text-[10px] font-black uppercase text-gray-400 ${isRtl ? 'text-right' : ''}`}>{label}</label>
    <div className={`relative flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
      <input type="text" className={`w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-sm focus:ring-1 focus:ring-pink-500 outline-none ${isRtl ? 'text-right' : ''}`} defaultValue={value} />
      <Pencil size={14} className={`absolute ${isRtl ? 'left-4' : 'right-4'} text-gray-300`} />
    </div>
  </div>
);

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

const WithdrawalView = ({ t, navigate, isRtl }) => (
  <div className="animate-in fade-in duration-300">
    <div className={`p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button onClick={() => navigate('settings')}><ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} /></button>
      <h2 className="text-xl font-bold">{t.withdrawal}</h2>
    </div>
    <div className="p-6 space-y-6">
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl text-center border border-gray-100 dark:border-gray-800">
        <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Available Balance</p>
        <p className="text-4xl font-black italic mb-1">3,410.00</p>
        <p className="text-pink-500 font-bold text-xs">{t.withdrawalEquiv}</p>
      </div>
      <div className="space-y-4">
        <EditInput label={t.withdrawAmount} value="1000" isRtl={isRtl} />
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

const StaticPageView = ({ t, navigate, isRtl }) => (
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
           This page contains detailed information about the selected setting. In the real app, this would show the full legal or informational content.
         </p>
         <div className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl ${isRtl ? 'flex-row-reverse' : ''}`}>
           <span className="font-bold text-sm">{t.sensitiveContent}</span>
           <button className="w-12 h-6 bg-pink-500 rounded-full relative">
             <div className={`absolute top-1 ${isRtl ? 'left-1' : 'right-1'} w-4 h-4 bg-white rounded-full`}></div>
           </button>
         </div>
       </div>
    </div>
  </div>
);

const StreamSetupView = ({ t, navigate, isRtl }) => (
  <div className="h-screen bg-black relative overflow-hidden">
    {/* Mock Camera Feed */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
       <div className="flex items-center justify-center h-full">
          <Video size={100} className="text-white/20 animate-pulse" />
       </div>
    </div>

    {/* Overlays */}
    <div className="absolute inset-0 p-6 flex flex-col">
       <div className="flex justify-between items-center">
          <button onClick={() => navigate('home')} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <X size={24} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"><RefreshCw size={20} /></button>
            <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"><Mic size={20} /></button>
          </div>
       </div>

       <div className="mt-auto flex flex-col items-center gap-8 mb-12">
          <button
            onClick={() => navigate('connecting')}
            className="w-32 h-32 bg-pink-500 rounded-full shadow-2xl shadow-pink-500/50 flex items-center justify-center text-white font-black italic text-2xl border-8 border-pink-400/30 animate-pulse"
          >
            {t.start}
          </button>
       </div>
    </div>
  </div>
);

const ConnectingView = ({ t, navigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => navigate('active_stream'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white">
      <X
        className="absolute top-6 right-6 cursor-pointer"
        onClick={() => navigate('home')}
      />
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-black italic text-xl tracking-widest">{t.connecting}</p>
      </div>
    </div>
  );
};

const ActiveStreamView = ({ t, navigate, isRtl }) => (
  <div className="h-screen bg-black relative">
    {/* Fullscreen Video Mock */}
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
      <Radio size={200} className="text-pink-500" />
    </div>

    {/* Header */}
    <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10">
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 text-white">
        <User size={14} />
        <span className="text-xs font-bold">1,240 {t.viewers}</span>
      </div>
      <button onClick={() => navigate('home')} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white">
        <X size={24} />
      </button>
    </div>

    {/* Bottom Overlay for Comments */}
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent space-y-4">
       <div className="h-40 overflow-y-auto space-y-2 no-scrollbar">
          {[1, 2, 3].map(i => (
            <div key={i} className={`flex items-start gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="font-black text-xs text-pink-500">User_{i}:</span>
              <span className="text-xs text-white">WOW! amazing stream! 👑👑👑</span>
            </div>
          ))}
       </div>
       <div className={`flex gap-2 items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
          <input
            type="text"
            placeholder="Say something..."
            className={`flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-pink-500 ${isRtl ? 'text-right' : ''}`}
          />
          <button className="bg-pink-500 text-white p-2 rounded-full"><Gift size={20} /></button>
       </div>
    </div>
  </div>
);

export default App;
