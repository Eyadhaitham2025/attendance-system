import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://rdzkzmpfyosrfzrknzqt.supabase.co"; // ضع رابط مشروعك
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkemt6bXBmeW9zcmZ6cmtuenF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzOTcyMzcsImV4cCI6MjA3NDk3MzIzN30.5NMvqzolkI4tq1_Li1TsPiZSUnv-EAVYuJYw2wRhH4g";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
