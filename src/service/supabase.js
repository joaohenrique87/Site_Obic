import { supabase } from '@/lib/supabaseClient';

const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;

const getPublicUrl = (caminho) => {
  const { data } = supabase
    .storage
    .from(BUCKET)
    .getPublicUrl(caminho);

  return data.publicUrl;
};

const montarCaminho = (row) => {

  if (row.caminho_storage.includes("/")) {
    return row.caminho_storage;
  }

  return `${row.categoria}/${row.caminho_storage}`;
};

export const fetchRelatorios = async () => {
  try {

    const { data, error } = await supabase
      .from('pdfs')
      .select('id, nome_arquivo, caminho_storage, created_at, categoria')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(row => {

      const caminhoCompleto = montarCaminho(row);

      return {
        categoria: row.categoria ?? null,
        id: row.id,
        nome_arquivo: row.nome_arquivo,
        caminho_storage: caminhoCompleto,
        linkDownload: getPublicUrl(caminhoCompleto),
        created_at: row.created_at,
      };

    });

  } catch (error) {
    console.error('Erro ao buscar relatórios:', error);
    return [];
  }
};