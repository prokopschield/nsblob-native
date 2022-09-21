import { createHash } from 'blake2';

export function blake2sHex(buffer: Buffer | string | Uint8Array) {
	const ctx = createHash('blake2s');

	ctx.update(Buffer.from(buffer));

	return ctx.digest('hex');
}
