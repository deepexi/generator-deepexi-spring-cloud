#!/bin/bash

docker run \
  --name $CONTAINER_NAME \
  --restart=on-failure:5 \
  --privileged \
  -p $PORT:8080 \
  -v $PWD/logs:/home/logs \
  -d $IMG_NAME \
    --spring.profiles.active=prod
