CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS author (
    uid uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS publisher (
    uid uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS book (
    uid uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    ISBN text NOT NULL,
    name text NOT NULL,
    date timestamp with time zone NOT NULL,
    author_uid uuid NOT NULL REFERENCES author(uid) ON DELETE CASCADE,
    publisher_uid uuid NOT NULL REFERENCES publisher(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reader (
    uid uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    fullname text NOT NULL,
    email text NOT NULL
);

CREATE TABLE IF NOT EXISTS debt (
    uid uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    book_uid uuid NOT NULL REFERENCES book(uid) ON DELETE CASCADE,
    reader_uid uuid NOT NULL REFERENCES reader(uid) ON DELETE CASCADE
);
