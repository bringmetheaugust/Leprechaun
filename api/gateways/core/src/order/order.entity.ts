import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { OrderCustomerDataI, OrderI } from './order.interface';
import SessionEntity from '../session/session.entity';
import { OrderStatus } from './order.enum';
import { OrderItemEntity } from '../orderItem/orderItem.entity';

export class OrderCustomerDataEntity implements OrderCustomerDataI {
    @Column({ name: 'customer_name', nullable: true })
    @ApiProperty()
    name: string;

    @Column({ name: 'customer_phone', nullable: true })
    @ApiProperty()
    phone: string;
}

@Entity('order')
export default class OrderEntity implements OrderI {
    @PrimaryColumn({ type: 'bigint' })
    @ApiProperty({ description: 'order ID' })
    id: number;

    @ManyToOne(() => SessionEntity, ({ sid }) => sid, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sid', referencedColumnName: 'sid' })
    @ApiProperty({ description: 'user session ID' })
    sid: string;

    @Column({ default: OrderStatus.INIT })
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn()
    @ApiProperty({ type: Date, description: 'date of last changed status' })
    updated_at: Date;

    @OneToMany(() => OrderItemEntity, ({ order_id }) => order_id, { eager: true })
    @ApiProperty({ type: OrderItemEntity, isArray: true })
    items: OrderItemEntity[];

    @Column(() => OrderCustomerDataEntity, { prefix: false })
    @ApiProperty({ description: "customer's order credentials" })
    customer: OrderCustomerDataI;
}
