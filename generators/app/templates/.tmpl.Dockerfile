FROM openjdk:8

WORKDIR /home

COPY ./${artifactId}-provider/target/app.jar /home

ADD entrypoint.sh /

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
