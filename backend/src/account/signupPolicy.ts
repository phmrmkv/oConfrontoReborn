import { timingSafeEqual } from 'node:crypto';

// Controle de cadastro por variável de ambiente. O padrão continua sendo "aberto" (comportamento de sempre).
//   CADASTRO=aberto   qualquer pessoa cria conta (padrão)
//   CADASTRO=convite  só quem informar o CODIGO_CONVITE; sem CODIGO_CONVITE definido, vale como fechado
//   CADASTRO=fechado  ninguém cria conta; quem já tem conta entra normalmente
export type SignupMode = 'aberto' | 'convite' | 'fechado';

export function signupMode(env: NodeJS.ProcessEnv = process.env): SignupMode {
  const raw = (env.CADASTRO ?? '').trim().toLowerCase();
  if (raw === 'convite' || raw === 'fechado') return raw;
  return 'aberto';
}

const same = (a: string, b: string) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); };

// Devolve null quando o cadastro pode seguir, ou a mensagem amigável (e o status HTTP) quando não pode.
export function signupBlock(invite: unknown, env: NodeJS.ProcessEnv = process.env): { status: number; message: string } | null {
  const mode = signupMode(env);
  if (mode === 'aberto') return null;
  const closed = { status: 403, message: 'Os cadastros estão fechados no momento. Quem já tem conta pode entrar normalmente. Volte em breve!' };
  if (mode === 'fechado') return closed;
  const code = (env.CODIGO_CONVITE ?? '').trim();
  if (!code) return closed;
  if (typeof invite !== 'string' || !invite.trim()) return { status: 403, message: 'O cadastro está disponível só por convite. Informe o código de convite que você recebeu.' };
  if (!same(invite.trim(), code)) return { status: 403, message: 'Código de convite inválido. Confira o código que você recebeu e tente de novo.' };
  return null;
}
