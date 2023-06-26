create table if not exists movie(
    id serial primary key,
    title varchar(200),
    release_date integer,
    overview varchar(200)
    )