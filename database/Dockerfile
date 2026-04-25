FROM postgres:15

ENV POSTGRES_USER=clinicalai
ENV POSTGRES_PASSWORD=clinicalai
ENV POSTGRES_DB=clinicalai

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432