# Digital Wallet

## Description
This is a Digital Wallet application built with a microservices-based architecture. It allows you to manage transactions such as deposits, withdrawals, purchases, as well as cancellation and refund operations. The application was developed to support large volumes of transactions, processing events.

## Features
- Add balance to wallet.
- Withdraw amounts from the wallet.
- Make purchases using your available balance.
- Cancel purchases and reverse values.
- Issue and process transaction events.
- Register and view the portfolio statement.

## Technologies and Techniques
Node.js - NestJS - RabbitMQ - PostgreSQL - Docker - Clean Architecture
Transaction script - Events-Driven Architecture.

To initialize all applications, run the command via docker-compose:

```bash
docker-container up --build
```

## Architecture Diagram

![image](https://github.com/user-attachments/assets/c41cdc68-ab87-4510-b0e7-fbbe1dc54105)

## Pros and Cons of Architecture
### Advantages:
Scalability: The use of Queues helps in load distribution and is resilient to traffic peaks
Performance: Queues enable asynchronous processing, database relief.
Fault isolation: Microservices architecture allows problems in one service not to affect the rest.

### Disadvantages: 
Complexity: Microservices introduce complexity in the management and communication between services, in addition to increasing the need for orchestration and observability.
Maintenance: The high number of services can make maintenance difficult and require more monitoring efforts.
Latency: For an application that requires a quick and instantaneous response, the choice of queues in communications can harm the speed of operations.


## Future improvements
- Place a balance structure in the transaction service
- index balances in the database
- create blocks for withdrawals or removal of money per wallet

![image](https://github.com/user-attachments/assets/544d2830-8dad-441a-a2e7-05201a5a015e)




