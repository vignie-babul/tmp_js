import {migration} from "../migration.js";

async function createDB() {
	await migration.up(`PRAGMA foreign_keys = ON;`);

	// structure
	await migration.up(`
		create table if not exists structure (
			id integer primary key autoincrement,
			name text not null,
			address text not null
		)
	`);

	// floor
	await migration.up(`
		create table if not exists floor (
			id integer primary key autoincrement,
			number integer not null,
			structure_id integer not null,

			foreign key (structure_id) references structure(id) on delete cascade
		)
	`);

	// room
	await migration.up(`
		create table if not exists room (
			id integer primary key autoincrement,
			number integer not null,
			floor_id integer not null,

			foreign key (floor_id) references floor(id) on delete cascade
		)
	`);

	// place
	await migration.up(`
		create table if not exists place (
			id integer primary key autoincrement,
			number integer not null,
			room_id integer not null,

			foreign key (room_id) references room(id) on delete cascade
		)
	`);

	// location
	await migration.up(`
		create table if not exists location (
			id integer primary key autoincrement,
			name text not null,
			place_id integer not null,

			foreign key (place_id) references place(id) on delete cascade
		);
	`);

	// category
	await migration.up(`
		create table if not exists category (
			id integer primary key autoincrement,
			name text not null,
			parent_id integer,

			foreign key (parent_id) references category(id) on delete set null
		);
	`);

	// item
	await migration.up(`
		create table if not exists item (
			id integer primary key autoincrement,
			name text not null,
			properties jsonb not null,
			status text not null,
			category_id integer,
			expected_location_id integer,
			current_location_id integer,

			foreign key (category_id) references category(id) on delete null,
			foreign key (expected_location_id) references location(id) on delete null,
			foreign key (current_location_id) references location(id) on delete null
		);
	`);
}

(async () => {
	await createDB();
})();
