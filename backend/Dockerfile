FROM fedora:23
MAINTAINER Tomohiro NAKAMURA <quickness.net@gmail.com>

RUN ["dnf", "-y", "upgrade"]

# create env
RUN ["mkdir", "/code"]
RUN ["pyvenv-3.4", "--clear", "--without-pip", "/code/pyvenv"]
COPY get-pip.py /code/
RUN ["/code/pyvenv/bin/python3", "/code/get-pip.py"]
RUN ["/code/pyvenv/bin/pip3", "install", "-U", "setuptools", "pip", "wheel"]
COPY requirements.txt /code/
RUN ["/code/pyvenv/bin/pip3", "install", "-r", "/code/requirements.txt"]

# copy files
COPY backend/ /code/backend/

# run
CMD ["/code/pyvenv/bin/python3", "/code/backend/__init__.py"]

# vim:ft=dockerfile:
