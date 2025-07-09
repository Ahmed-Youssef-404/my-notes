import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fcfsgsyqxplobtkyglgw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZnNnc3lxeHBsb2J0a3lnbGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMzI2NTMsImV4cCI6MjA1MzkwODY1M30.p3OA7VDHRspDBy8SngVbZrroAHG0op8U2xNZD36Gqak";

export const supabase = createClient(supabaseUrl, supabaseKey);
