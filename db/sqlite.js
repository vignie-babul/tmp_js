import sqlite from "sqlite3";

export default class SqliteLinker {
	/**
	 * Аргументы:
	 * 		filename: путь к файлу базы данных,
	 */
	constructor(filename) {
		this.filename = filename;
		this.db = null;
	}

	/**
	 * Асинхронное подключение к файлу базы данных.
	 * 
	 * Аргументы:
	 * 		filename: путь к файлу базы данных,
	 * 
	 * Возвращает:
	 * 		экземпляр sqlite.Database.
	 */
	async connect_to_database(filename) {
		this.db = new sqlite.Database(this.filename, (err) => {
			if (err) {
				console.log(`Error: ${JSON.stringify(err)}.`);
				return;
			}

			console.log(`Info: connect to database file ${this.filename}`);
		});

		return this.db;
	}

	/**
	 * Асинхронное выполнение SQL запроса в подключенной базе данных
	 * с получением последнего измененного ID и изменений над ним.
	 * 
	 * Аргументы:
	 * 		sql: SQL запрос,
	 * 		params: возможные параметры,
	 * 
	 * Возвращает:
	 * 		экземпляр Promise.
	 */
	async run_sql(sql, params = []) {
		const result = await new Promise((resolve, reject) => {
			this.db.run(sql, params, function(err) {
				if (err) {
					console.log(`Error: ${err}.`);
					reject(err);
					return;
				}

				resolve({
					lastID: this.lastID,
					changes: this.changes,
				});
			});
		});

		return result;
	}

	/**
	 * Асинхронное получение одной строки по переданному SQL запросу
	 * в подключенную базу данных.
	 * 
	 * Аргументы:
	 * 		sql: SQL запрос,
	 * 		params: возможные параметры,
	 * 
	 * Возвращает:
	 * 		экземпляр Promise.
	 */
	async get_row(sql, params = []) {
		const result = await new Promise((resolve, reject) => {
			this.db.get(sql, params, function(err, row) {
				if (err) {
					console.log(`Error: ${err}.`);
					reject(err);
					return;
				}

				resolve(row);
			});
		});

		return result;
	}

	/**
	 * Асинхронное получение всех строк по переданному SQL запросу
	 * в подключенную базу данных.
	 * 
	 * Аргументы:
	 * 		sql: SQL запрос,
	 * 		params: возможные параметры,
	 * 
	 * Возвращает:
	 * 		экземпляр Promise.
	 */
	async get_all_rows(sql, params = []) {
		const result = await new Promise((resolve, reject) => {
			this.db.all(sql, params, function(err, rows) {
				if (err) {
					console.log(`Error: ${err}.`);
					reject(err);
					return;
				}

				resolve(rows);
			});
		});

		return result;
	}

	/**
	 * Асинхронное закрытие соединения к подключенной базе данных.
	 * 
	 * Возвращает:
	 * 		экземпляр Promise.
	 */
	async close() {
		const result = await new Promise((resolve, reject) => {
			this.db.close(sql, params, function(err) {
				if (err) {
					console.log(`Error: ${err}.`);
					reject(err);
					return;
				}

				resolve();
			});
		});

		return result;
	}
}
