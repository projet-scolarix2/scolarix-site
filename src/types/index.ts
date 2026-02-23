export type UserRole = "admin" | "parent";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  school_id?: string;
  children?: string[]; // IDs des enfants pour les parents
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface Student {
  id: string;
  name: string;
  matricule: string;
  class: string;
  level: string;
  avatar?: string;
}

export interface Result {
  id: string;
  student_id: string;
  subject: string;
  mark: number;
  coefficient: number;
  period: string;
  date: string;
}

export interface Attendance {
  id: string;
  student_id: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  subject: string;
  teacher?: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  subject?: string;
  teacher?: string;
  start_time: string;
  end_time: string;
  day: string;
  room?: string;
}

export interface Payment {
  id: string;
  student_id: string;
  description: string;
  amount: number;
  due_date: string;
  status: "pending" | "paid" | "overdue";
  payment_method?: string;
  paid_date?: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: "text" | "image" | "document";
}

export interface SchoolInfo {
  id: string;
  name: string;
  logo?: string;
  whatsapp_number?: string;
  email?: string;
  address?: string;
  phone?: string;
}
