import { Semaphore } from '@prokopschield/semaphore';
import fs from 'fs';
import DataMap from 'nscdn-hashmap';
import os from 'os';
import path from 'path';

export class HashMap extends DataMap<string, string> {
	semaphore = new Semaphore(`nsblob-native-hashmap-${process.getuid?.()}`);

	constructor() {
		const directory = path.resolve(os.homedir(), '.cache', 'nsblob-native');

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}

		const storage_file = path.resolve(directory, 'hashmap-0.2.2');

		super(storage_file, 1024 * 1024 * 1024);
	}

	setB2H(blake: string, hash: string) {
		if (!this.semaphore.wait()) {
			return undefined;
		}

		const returnValue = this.set(blake, hash);

		this.semaphore.post();

		return returnValue;
	}

	getB2H(blake: string) {
		if (!this.semaphore.wait()) {
			return undefined;
		}

		const returnValue = this.hashmap.get(blake);

		this.semaphore.post();

		return returnValue || undefined;
	}
}
