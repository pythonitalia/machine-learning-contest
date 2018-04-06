# PyCon Nove ML Contest

This is the source code of the app used for the Machine Learning contest
that will be launched during the PyCon Nove Conference.

## Backend

The backend is a Python application using Django and Graphene.

## Frontend

The frontend is a single page application built with React and Material UI.

## How it works - Registration and Teams

Users can login and create their team. A team can be formed by one or more
people. You will always be in the team you have created. One user can only be
in one single team.

### User Model

- email
- password

### Team Model

- name
- owner (One to One to user)
- members (list of emails, excluding the current user)

Instead of asking all the user to register we ask the team owner to provider
their emails. Again, one user can only be in one team and no superuser can
be in a team, since they have access to the admin.

## How it works - Challenges

Each team can partecipate in one or more challenges. The challenges might be
unlocked by a code (TBD).

### Challenge Model

- name
- description
- data (url to dataset)
- unlock_code (?)
- solution (needed to validate a submission)

A user can submit a solution more than once and they will get instant
feedback on their result.

### Solution Model

- team
- created
- score
- submitted_data