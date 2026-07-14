-- Migration: Create Database Webhook to trigger 'process-lead' Edge Function on new leads

-- 1. Enable pg_net extension if not already enabled (required for outgoing webhooks)
create extension if not exists pg_net with schema extensions;

-- 2. Drop the trigger if it already exists to avoid conflicts
drop trigger if exists lead_insert_trigger on public.leads;
drop function if exists public.trigger_process_lead();

-- 3. Create the trigger function
create or replace function public.trigger_process_lead()
returns trigger as $$
declare
  webhook_url text;
  anon_key text;
begin
  -- Get the edge function URL from the environment (or hardcode your project URL)
  -- Replace [PROJECT_REF] with your actual Supabase project reference
  webhook_url := 'https://[PROJECT_REF].supabase.co/functions/v1/process-lead';
  
  -- Replace [ANON_KEY] with your actual Supabase Anon Key
  anon_key := '[ANON_KEY]';

  -- Call the Edge Function asynchronously using pg_net
  perform net.http_post(
      url := webhook_url,
      headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || anon_key
      ),
      body := jsonb_build_object(
          'type', 'INSERT',
          'table', TG_TABLE_NAME,
          'schema', TG_TABLE_SCHEMA,
          'record', row_to_json(NEW)
      )
  );
  
  return NEW;
end;
$$ language plpgsql security definer;

-- 4. Attach the trigger to the leads table
create trigger lead_insert_trigger
after insert on public.leads
for each row execute function public.trigger_process_lead();
