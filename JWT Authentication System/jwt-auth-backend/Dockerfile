# ==========================================
# Stage 1: Build the Spring Boot application
# ==========================================
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Compile and package the application into a JAR file, skipping tests for fast deployment
RUN mvn clean package -DskipTests

# ==========================================
# Stage 2: Runtime environment
# ==========================================
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the packaged JAR from the build stage
COPY --from=build /app/target/jwt-auth-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
