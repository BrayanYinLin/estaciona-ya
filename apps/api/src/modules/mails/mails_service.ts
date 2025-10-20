import { verifyEmailHtml } from '@shared/constants/mail'
import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { Resend } from 'resend'
import { MailPayload, MailService } from './mail'

export class MailServiceImpl implements MailService {
  constructor(private readonly resend: Resend) {}

  async sendMail({
    code,
    email,
    from,
    subject
  }: MailPayload): Promise<boolean> {
    const { data, error } = await this.resend.emails.send({
      from: from,
      to: [email],
      subject: subject,
      html: verifyEmailHtml(code)
    })

    if (error) {
      throw new DomainError({
        code: DOMAIN_ERRORS.EMAIL_ERROR.code,
        message: 'Error enviando el email'
      })
    }

    return Boolean(data)
  }
}
