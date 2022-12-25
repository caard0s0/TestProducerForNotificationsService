import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
    const kafka = new Kafka({
        clientId: 'test-producer',
        brokers: ['special-weasel-14782-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'c3BlY2lhbC13ZWFzZWwtMTQ3ODIk2EnWaK7FWD91eCFdtW0RQfn2uPMGU2BvQvM',
            password: '5fBfMch3kAAWKiWFVaQyggM3jbcpDfc3qydrUFIhT5vbfrtJ-tpnScdMUEeQlq5WfBdL-A==',
        },
        ssl: true,
    })

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'New friendship request',
                    category: 'social',
                    recipientId: randomUUID()
                })
            }
        ],
    })

    await producer.disconnect();
}

bootstrap();