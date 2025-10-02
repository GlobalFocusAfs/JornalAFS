# TODO: Corrigir votação em enquetes

- [x] Atualizar SecurityConfig para permitir votação sem autenticação
- [x] Modificar modelo Poll para rastrear IPs que votaram
- [x] Atualizar PollService para verificar e prevenir votos múltiplos do mesmo IP
- [x] Atualizar PollController para passar IP para o serviço
- [x] Atualizar frontend PollList para remover requisito de token
