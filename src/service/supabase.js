import { supabase } from '@/lib/supabaseClient';

const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;

const getPublicUrl = (caminho) => {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(caminho);
  return data.publicUrl;
};

// Busca todos os PDFs ordenados do mais recente para o mais antigo
export const fetchRelatoriosRecentes = async () => {
  try {
    const { data, error } = await supabase
      .from('pdfs')
      .select('id, nome_arquivo, caminho_storage, created_at, categoria')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(row => ({
          categoria: row.categoria ?? null,
      id: row.id,
      nome: row.nome_arquivo.replace('.pdf', '').replace(/-|_/g, ' '),
      linkPreview: getPublicUrl(row.caminho_storage),
      linkDownload: getPublicUrl(row.caminho_storage),
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error('Erro ao buscar relatórios:', error);
    return [];
  }
};

// Busca todos os PDFs (para a página de relatórios)
export const fetchTodosRelatorios = async () => {
  try {
    const { data, error } = await supabase
      .from('pdfs')
      .select('id, nome_arquivo, caminho_storage, created_at, categoria')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(row => ({
          categoria: row.categoria ?? null,
      id: row.id,
      nome: row.nome_arquivo.replace('.pdf', '').replace(/-|_/g, ' '),
      linkPreview: getPublicUrl(row.caminho_storage),
      linkDownload: getPublicUrl(row.caminho_storage),
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error('Erro ao buscar todos os relatórios:', error);
    return [];
  }
};