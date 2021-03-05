export interface EventHistoryElement {
  id: string;
  userId: string;
  userRole: string;
  userEmail: string;
  action: string;
  description: string;
  date: Date;
}
