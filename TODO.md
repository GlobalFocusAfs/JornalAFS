# TODO - Correção da Falha no Deploy

## Passos Concluídos:
- [x] Adicionar dependência `cloudinary-http44` ao `pom.xml` para resolver o erro do adaptador Cloudinary (cloudinary-http5 não existia, usado http44).
- [x] Corrigir `@Value` no `CloudinaryConfig.java` para injetar propriedades corretamente.
- [x] Corrigir URI do MongoDB no `application.properties` (alterar "Jornalescola" para "jornalescola").
- [x] Reconstruir a aplicação com Maven (`mvn clean install`) - Build SUCCESS.
- [x] Preencher as propriedades do Cloudinary no `application.properties` com as credenciais fornecidas.

## Próximos Passos:
- [ ] Reimplantar no Render ou plataforma de deploy.
- [ ] Testar o deploy para confirmar a resolução dos erros.
- [ ] Se o erro do MongoDB persistir, confirmar o status do cluster no MongoDB Atlas.
