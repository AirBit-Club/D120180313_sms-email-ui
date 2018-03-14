export class Email{
    constructor(
        public title: string,
        public message_type: number,
        public country_id: number,
        public message: string,
        public lang: string,
        public manager_id: number
    ){}
}