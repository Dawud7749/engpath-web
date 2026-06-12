'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function pairPartnerByEmail(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const email = (formData.get('partner_email') as string)?.trim();
  if (!email) return { ok: false, error: 'Email wajib diisi.' };

  const supabase = await createClient();
  const { data, error } = await supabase.rpc('pair_partner', { partner_email: email });
  if (error) return { ok: false, error: error.message };

  type RpcResult = { ok: boolean; error?: string };
  const result = data as RpcResult;
  if (!result?.ok) return { ok: false, error: result?.error || 'Gagal menyambungkan partner.' };

  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { ok: true };
}

export async function unpairPartner(): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.rpc('unpair_partner');
  if (error) return { ok: false, error: error.message };
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { ok: true };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
