FROM ubuntu:18.04
# Install packages including xvfb
RUN apt-get update && apt-get install default-jdk -y && apt-get install  unzip xvfb libxi6 libgconf-2-4 -y

RUN mkdir /opt/jmeter && cd /opt/jmeter && apt install wget -y
# Get JMeter
RUN wget   https://downloads.apache.org//jmeter/binaries/apache-jmeter-5.3.zip && unzip apache-jmeter-5.3.zip
# Install Webdriver plugin
RUN cd apache-jmeter-5.3 && wget https://jmeter-plugins.org/files/packages/jpgc-webdriver-3.2.zip && unzip jpgc-webdriver-3.2.zip
# Install geckodriver
RUN cd /opt/jmeter && mkdir bin && cd bin && wget https://github.com/mozilla/geckodriver/releases/download/v0.27.0/geckodriver-v0.27.0-linux32.tar.gz && tar -xzf geckodriver-v0.27.0-linux32.tar.gz
# Install Firefox
RUN apt install firefox -y
# Add JMeter and geckodriver folders to PATH
ENV PATH="/apache-jmeter-5.3/bin:/opt/jmeter/bin:${PATH}"
# Set xvfb Screen Number
ENV DISPLAY=:99

RUN chmod +x /opt/jmeter/bin/geckodriver 
RUN chown root:root /opt/jmeter/bin/geckodriver 