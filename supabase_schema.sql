-- KING APPLICATION SCHEMA (Comprehensive & Optimized)

-- Profiles table with rate limiting and digital currency (Miles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  phone TEXT,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user', -- 'user', 'captain', 'admin'
  miles DECIMAL(12,2) DEFAULT 1000.00,

  -- Rate limiting timestamps for account protection
  last_avatar_update TIMESTAMP WITH TIME ZONE DEFAULT (NOW() - INTERVAL '2 days'),
  last_name_update TIMESTAMP WITH TIME ZONE DEFAULT (NOW() - INTERVAL '8 days'),
  last_username_update TIMESTAMP WITH TIME ZONE DEFAULT (NOW() - INTERVAL '32 days'),

  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table with flight simulation and translation data
CREATE TABLE IF NOT EXISTS public.messages (
  id BIGSERIAL PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  original_content TEXT,
  original_lang TEXT,
  media_url TEXT,
  media_type TEXT, -- 'photo', 'video', 'gift'
  gift_id TEXT,

  -- Flight state for simulation
  flight_state TEXT DEFAULT 'arrived', -- 'takeoff', 'cruising', 'landing', 'arrived'
  origin_country TEXT,
  dest_country TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funding requests for free miles (Beta Phase)
CREATE TABLE IF NOT EXISTS public.funding_requests (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Global Broadcasts
CREATE TABLE IF NOT EXISTS public.broadcasts (
  id BIGSERIAL PRIMARY KEY,
  admin_id UUID REFERENCES public.profiles(id),
  title_en TEXT,
  title_ar TEXT,
  content_en TEXT,
  content_ar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

ALTER TABLE public.funding_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own requests" ON public.funding_requests FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users can create requests" ON public.funding_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ATOMIC GIFT TRANSACTION FUNCTION
CREATE OR REPLACE FUNCTION public.transfer_miles_gift(sender_uuid UUID, recipient_uuid UUID, amount DECIMAL, g_id TEXT)
RETURNS VOID AS $$
BEGIN
  -- Deduct from sender if they have enough
  UPDATE public.profiles
  SET miles = miles - amount
  WHERE id = sender_uuid AND miles >= amount;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;

  -- Add to recipient
  UPDATE public.profiles
  SET miles = miles + amount
  WHERE id = recipient_uuid;

  -- Log as a gift message
  INSERT INTO public.messages (sender_id, receiver_id, content, media_type, gift_id, flight_state)
  VALUES (sender_uuid, recipient_uuid, 'GIFT_SENT', 'gift', g_id, 'arrived');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- TRIGGER: AUTOMATIC PROFILE CREATION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, phone, username, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.phone,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || SUBSTRING(NEW.id::TEXT FROM 1 FOR 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Passenger'),
    CASE
      WHEN NEW.email = 'king@gmail.com' THEN 'admin'
      WHEN NEW.email = 'captain@gmail.com' THEN 'captain'
      ELSE 'user'
    END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
