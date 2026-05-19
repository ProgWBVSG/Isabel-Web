import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the root of the project
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Missing Supabase env vars. Skipping content fetch.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const DATA_DIR = path.resolve(__dirname, '../src/data');

async function sync() {
  console.log('🔄 Sincronizando contenido desde Supabase...');
  
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // 1. Fetch Testimonials
  const { data: testimonials, error: testError } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (testError) {
    console.error('❌ Error fetching testimonials:', testError);
  } else {
    fs.writeFileSync(
      path.join(DATA_DIR, 'testimonials.json'),
      JSON.stringify(testimonials || [], null, 2)
    );
    console.log(`✅ Sincronizados ${testimonials?.length || 0} testimonios.`);
  }

  // 2. Fetch Content
  const { data: content, error: contentError } = await supabase
    .from('site_content')
    .select('*');

  if (contentError) {
    console.error('❌ Error fetching content:', contentError);
  } else {
    const contentMap = {};
    (content || []).forEach(item => {
      contentMap[item.section_key] = item.text_value;
    });
    fs.writeFileSync(
      path.join(DATA_DIR, 'content.json'),
      JSON.stringify(contentMap, null, 2)
    );
    console.log(`✅ Sincronizados ${content?.length || 0} bloques de texto.`);
  }
}

sync();
