FROM alpine
WORKDIR /usr/shr/data
RUN mongoimport --db testeDb --collection testeCollection --file /usr/src/db/pdvs.json --jsonArray
