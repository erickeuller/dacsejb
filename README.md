# Build project
`mvn clean install`

# Deploy
`mvn clean package cargo:run -f dacs-deploy`

# Database configuration

DB configurations stays on `dacs-deploy/pom`

```
cargo.datasource.url=jdbc:mysql://localhost:3306/dacsdb|
cargo.datasource.driver=com.mysql.jdbc.Driver|
cargo.datasource.username=root|
cargo.datasource.password=
```

# Frontend

The application can be accessed on http://localhost:8080/dacs-frontend/

# API

All endpoints are on http://localhost:8080/dacs-frontend/dacs-rest/rest/trooper/
