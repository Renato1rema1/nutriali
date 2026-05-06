-- ==========================================
-- SUPABASE SCHEMA SETUP FOR NUTRILIA
-- ==========================================
-- Você pode copiar e colar este código no SQL Editor do Supabase 
-- caso queira relacionalizar seus dados no futuro.
-- Atualmente, a aplicação salva a maioria dos dados no `user_metadata` nativo do Supabase.
-- Mas se quiser criar uma tabela de perfis (profiles) separada:

-- 1. Create a table for public profiles (optional if you want extra relations)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users not null primary key,
  email text not null,
  name text,
  is_onboarded boolean default false,
  preferences jsonb,
  recorded_meals jsonb default '[]'::jsonb,
  saved_plans jsonb default '[]'::jsonb,
  meal_reminders jsonb default '[]'::jsonb,
  goal_target_dates jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Turn on Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Users can read their own profile
DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON public.profiles;
CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- 4. Policy: Users can update their own profile
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON public.profiles;
CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 5. Trigger to create a profile automatically when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, is_onboarded)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    false
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Attach trigger
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END
$$;
