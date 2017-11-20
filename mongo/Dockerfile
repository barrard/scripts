# This file a simple wrapper around the official mongo
# Dockerfile.
#
# It adds a script, which inherits two environment
# variables from the external docker-compose situation.
#
# Read the `setup.sh` for more insight.
#
FROM mongo:3.4.2
MAINTAINER William T. Cinnamon <tyler@skotchpine.com>

ARG MONGO_USER
ARG MONGO_PASS

COPY setup.sh /setup.sh
RUN /setup.sh
