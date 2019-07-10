FROM openjdk:8

WORKDIR /home

COPY ./target/app.jar /home
