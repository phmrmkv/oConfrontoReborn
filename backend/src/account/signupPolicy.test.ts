import test from 'node:test';
import assert from 'node:assert/strict';
import { signupMode, signupBlock } from './signupPolicy';

const env = (e: Record<string, string>) => e as unknown as NodeJS.ProcessEnv;
test('cadastro: padrão é aberto, inclusive com valor desconhecido', () => {
  assert.equal(signupMode(env({})), 'aberto');
  assert.equal(signupMode(env({ CADASTRO: '' })), 'aberto');
  assert.equal(signupMode(env({ CADASTRO: 'qualquer' })), 'aberto');
  assert.equal(signupBlock(undefined, env({})), null);
  assert.equal(signupBlock('x', env({ CADASTRO: 'aberto', CODIGO_CONVITE: 'abc' })), null);
});
test('cadastro: fechado bloqueia com mensagem amigável', () => {
  const b = signupBlock(undefined, env({ CADASTRO: 'Fechado' }));
  assert.equal(b?.status, 403); assert.match(b!.message, /fechados/);
  assert.match(signupBlock('abc', env({ CADASTRO: 'fechado', CODIGO_CONVITE: 'abc' }))!.message, /fechados/);
});
test('cadastro: convite exige o código certo; sem código configurado vale como fechado', () => {
  const e = env({ CADASTRO: 'convite', CODIGO_CONVITE: 'abre-te-sesamo' });
  assert.match(signupBlock(undefined, e)!.message, /convite/);
  assert.match(signupBlock('', e)!.message, /convite/);
  assert.match(signupBlock('errado', e)!.message, /inválido/);
  assert.match(signupBlock(123, e)!.message, /convite/);
  assert.equal(signupBlock('  abre-te-sesamo ', e), null);
  assert.match(signupBlock('abre-te-sesamo', env({ CADASTRO: 'convite' }))!.message, /fechados/);
});
