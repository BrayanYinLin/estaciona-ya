import { env_resend_api } from '@shared/config/env.config'
import { verifyEmailHtml } from '@shared/constants/mail'
import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { Resend } from 'resend'

export class MailService {
  private resend: Resend
  constructor() {
    this.resend = new Resend(env_resend_api)
  }
  async sendMail(code: string, subject: string, email: string, from: string) {
    const { data, error } = await this.resend.emails.send({
      from: from,
      to: [email],
      subject: subject,
      html: verifyEmailHtml(code)
    })

    if (error) {
      throw new DomainError({
        code: DOMAIN_ERRORS.EMAIL_ERROR.code,
        message: DOMAIN_ERRORS.EMAIL_ERROR.message
      })
    }

    return Boolean(data)
  }
}
