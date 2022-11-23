#  Using --ipc=host is recommended when using Chrome (Docker docs). Chrome can run out of memory without this flag.
# docker run -it --name playwright --rm mcr.microsoft.com/playwright/python:v1.27.1-focal /bin/bash
# docker run -it --name playwright --rm --ipc=host mcr.microsoft.com/playwright/python:v1.27.1-focal /bin/bash

# docker run -it --name playwright --rm --ipc=host --user pwuser --security-opt seccomp=seccomp_profile.json mcr.microsoft.com/playwright/python:v1.27.1-focal /bin/bash

docker run -ti isaactl/playwright:latest /bin/bash