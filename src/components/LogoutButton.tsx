"use client";

import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import debounce from '@/lib/debounce';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const debouncedHandleLogout = debounce(handleLogout, 1000);

  return <Button variant="outline" onClick={debouncedHandleLogout}>Logout</Button>;
}

