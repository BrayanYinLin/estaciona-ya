export type MailPayload = {
  code: string
  subject: string
  email: string
  from: string
}

export interface MailService {
  sendMail(payload: MailPayload): Promise<boolean>
}
