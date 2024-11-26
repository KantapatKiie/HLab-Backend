import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user_profile', schema: 'STG', synchronize: false })
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'FullName' })
  fullName: string;

  @Column({ name: 'SalesRepAccountID' })
  salesRepAccountId: string;

  @Column({ name: 'IsActive' })
  isActive: boolean;

  @Column({ name: 'CreatedBy' })
  createdBy: string;

  @Column({ name: 'CreatedDate' })
  createdDate: Date;

  @Column({ name: 'UpdatedBy' })
  updatedBy: string;

  @Column({ name: 'UpdatedDate' })
  updatedDate: Date;

  @Column({ name: 'IsFirstGrantRole' })
  isFirstGrantRole: boolean;
}
