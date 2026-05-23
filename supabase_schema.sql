-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  gender TEXT,
  bio TEXT,
  location TEXT,
  birth_date DATE,
  is_admin BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallets table
CREATE TABLE wallets (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  balance DECIMAL(12,2) DEFAULT 3410.00,
  points INTEGER DEFAULT 1500,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storage Buckets
-- 1. avatars: For user profile pictures
-- 2. thumbnails: For live stream covers

-- RLS Policies (simplified for this task)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own wallet." ON wallets FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own wallet." ON wallets FOR UPDATE USING (auth.uid() = id);
