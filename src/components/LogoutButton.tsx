"use client";

import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return <Button variant="outline" onClick={handleLogout}>Logout</Button>;
}

