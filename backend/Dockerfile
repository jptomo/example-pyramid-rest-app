FROM fedora:23

WORKDIR .

# install dependency
RUN ["dnf", "-y", "group", "install", "Development Tools"]
RUN ["dnf", "-y", "install", "python3-devel"]

# copy files
RUN ["mkdir", "/code"]
COPY ["./*", "/code/"]

# create env
RUN ["pyvenv-3.4", "--clear", "--without-pip", "pyvenv"]
RUN ["./pyvenv/bin/python3", "/code/get-pip.py"]
RUN ["./pyvenv/bin/pip3", "install", "-U", "setuptools", "pip", "wheel"]
RUN ["./pyvenv/bin/pip3", "install", "-r", "/code/requirements.txt"]

# run
CMD ["./pyvenv/bin/python3", "/code/hello.py"]

# vim:ft=dockerfile:
