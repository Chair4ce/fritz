#!/usr/bin/env bash
mysql -u root -e "create database fritzdev;"
mysql -u root -e "create user 'fritz'@'localhost';"
mysql -u root -e "GRANT ALL PRIVILEGES ON fritzdev.* TO 'fritz'@'localhost';"