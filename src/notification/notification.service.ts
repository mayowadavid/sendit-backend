import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PusherService } from 'src/pusher/pusher.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private pusherService: PusherService,
  ) {}
  async create(
    createNotificationInput: CreateNotificationInput,
  ): Promise<Notification> {
    const Notification = this.notificationRepository.create(
      createNotificationInput,
    );
    const notify = await this.notificationRepository.save(Notification);
    const userId = notify.userId;
    await this.pusherService.trigger(`${userId}`, 'notification', {
      ...notify,
    });
    return notify;
  }

  findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({
      relations: ['user'],
    });
  }

  findUserNotification(user): Promise<Notification[]> {
    return this.notificationRepository.find({
      relations: ['user'],
      where: {
        user,
      },
    });
  }

  findOne(id: string): Promise<Notification> {
    return this.notificationRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateNotificationInput: UpdateNotificationInput,
  ): Promise<Notification> {
    const notification: Notification =
      await this.notificationRepository.findOne({ where: { id } });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateNotificationInput);
    const result = { ...notification, ...value };
    return this.notificationRepository.save(result);
  }

  async remove(id: string): Promise<Notification> {
    const deleteNotification = await this.notificationRepository.findOne({
      where: { id },
    });
    await this.notificationRepository.remove(deleteNotification);
    return deleteNotification;
  }
}
