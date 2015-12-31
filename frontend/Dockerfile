FROM fedora:23
MAINTAINER Tomohiro NAKAMURA <quickness.net@gmail.com>

RUN ["dnf", "-y", "upgrade"]

# copy files
RUN ["mkdir", "/code"]
COPY index.html /code/index.html
COPY main.js /code/main.js
COPY partial/ /code/partial/

# run
WORKDIR "/code/"
CMD ["python3", "-m", "http.server", "8000"]

# vim:ft=dockerfile:
