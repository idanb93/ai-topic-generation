FROM postgres
RUN apt-get update
COPY ./database/campaigns_topics/create_campaigns_topics_table.sql /docker-entrypoint-initdb.d/
COPY ./database/campaigns_topics/insert_campaigns_topics.sql /docker-entrypoint-initdb.d/