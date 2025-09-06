# TODO: Implement Authentication and Polls for Jornal da EEEP

## Tasks
- [x] Add Spring Security and JWT dependencies to pom.xml
- [x] Create User model for authentication
- [x] Create Poll model for polls and voting
- [x] Add SecurityConfig for JWT authentication
- [x] Update NoticiaController to require auth for POST
- [x] Create PollController for poll CRUD and voting
- [x] Create admin user on startup
- [x] Update frontend: Add Login component
- [x] Update App.js to include login button and conditional rendering
- [x] Add PollForm and PollList components
- [ ] Test authentication and poll functionality

## Notes
- Use hardcoded admin credentials for simplicity (e.g., username: admin, password: admin123)
- JWT for stateless auth
- Polls allow multiple votes per user (simple implementation)
