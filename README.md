# Starter Template
Various starter templates for different sizes of applications to personal hobby projects with express + templating for simplicity, fullstack templates with Nextjs and Svelte or REST-API based projects. Every project uses opinionated libraries, so feel free to change any of them.

Typically, the starter templates will make use of at least the following libraries:
- JSON WEBTOKENS: To authenticate a user and to check what the user is allowed to do
- SIMPLE RBAC: Simple Role based access controll upon JWTs. Each project will have a user and an admin role. The admin will get their protected area.
- USERNAME / PASSWORD Auth. Simple Username and Passwort Authentication, no need to use an external Provider all the time. Especially for simple/small projects
- PRISMA: Used as our ORM.
- SQLITE: SQLITE with Prisma to get you up and running without hosting your own database. The whole Prisma schema in these templates can basicallly replaced with Postgres without any changes to the code at all.
- TESTING_LIBRARIES. This libraries will differ depending on the technologies we are using. e.g. Nestjs has a nice out of the box integration with jest, while we might use supertest for express based applications

## Features for each project
- LOGIN / REGISTER with Email/Password
- Change Password Feature
- Reset Password(Not sure about that one, because you need to setup either your own email provider or use an external service)


Each SPA Frontend is 100% compatible with all REST-Based Projects, so you can mix and match them as you like

The following SPA´s are available:
React,

The following REST APIS are available:
Expressjs
Nestjs

The following FULLSTACK Templates are available:
Nextjs
Sveltekit
Express + Ejs(simple, yet powerful and good for small apps)

Tailwindcss for every project
