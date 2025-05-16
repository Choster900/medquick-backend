interface SendEmailOptions {
    to: string | string[];
    subject: string;
    body: string;
    attachments?: Attachment[];
}
interface Attachment {
    filename: string;
    path: string;
}
