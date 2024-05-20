---
updatedAt: 2024-04-21
directory: Cheatsheet
fileName: Docker_Cheat_Sheet
title: Docker Cheat Sheet
description: ✅
---

# Docker Cheat Sheet

- [Docker Cheat Sheet](#docker-cheat-sheet)
  - [Dockerfile](#dockerfile)
    - [FROM](#from)
    - [RUN](#run)
    - [CMD](#cmd)
    - [WORKDIR](#workdir)
    - [COPY](#copy)
    - [ADD](#add)
    - [EXPOSE](#expose)
    - [ENV](#env)
    - [ENTRYPOINT](#entrypoint)
    - [ARG](#arg)
    - [USER](#user)
  - [Docker Registry](#docker-registry)
  - [Docker Containers](#docker-containers)
  - [Docker Networking](#docker-networking)
  - [Docker Volumes](#docker-volumes)
  - [Docker Compose](#docker-compose)

## Dockerfile

A Dockerfile is a script used to build Docker images. It consists of a series of commands:

### FROM

FROM image_name:tag

Description: Specifies the base image used to build the new image.

### RUN

RUN command

Description: Executes a command in the new image's filesystem during the build process.

### CMD

CMD command

Description: Specifies the default command to run when a container is launched from the image.

### WORKDIR

WORKDIR /path/to/directory

Description: Sets the working directory for subsequent instructions.

### COPY

COPY source destination

Description: Copies files or directories from the host system into the image.

### ADD

ADD source destination

Description: Similar to COPY, but can also extract tarballs or fetch URLs.

### EXPOSE

EXPOSE port

Description: Informs Docker that the container listens on specific network ports at runtime.

### ENV

ENV key=value

Description: Sets environment variables in the image.

### ENTRYPOINT

ENTRYPOINT command

Description: Configures the container to run as an executable.

### ARG

ARG variable_name

Description: Defines a variable that users can pass at build-time to the builder with the docker build command.

### USER

USER username

Description: Sets the user the application will run as within the container.

## Docker Registry

Login to a Docker registry:

```bash
docker login
```

Description: Logs in to a Docker registry interactively.

Logout from a Docker registry:

```bash
docker logout
```

Description: Logs out from a Docker registry.

Build an image from a Dockerfile:

```bash
docker build -t image_name .
```

Description: Builds a Docker image from a Dockerfile in the current directory.

Push an image to a Docker registry:

```bash
docker push image_name
```

Description: Pushes a Docker image to a Docker registry.

## Docker Containers

Run a container interactively:

```bash
docker run -it image_name
```

Description: Starts a new container interactively using the specified image.

Run a detached container:

```bash
docker run -d image_name
```

Description: Starts a new container in detached mode (background).

Run a container with a custom name:

```bash
docker run --name custom_name image_name
```

Description: Starts a new container with a specific name.

Run a container with environment variables:

```bash
docker run -e "VAR=value" image_name
```

Description: Sets environment variables in the container.

Run a container and map ports:

```bash
docker run -p host_port:container_port image_name
```

Description: Maps a container port to a host port.

Run a container and mount a volume:

```bash
docker run -v /host/path:/container/path image_name
```

Description: Mounts a host directory into the container.

Stop a running container:

```bash
docker stop container_id
```

Description: Stops a running container.

Start a stopped container:

```bash
docker start container_id
```

Description: Starts a stopped container.

Pause a running container:

```bash
docker pause container_id
```

Description: Pauses the execution of a container.

Unpause a paused container:

```bash
docker unpause container_id
```

Description: Resumes a paused container.

Restart a container:

```bash
docker restart container_id
```

Description: Restarts a running or stopped container.

Attach to a running container:

```bash
docker exec -it container_id /bin/bash
```

Description: Attaches to a running container and opens a shell.

Remove a stopped container:

```bash
docker rm container_id
```

Description: Deletes a stopped container.

Remove a running container:

```bash
docker rm -f container_id
```

Description: Forces removal of a running container.

Show container resource usage:

```bash
docker stats container_id
```

Description: Displays live resource usage statistics of a container.

Show container logs:

```bash
docker logs container_id
```

Description: Displays logs from a container.

Copy files from/to a container:

```bash
docker cp /local/path container_id:/container/path
```

Description: Copies files between a container and the local filesystem.

Inspect a container:

```bash
docker inspect container_id
```

Description: Shows detailed information about a container.

Create a container without starting it:

```bash
docker create image_name
```

Description: Creates a new container without starting it.

## Docker Networking

List networks:

```bash
docker network ls
```

Description: Lists all networks created on the Docker host.

Create a network:

```bash
docker network create my_network
```

Description: Creates a user-defined bridge network named 'my_network'.

Inspect a network:

```bash
docker network inspect my_network
```

Description: Displays detailed information about the 'my_network' network.

Remove a network:

```bash
docker network rm my_network
```

Description: Removes the 'my_network' network.

Connect a container to a network:

```bash
docker network connect my_network container_name
```

Description: Connects a container to the 'my_network' network.

Disconnect a container from a network:

```bash
docker network disconnect my_network container_name
```

Description: Disconnects a container from the 'my_network' network.

Attach a container to multiple networks:

```bash
docker network connect my_network_2 container_name
```

Description: Attaches the container to an additional network 'my_network_2'.

Create an overlay network:

```bash
docker network create --driver overlay my_overlay_network
```

Description: Creates a multi-host overlay network 'my_overlay_network'.

Remove all unused networks:

```bash
docker network prune
```

Description: Removes all networks not used by at least one container.

Set up a custom bridge network:

```bash
docker network create --driver bridge --subnet=192.168.5.0/24 --gateway=192.168.5.1 my_custom_network
```

Description: Creates a custom bridge network 'my_custom_network' with specified subnet and gateway.

Limit container bandwidth on a network:

```bash
docker network create --driver bridge --subnet=192.168.5.0/24 --gateway=192.168.5.1 --opt "com.docker.network.bridge.enable_icc=false" my_secure_network
```

Description: Creates a secure bridge network 'my_secure_network' disabling inter-container communication.

## Docker Volumes

List volumes:

```bash
docker volume ls
```

Description: Lists all volumes on the Docker host.

Create a volume:

```bash
docker volume create my_volume
```

Description: Creates a named volume named 'my_volume'.

Inspect a volume:

```bash
docker volume inspect my_volume
```

Description: Displays detailed information about the 'my_volume' volume.

Remove a volume:

```bash
docker volume rm my_volume
```

Description: Removes the 'my_volume' volume.

Remove all unused volumes:

```bash
docker volume prune
```

Description: Removes all volumes not used by at least one container.

Mount a volume while running a container:

```bash
docker run -v my_volume:/path/in/container image_name
```

Description: Mounts the 'my_volume' volume to a specific path inside the container.

Mount a host directory as a volume:

```bash
docker run -v /host/path:/container/path image_name
```

Description: Mounts a directory from the host system into the container.

Specify volume driver:

```bash
docker volume create --driver my_driver my_volume
```

Description: Creates a volume using a specific volume driver 'my_driver'.

Copy files from a container volume to the local host:

```bash
docker cp container_id:/path/in/container /local/host/path
```

Description: Copies files from a container volume to a directory on the local host.

Mount a read-only volume:

```bash
docker run -v my_volume:/path/in/container:ro image_name
```

Description: Mounts the 'my_volume' volume as read-only inside the container.

Mount a named volume with specific options:

```bash
docker run -v my_volume:/path/in/container:options image_name
```

Description: Mounts the 'my_volume' volume with specific options (e.g., read-write permissions).

Backup a volume to a tar archive:

```bash
docker run --rm -v my_volume:/data -v /backup:/backup ubuntu tar cvf /backup/my_volume_backup.tar /data
```

Description: Creates a tar archive of the 'my_volume' volume in the /backup directory.

## Docker Compose

Create and start containers:

```bash
docker-compose up
```

Description: Builds, (re)creates, starts, and attaches to containers for a service.

Stop and remove containers:

```bash
docker-compose down
```

Description: Stops and removes containers, networks, volumes, and images created by 'up' command.

Build services:

```bash
docker-compose build
```

Description: Builds or rebuilds services defined in the docker-compose.yml file.

Start services:

```bash
docker-compose start
```

Description: Start services defined in the docker-compose.yml file.

Stop services:

```bash
docker-compose stop
```

Description: Stops services defined in the docker-compose.yml file without removing containers.

Restart services:

```bash
docker-compose restart
```

Description: Restarts services defined in the docker-compose.yml file.

Pause services:

```bash
docker-compose pause
```

Description: Pauses all services in the docker-compose.yml file.

Unpause services:

```bash
docker-compose unpause
```

Description: Unpauses all paused services in the docker-compose.yml file.

View service logs:

```bash
docker-compose logs
```

Description: Displays log output from services.

Scale services:

```bash
docker-compose scale service_name=num_of_instances
```

Description: Scale services to a specified number of instances.
