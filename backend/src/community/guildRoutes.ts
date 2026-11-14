import { Router } from 'express';
import { asyncRoute } from '../core/http';
import { integer } from '../core/engine';
import { createGuild, createTopic, decideApplication, deletePost, disbandGuild, guildBoard, guildDirectory, guildPage, guildTopic, invite, kickMember, leaveGuild, myGuild, pinTopic, replyTopic, requestJoin, setRank, updateGuild } from './guildService';
import { friendList } from './friendsService';

// Guildas e lista de amigos. Leituras: diretório e página da guilda; o quadro é só para membros (o serviço confere). Mudanças: sempre
// em nome de um personagem da conta, que o serviço trava e confere.
export const guildRoutes = Router();
const id = (v: unknown) => integer(Number(v));
const me = (req: { params: Record<string, string> }) => id(req.params.id);
guildRoutes.get('/guilds', asyncRoute(async (req, res) => { res.json(await guildDirectory(req.query)); }));
guildRoutes.get('/guilds/:gid', asyncRoute(async (req, res) => { res.json(await guildPage(res.locals.accountId, id(req.query.as), id(req.params.gid))); }));
guildRoutes.get('/characters/:id/guild', asyncRoute(async (req, res) => { res.json(await myGuild(res.locals.accountId, me(req))); }));
guildRoutes.get('/characters/:id/guild/board', asyncRoute(async (req, res) => { res.json(await guildBoard(res.locals.accountId, me(req), req.query)); }));
guildRoutes.get('/characters/:id/guild/topics/:pid', asyncRoute(async (req, res) => { res.json(await guildTopic(res.locals.accountId, me(req), id(req.params.pid), req.query)); }));
guildRoutes.get('/characters/:id/friends', asyncRoute(async (req, res) => { res.json(await friendList(res.locals.accountId, me(req), req.query)); }));

guildRoutes.post('/characters/:id/guild', asyncRoute(async (req, res) => { res.json(await createGuild(res.locals.accountId, me(req), req.body ?? {})); }));
guildRoutes.post('/characters/:id/guild/join/:gid', asyncRoute(async (req, res) => { res.json(await requestJoin(res.locals.accountId, me(req), id(req.params.gid))); }));
guildRoutes.post('/characters/:id/guild/applications/:aid/:action', asyncRoute(async (req, res) => { res.json(await decideApplication(res.locals.accountId, me(req), id(req.params.aid), req.params.action)); }));
guildRoutes.post('/characters/:id/guild/invite', asyncRoute(async (req, res) => { res.json(await invite(res.locals.accountId, me(req), req.body?.name)); }));
guildRoutes.post('/characters/:id/guild/leave', asyncRoute(async (req, res) => { res.json(await leaveGuild(res.locals.accountId, me(req))); }));
guildRoutes.post('/characters/:id/guild/update', asyncRoute(async (req, res) => { res.json(await updateGuild(res.locals.accountId, me(req), req.body ?? {})); }));
guildRoutes.post('/characters/:id/guild/disband', asyncRoute(async (req, res) => { res.json(await disbandGuild(res.locals.accountId, me(req), req.body?.confirm)); }));
guildRoutes.post('/characters/:id/guild/members/:tid/kick', asyncRoute(async (req, res) => { res.json(await kickMember(res.locals.accountId, me(req), id(req.params.tid))); }));
guildRoutes.post('/characters/:id/guild/members/:tid/:action(promote|demote|leader)', asyncRoute(async (req, res) => { res.json(await setRank(res.locals.accountId, me(req), id(req.params.tid), req.params.action)); }));
guildRoutes.post('/characters/:id/guild/topics', asyncRoute(async (req, res) => { res.json(await createTopic(res.locals.accountId, me(req), req.body ?? {})); }));
guildRoutes.post('/characters/:id/guild/topics/:pid/replies', asyncRoute(async (req, res) => { res.json(await replyTopic(res.locals.accountId, me(req), id(req.params.pid), req.body?.body)); }));
guildRoutes.post('/characters/:id/guild/topics/:pid/pin', asyncRoute(async (req, res) => { res.json(await pinTopic(res.locals.accountId, me(req), id(req.params.pid), req.body?.pinned)); }));
guildRoutes.post('/characters/:id/guild/:kind(topics|replies)/:itemId/delete', asyncRoute(async (req, res) => { res.json(await deletePost(res.locals.accountId, me(req), req.params.kind === 'topics' ? 'topic' : 'reply', id(req.params.itemId))); }));
