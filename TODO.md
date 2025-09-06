# TODO: Implement Comprehensive Improvements for Jornal da EEEP

## Completed Tasks
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
- [x] Test authentication and poll functionality
- [x] Enhanced header with logo, social icons, and better layout
- [x] Improved footer with contact info, links, and navigation
- [x] Login modal toggle functionality

## Remaining Improvements

### 1. Aparência e Layout
- [ ] Add slogan to header
- [ ] Create modular card layout for news
- [ ] Add carousel/banner for featured news
- [ ] Implement responsive design improvements

### 2. Login e Autenticação
- [ ] Create separate login page
- [ ] Add email confirmation for registration
- [ ] Implement password recovery
- [ ] Add Google/Microsoft login integration
- [ ] Create different user roles (Admin, Redator, Leitor)

### 3. Notícias
- [ ] Add categories system (Educação, Eventos, Premiações, Esportes, Cultura, Opinião)
- [ ] Implement tags for organization
- [ ] Add related articles section
- [ ] Create featured news system
- [ ] Add sharing buttons (WhatsApp, Instagram, Facebook)

### 4. Interatividade
- [ ] Add comments system with moderation
- [ ] Implement likes and view counters
- [ ] Add real-time poll results
- [ ] Create newsletter system
- [ ] Implement push notifications

### 5. Painel Administrativo
- [ ] Create admin dashboard with statistics
- [ ] Add poll management (create, edit, close)
- [ ] Implement user management with permissions
- [ ] Add news approval workflow
- [ ] Create activity logs

### 6. Acessibilidade e Profissionalismo
- [ ] Ensure full responsiveness
- [ ] Add dark/light mode toggle
- [ ] Implement accessibility features
- [ ] Optimize SEO
- [ ] Add translation support

### 7. Extras
- [ ] Create news archive by year/month
- [ ] Add "About" page with team presentation
- [ ] Implement contact form
- [ ] Add multimedia gallery
- [ ] Plan mobile app development

## Notes
- Use hardcoded admin credentials for simplicity (e.g., username: admin, password: admin123)
- JWT for stateless auth
- Polls allow multiple votes per user (simple implementation)
- Prioritize core functionality before advanced features
