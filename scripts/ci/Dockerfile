FROM dgs1sdt/blackpearl

USER root

# setup_env
ENV FRITZ_DB_URL=jdbc:mysql://localhost:3306/fritzdev?useSSL=false
ENV FRITZ_DB_USERNAME=fritz
ENV FRITZ_CI=true

# install dependencies from new repositories

# setup mysql
VOLUME /var/lib/mysql

ENTRYPOINT service mysql start &&\
    mysql -u root -e "create database fritzdev;" || true &&\
    mysql -u root -e "create user 'fritz'@'localhost';" || true &&\
    mysql -u root -e "GRANT ALL PRIVILEGES ON fritzdev.* TO 'fritz'@'localhost';" || true &&\
    /bin/bash