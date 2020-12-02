# Fritz

Fritz is an application designed to improve analyst workflows by automating redundant tasks and streamlining product creation

![Fritz](resources/readme/Fritz-HomePage.png?raw=true "Fritz")

## Stable Executables

In the [master/artifacts](https://gitlab.devops.geointservices.io/dgs1sdt/fritz/tree/master/artifacts) folder, you can find the latest stable builds of Fritz.


### Endpoints
* /metrics: Metric information based on the usage of Fritz

## Installing (Production)
### Prerequisites

* [mySQL 5.7](https://downloads.mysql.com/archives/installer/)
* [Java 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

### Instructions

Download the [latest stable jar](https://gitlab.devops.geointservices.io/dgs1sdt/fritz/tree/master/artifacts) for your use case.

Run the following commands in Command Prompt to create the database:

```
mysql -u root -e "create database fritzdev;"
mysql -u root -e "create user 'fritz'@'localhost';"
mysql -u root -e "GRANT ALL PRIVILEGES ON fritzdev.* TO 'fritz'@'localhost';"
```

Create the following [Environmental Variables](https://java.com/en/download/help/path.xml):

```
export FRITZ_DB_URL=jdbc:mysql://localhost:3306/fritzdev?useSSL=false&serverTimezone=UTC
export FRITZ_DB_USERNAME=fritz
export CLASSIFIED=UNCLASSIFIED
export UNICORN_URL=https://codweb1.leidoshost.com/UNICORN.NET
```  

Run the following command to start the Fritz.

```
java -jar <path-to-executable>\fritz-<type>.jar
```

Access Fritz at this url.
```
http://localhost:8080/
```

## Installing (Development)

If you wish to install Fritz on a development computer, follow the Production commands, then follow these instructions.

### Prerequisites

* [Node](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/docs/install)
* [Git](https://git-scm.com/download)

### Instructions

Clone the repository

```
git clone git@gitlab.devops.geointservices.io:dgs1sdt/fritz.git
```

Install Dependencies & Test

```
cd <git_dir>\fritz\scripts
.\tests.sh
```
