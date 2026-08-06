export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { CPF, PSBioLocal } = req.body || {};
        if (!CPF) return res.status(400).json({ error: 'CPF é obrigatório.' });

        const apiKey = "9e733efd6edc468ea5c1bc8db4260deee9c6d66d3e384ba3b110c71f8e029197";
        const targetUrl = "https://api.gestaoar.com.br/ClickDigital/api/GarAPIs/PsBio";

        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey, CPF, PSBioLocal: Boolean(PSBioLocal) })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao conectar com a API externa: ' + error.message });
    }
}
