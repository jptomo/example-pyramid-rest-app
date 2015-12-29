FROM fedora:23

WORKDIR .

# install dependency
RUN ["dnf", "-y", "group", "install", "Development Tools"]
RUN ["dnf", "-y", "install", "python3-devel"]

# create env
RUN ["pyvenv-3.4", "--clear", "--without-pip", "pyvenv"]
RUN ["mkdir", "-p", "/code"]
ADD ["./get-pip.py", "/code/"]
RUN ["./pyvenv/bin/python3", "/code/get-pip.py"]
RUN ["./pyvenv/bin/pip3", "install", "-U", "setuptools", "pip", "wheel"]
ADD ["./requirements.txt", "/code/"]
RUN ["./pyvenv/bin/pip3", "install", "-r", "/code/requirements.txt"]

# copy files
RUN ["mkdir", "-p", "/code/backend"]
COPY ["./", "/code/"]

# run
CMD ["./pyvenv/bin/python3", "/code/backend/__init__.py"]

# vim:ft=dockerfile:
