import * as fs from'fs';
import * as prop from 'properties';

class Config {

    private properties: any;

    constructor() {
        try {
            // let data = fs.readFileSync (`${process.env.ENVIRONMENT || 'local'}`, { encoding: 'utf8' });
            let data = fs.readFileSync('.env', {encoding: 'utf8'});
            let props = prop.parse(data, {sections: true, namespaces: true, variables: true});
            this.properties = props;
        } catch (error) {
            // Config.logger.error(`Unable to load properties file: ${error}`);

            throw error;
        }
    }

    getServicesProperties(): any {
        return this.properties;
    }

    getProperties(): any {
        return this.properties.properties;
    }

    getProperty(name: string): any {
        return this.properties.properties[name];
    }

    getServices(): any {
        return this.properties.services;
    }

    getService(serviceName: string): any {
        return this.properties.services[serviceName];
    }
}

export const Properties = new Config();
