#!/usr/bin/env node

import nsblob from './nsblob';

async function print() {
	for (const arg of process.argv.slice(2)) {
		process.stdout.write(await nsblob.fetch(arg));
	}
}

const print_promise = print();

const parts = new Array<Buffer>();

process.stdin.on('data', (chunk) => parts.push(chunk));
process.stdin.on('end', async () => {
	const hash = await nsblob.store(Buffer.concat(parts));

	await print_promise;

	if (parts.length) {
		console.log(hash);
	}

	nsblob.socket.close();
});
