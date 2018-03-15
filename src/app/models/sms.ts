export class Sms {
    constructor(
        public title: string,
        public message_type: number,
        public message: string,
        public lang: string,
        public manager_id: number
    ) { }
}
