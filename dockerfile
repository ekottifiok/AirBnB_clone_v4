FROM python:3.8-slim-buster

COPY requirements.txt  /tmp

RUN apt-get update && \
    apt-get install -y default-libmysqlclient-dev gcc python3-lxml && \
    pip install -U pip && \
    pip install -r /tmp/requirements.txt

WORKDIR /python-docker
COPY . .
EXPOSE 5000
