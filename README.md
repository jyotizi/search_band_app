# Search Band App 🎸

A web application to discover music bands by city. Built with **Ruby on Rails** (API backend) and **React** (frontend), and styled using **Bootstrap**.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Testing the Application](#testing-the-application)
- [API Endpoints](#api-endpoints)

---

## Features ✨
- 🌐 Search for music bands based on city names.
- 📍 Auto-detect user location to suggest bands nearby.
- 🛠 Modern responsive UI with Bootstrap.
- 📜 JSON-based API for fetching band data.
- 🚀 Easily deployable on Render.

---

## Prerequisites 🛠️
To run this app locally, ensure you have the following installed:
- Ruby 3.2.2
- Rails 7.0.8.6
- PostgreSQL
- Node.js & Yarn
- Esbuild (for JavaScript bundling)

---

## Technology Stack

### RUBY
  Installed ruby version
- **Ruby 3.2.2**: Programming language used in Rails development.
  ### with RVM
  - \curl -sSL https://get.rvm.io -o rvm.sh
  - rvm install ruby-3.2.2
  ### with rbenv
  - curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
  - rbenv install rbenv-3.2.2

### RAILS
  Installed rails version
- **Rails 7.0.8.6**: Backend framework for web development.


### Postgresql
  Installed postgresql version
- **Postgresql**: Database management system.

---

## Getting Started 🚀

### Clone the repository
```bash
git clone https://github.com/jyotizi/search_band_app.git
cd search_band_app
```
### Install Dependencies
```bash
bundle install
yarn install
```
### Set Up the Database
```bash
rails db:setup # This command will create and migrate the db.
```
### Start the Development Server
```bash
bin/dev # This will start both the Rails API backend and the React frontend.
```
Visit the app at http://localhost:3000.

## Testing the Application 🧪

### Running Tests
To run the test suite, use:
```bash
rails test
```

## API Endpoints

## Fetch bands from API based on city.
 ### `GET /api/v1/bands?city=<city_name>`
  #### Request URL -
    http://localhost:3000/api/v1/bands?city=korea

## Fetch bands on initial load using the user's location.
 ### `GET /api/v1/bands`
  #### Request URL -
    http://localhost:3000/api/v1/bands
---