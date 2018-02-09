/**
 * Created by shyshenok on 29.01.2018.
 */


export interface WunderlistTask {
  id: number;
  assignee_id: number;
  created_at: string;
  created_by_id: number;
  due_date: string;
  list_id: number;
  revision: number;
  starred: boolean;
  title: string;
}
