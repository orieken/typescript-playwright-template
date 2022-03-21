FROM mcr.microsoft.com/playwright:v1.20.0-focal

ADD . /workspace
WORKDIR /workspace

RUN npm install

ENTRYPOINT [ "/bin/bash" ]
