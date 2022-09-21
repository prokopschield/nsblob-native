import { Semaphore } from '@prokopschield/semaphore';
import { DB } from 'insta-db';
import os from 'os';
import path from 'path';

export class HashMap extends DB {
	semaphore = new Semaphore('nsblob-native-hashmap');

	constructor() {
		super({
			read_only_files: [],
			size: 1024 * 1024 * 1024,
			storage_copies: [],
			storage_file: path.resolve(
				os.homedir(),
				'.cache',
				'nsblob-native',
				'hashmap'
			),
		});
	}

	setB2H(blake: string, hash: string) {
		if (!this.semaphore.wait()) {
			return undefined;
		}

		const returnValue = this.set(
			Buffer.from(blake, 'hex'),
			Buffer.from(hash, 'hex')
		);

		this.semaphore.post();

		return returnValue;
	}

	getB2H(blake: string) {
		if (!this.semaphore.wait()) {
			return undefined;
		}

		const returnValue = this.get(Buffer.from(blake, 'hex')) || '';

		this.semaphore.post();

		return returnValue.toString('hex') || undefined;
	}
}
