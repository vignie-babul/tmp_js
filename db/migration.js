import SqliteLinker from './sqlite.js';

class Migration {
	constructor(linker) {
		this.linker = linker;
	}

	async #exec(sql) {
		if (typeof sql !== "string" || !sql) {
			console.log("Error: invalid SQL string.");
			return;
		}

		await this.linker.run_sql(sql);
	}

	async up(sql) {
		try {
			await this.#exec(sql);
		} catch (err) {
			console.log(`Error: ${err}.`);
		} finally {
			await this.linker.close();
		}
	}

	async down(sql) {
		try {
			await this.#exec(sql);
		} catch (err) {
			console.log(`Error: ${err}.`);
		} finally {
			await this.linker.close();
		}
	}
}

export const migration = new Migration(
	new SqliteLinker("./main.db")
);
