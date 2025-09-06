FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Copy the built JAR
RUN cp target/backend-1.0.0.jar app.jar
ENTRYPOINT ["java","-Djdk.tls.client.protocols=TLSv1.2,TLSv1.3","-Dhttps.protocols=TLSv1.2,TLSv1.3","-jar","app.jar"]
