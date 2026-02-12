const WORKSPACE = "rockyphers-team-2885";
const KEY = "macaneta-counter";
const TOKEN = import.meta.env.VITE_TOKEN;

export async function incrementView() {
  try {
    if (!TOKEN) {
      console.warn("VITE_TOKEN não configurado.");
      return null;
    }

    const url = `https://api.counterapi.dev/v2/${WORKSPACE}/${KEY}/up?token=${TOKEN}`;
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      console.error("Erro na API:", result.message);
      return null;
    }

    // Baseado no seu log, o valor está em result.data.up_count
    // Usamos o fallback para 'value' ou 'id' caso a API mude algo
    const count =
      result.data?.up_count ?? result.data?.value ?? result.data?.id;

    return count !== undefined ? Number(count) : null;
  } catch (error) {
    console.error("Erro ao conectar com CounterAPI:", error);
    return null;
  }
}

export async function getViewCount() {
  try {
    const url = `https://api.counterapi.dev/v2/${WORKSPACE}/${KEY}?token=${TOKEN}`;
    const response = await fetch(url);
    const result = await response.json();

    const count = result.data?.up_count ?? result.data?.value ?? 0;
    return Number(count);
  } catch (error) {
    return null;
  }
}
