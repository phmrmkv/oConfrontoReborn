# Gaveta `premium`

**Para que serve:** Gemas (moeda da conta, compradas no Mercado Pago), Passe Premium (30 dias) ativado com gemas, benefícios só estéticos/organizacionais.

## Arquivos
- `premium.ts` – períodos encadeados, `premiumStatus`/`isPremium`
- `shared/premium.ts` – benefícios (com sprite), títulos, molduras e `premiumPhase` (ativo / terminando / agendado / encerrado), usado pela tela e testado em `premium.test.ts`
- `gems.ts` – `addGems`: único jeito de mudar `Account.gems`, sempre com `GemLedger` na mesma transação (conta travada)
- `shared/gems.ts` – pacotes (`gemPacks`, chaves `gems.packN.*` em `loadSettings`) e motivos do extrato
- `premiumService.ts` – loja (`startGemCheckout`), ativação com gemas (`activatePremiumWithGems`, idempotente pela chave), compras e extrato paginados, webhook (`processMercadoPagoPayment`), reembolso
- `mercadopago.ts` – API, assinatura HMAC
- `webhookRoutes.ts` – `POST /webhooks/mercadopago`
- `premiumRoutes.ts` – painel Premium, conjuntos de equipamento, favoritos, perfil, estatísticas

## Rotas
`/premium`, `/gems/checkout`, `/premium/activate`, `/gems/orders`, `/gems/history`, presets, favorito, perfil, hunt-stats, `/webhooks/mercadopago`. Admin: `/admin/accounts/:id/gems`, `/admin/orders` (paginado).

## Dependências permitidas
Depende de `core` (e `economy` se precisar).

## Regras que não podem quebrar
Premium nunca altera combate, XP, ouro ou drops; gemas nunca viram ouro, XP nem item. Gemas só entram após webhook com assinatura válida e pagamento reconsultado na API; eventos repetidos são idempotentes (PaymentEvent + pedido travado). Pedido com `gems = 0` é a venda direta antiga do Premium e continua sendo honrado. Reembolso/estorno tira as gemas mesmo que já gastas (saldo pode ficar negativo; nada se ativa com saldo negativo). Sem `MP_ACCESS_TOKEN` e `MP_WEBHOOK_SECRET` a loja fica desligada com mensagem.

## Testes
`npm test` (premium.test) · `backend/tests/gems-integration.ts` (base `_test`) · `npm run mp:sim` · `MERCADOPAGO-TESTE.md`

## Modelo de prompt de manutenção
```
Leia GAVETAS.md e backend/src/premium/GAVETA.md.
Tarefa: <descreva em uma frase o que mudar>.
Escopo: somente a gaveta premium (e shared/ se for regra compartilhada). Não renomeie rotas, props, colunas nem funções públicas.
Antes de editar: mostre o plano em passos curtos e espere eu aprovar. Trabalhe em uma branch.
Depois: rode npm run check, npm test, npm run check:drawers e <teste de integração da gaveta> (base *_test).
Entregue: o que mudou, o que NÃO conseguiu verificar e uma lista separada de bugs vistos fora do escopo (não corrija).
```
