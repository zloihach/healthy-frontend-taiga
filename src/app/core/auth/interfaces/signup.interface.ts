export interface SignUpRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  midname?: string;
  dob: string;
  sex: 'MALE' | 'FEMALE';
}
