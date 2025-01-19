"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
exports.router = router;
router.post('/ai', (req, res) => {
    const { data } = req.body;
    const key = process.env.GOOGLE_APIKEY;
    if (!key) {
        throw new Error('API key not found');
    }
    if (!data) {
        throw new Error('Data not found');
    }
    const genAI = new generative_ai_1.GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const prompt = 'dê uma nota de 0 a 1000 para essa redação com base nas especificaçẽos do enem, retorne na forma de obj, com nota, pontos_fortes, pontos_a_melhorar, sugetoes e repertorio_possivel || para analise considere a correção do enem veja exemplos de redação nota 1000, e outras notas e teha como referencia. A redação do Enem (Exame Nacional do Ensino Médio) é avaliada por meio de cinco competências, cada uma valendo de 0 a 200 pontos, totalizando uma pontuação máxima de 1000 pontos. Cada competência avalia um aspecto específico da redação. Vou explicar cada uma delas:1. Competência 1 – Domínio da norma padrão da língua portuguesa Avalia a ortografia, gramática e pontuação.O candidato deve demonstrar um uso adequado da língua portuguesa, sem erros de concordância, acentuação, ortografia e pontuação.Uso correto de estruturas gramaticais e sintáticas, respeitando as normas da língua.2. Competência 2 – Compreensão da proposta de redaçãoAvalia a capacidade de entender a proposta e de desenvolver uma redação que trate do tema proposto de maneira clara e objetiva.O texto precisa abordar o tema de forma direta, sem fugir do assunto, e respeitar as exigências do tipo textual solicitado (geralmente uma dissertação argumentativa).3. Competência 3 – Seleção e organização das informaçõesAvalia como o candidato organiza e estrutura suas ideias, com coesão e coerência.O texto deve apresentar introdução, desenvolvimento e conclusão bem organizados, com ideias que se conectam de forma lógica.É importante que o candidato faça uma argumentação que dê apoio à sua opinião ou à solução que propõe para o problema abordado.4. Competência 4 – Apresentação de proposta de intervençãoAvalia se o candidato apresenta uma proposta de intervenção para o problema abordado, de forma clara, viável e respeitosa aos direitos humanos.A proposta deve ser prática, detalhada e, se possível, explicada em termos de quem pode executá-la, como será feita e quais serão seus efeitos.5. Competência 5 – Elaboração da argumentaçãoAvalia a argumentação do candidato e a capacidade de defender sua opinião de forma clara e convincente.O texto precisa apresentar argumentos sólidos e bem estruturados que sustentem a tese (a ideia principal) defendida.É importante usar exemplos, dados ou fatos que reforcem a argumentação, além de evitar falácias.Como a correção é feita?Redação é corrigida por dois avaliadores independentes. Se houver uma diferença muito grande nas notas (acima de 200 pontos), um terceiro avaliador pode ser chamado para dar a pontuação final.Cada competência recebe uma pontuação de 0 a 200, e a soma dessas notas resulta na pontuação final.O desvio de tema (quando o candidato foge do tema proposto) e o não cumprimento da proposta de intervenção (não apresentar uma solução para o problema) resultam em nota zero. ||  IMPORTANTE Mande só o json sem aspas e sem pular linhas com barra n || atente-se ao aos caracteres tem que ser ufi-8 || IMPORTANTE tem que ser uma resposta pronta pra ser formatada com JSON.parse e caber na interface nota: number;pontos_fortes: string[];pontos_a_melhorar: string[];  sugestoes: string[];repertorio_possivel: string[] | essa deve ser o formato da resposta {"nota":1000,"pontos_fortes": [],"pontos_a_melhorar": [],"sugestoes": [],"repertorio_possivel": []}: \n' +
        data;
    const getResponse = async () => {
        const result = await model.generateContent(prompt);
        let respostaTexto = result.response.text().trim();
        // Remover qualquer texto antes do primeiro '{' e depois do último '}'
        respostaTexto = respostaTexto.replace(/^[^\{]*/, '').trim(); // Remove texto antes do '{'
        respostaTexto = respostaTexto.replace(/[^\}]*$/, '').trim(); // Remove texto depois do '}'
        // Parsear o texto restante para JSON
        let resposta;
        try {
            resposta = JSON.parse(respostaTexto);
        }
        catch (error) {
            // Em caso de erro na conversão do JSON
            return res.status(400).json({ error: 'Erro ao parsear o JSON.' });
        }
        return res.status(200).json(resposta);
    };
    getResponse();
});
