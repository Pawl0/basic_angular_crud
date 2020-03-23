export class ConfigService {

    private urlService: string;

    constructor() {

        this.urlService = 'https://crudcrud.com/api/dfa853d0d83040b586854755b4e0516e';
    }

    getUrlService(): string {

        return this.urlService;
    }

}