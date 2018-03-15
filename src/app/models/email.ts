export class Email {
    constructor(
        public lang: string,
        public title: string,
        public sub_title: string,
        public question: string,
        public additional_information: string,
        public manager_id: number,
        public template: number
    ) { }
}
