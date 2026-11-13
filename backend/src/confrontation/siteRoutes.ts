// O que o SITE mostra do app Confrontation: o resumo do save na nuvem da conta aberta e os rankings do app, com a posição dela.
// As rotas de `appRoutes.ts` ficam em /api/app e pedem o token Bearer do app; estas ficam em /api, atrás do cookie e de
// `protectOrigin`, como o resto do site (são montadas em `server.ts` depois de `authenticate`).
// Só leitura: nada do app muda por aqui, e o ouro do app continua separado do ouro dos personagens do site.
import { Router } from 'express';
import { asyncRoute } from '../core/http';
import { GameError } from '../core/engine';
import { rankings, saveInfo } from './cloudService';
import { parseRankMetric } from './syncRules';

export const confrontationSiteRoutes = Router();

// O registro verificado da conta (versão, data do último envio e os números que o servidor aceitou), ou `save: null`
// para quem nunca enviou progresso pelo app.
confrontationSiteRoutes.get('/confrontation/summary', asyncRoute(async (_req, res) => {
  res.json({ save: await saveInfo(res.locals.accountId) });
}));

// A mesma leitura de /api/app/rankings, com a conta do cookie no lugar do token: 10 por página e a posição de quem pediu.
confrontationSiteRoutes.get('/confrontation/rankings', asyncRoute(async (req, res) => {
  const metric = parseRankMetric(req.query.metric);
  if (!metric) throw new GameError(400, 'Ranking inválido. Use vigil, power ou stage.');
  const period = req.query.period === 'week' ? 'week' : 'all';
  const page = Math.min(100_000, Math.max(1, Math.floor(Number(req.query.page) || 1)));
  res.json(await rankings(metric, period, page, res.locals.accountId));
}));
