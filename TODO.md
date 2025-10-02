# Correção do Sistema de Votos em Enquetes

## Problema
O sistema está restringindo votos por IP, impedindo dispositivos diferentes na mesma rede de votar, mesmo que cada dispositivo deva votar apenas uma vez.

## Solução
Alterar para controle por identificador único de dispositivo (deviceId) em vez de IP.

## Passos a Executar
- [x] Alterar backend/src/main/java/com/jornal/model/Poll.java: Renomear votedIPs para votedDeviceIds e ajustar getters/setters.
- [x] Alterar backend/src/main/java/com/jornal/service/PollService.java: Modificar método vote para receber deviceId em vez de ip e verificar votedDeviceIds.
- [x] Alterar backend/src/main/java/com/jornal/controller/PollController.java: Modificar endpoint /vote para receber deviceId do request body em vez de obter IP.
- [x] Alterar frontend/src/components/PollList.js: Gerar deviceId único se não existir em localStorage, armazená-lo e enviá-lo com o voto.
- [ ] Testar a funcionalidade para garantir que dispositivos diferentes possam votar mesmo com IP igual.
