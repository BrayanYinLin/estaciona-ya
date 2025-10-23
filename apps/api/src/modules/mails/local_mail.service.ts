import { MailPayload, MailService } from './mail'

export class LocalMail implements MailService {
  async sendMail({ code }: MailPayload): Promise<boolean> {
    console.log(code)
    return true
  }
}
