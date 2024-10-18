# Carteira Digital - Wallet

## Descrição
Esta é uma aplicação de Carteira Digital (Wallet) construída com uma arquitetura baseada em microsserviços. Ela permite gerenciar transações como depósito de valores, saques de valores, compras, além de operações de cancelamento e estorno. A aplicação foi desenvolvida para suportar grandes volumes de transações, processando eventos.

## Funcionalidades
- Adicionar saldo à carteira.
- Retirar valores da carteira.
- Realizar compras usando o saldo disponível.
- Cancelar compras e reverter valores.
- Emitir e processar eventos de transação.
- Registrar e visualizar o extrato da carteira.

## Technologies and Techniques
Node.js - NestJS - RabbitMQ - PostgreSQL - Docker - Clean Architecture
Transaction script - Events-Driven Architecture.

To initialize all applications, run the command via docker-compose:

```bash
docker-container up --build
```

## Architecture Diagram

![image](https://github.com/user-attachments/assets/c41cdc68-ab87-4510-b0e7-fbbe1dc54105)

## Prós e Contras da Arquitetura
### Vantagens:
Escalabilidade: A utilização de Filas auxilia na distribuição de carga resiliencia a picos de trafegos
Desempenho: As filas permitem o processamento assyncrono, alívio de banco de dados.
Isolamento de falhas: A arquitetura de microsserviços permite que problemas em um serviço não afete o restante.

### Desvantagens: 
Complexidade: Microsserviços introduzem complexidade na gestão e comunicação entre serviços, além de aumentar a necessidade de orquestração e observabilidade.
Manutenção: O número elevado de serviços pode dificultar a manutenção e exigir mais esforços de monitoramento.
Latência: Para uma aplicação que necessita de uma resposta rápida e instantânea a escolha das filas nas comunicações podem prejudicar a velocidade das operações.


## Future improvements
Uma mudança na estrutura do balance poderia fazer uma melhoria considerável. É: Deixar as informações de balance no mesmo microsserviço microsserviço da transação.

seria a indexação no banco de dados dos valores de balance de cada wallet.

