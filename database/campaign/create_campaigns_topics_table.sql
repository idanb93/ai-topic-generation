CREATE TABLE campaigns_topics (
  id serial PRIMARY KEY,
  vertical varchar(255) NOT NULL,
  sub_vertical varchar(255) NOT NULL,
  topic varchar(255) NOT NULL,
  geo varchar(255) NOT NULL, 
  platform varchar(255) NOT NULL
);