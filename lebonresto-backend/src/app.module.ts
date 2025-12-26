import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { CustomerAuthModule } from './modules/auth/customer-auth/customer-auth.module';
import { OwnerAuthModule } from './modules/auth/owner-auth/owner-auth.module';
import { AdminAuthModule } from './modules/auth/admin-auth/admin-auth.module';
import { EmailModule } from './modules/email/email.module';
import { OwnersModule } from './modules/owners/owners.module';
import { AdminsModule } from './modules/admins/admins.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { ImagesModule } from './modules/images/images.module';
import { MenusModule } from './modules/menus/menus.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { EventsModule } from './modules/events/events.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CitiesModule } from './modules/cities/cities.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagsModule } from './modules/tags/tags.module';
import { SavedRestaurantsModule } from './modules/saved-restaurants/saved-restaurants.module';
import { RestaurantLeadsModule } from './modules/restaurant-leads/restaurant-leads.module';
import { HorairesModule } from './modules/horaires/horaires.module';
import configuration from './common/config/configuration';
import { validationSchema } from './common/config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    AuthModule,
    CustomersModule,
    OwnersModule,
    AdminsModule,
    RestaurantsModule,
    ImagesModule,
    MenusModule,
    ReservationsModule,
    FeedbackModule,
    EventsModule,
    NotificationsModule,
    CitiesModule,
    CategoriesModule,
    TagsModule,
    SavedRestaurantsModule,
    RestaurantLeadsModule,
    HorairesModule,
    CustomerAuthModule,
    OwnerAuthModule,
    AdminAuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
