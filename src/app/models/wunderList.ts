/**
 * Created by shyshenok on 25.01.2018.
 */



export interface WunderList {
  created_at: string;
  created_by_request_id: string;
  id: number;
  list_type: string;
  owner_id: number;
  owner_type: string;
  public: boolean;
  revision: number;
  title: string;
  type: string;
}
