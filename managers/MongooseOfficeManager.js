import chalk from 'chalk';
import Poll from '../../models/PollModel.js';

class MongooseOfficeManager {
    constructor() {
        this.OfficeModel = Office;
    }

    async initialize(app = null) {
        return true;
    }

    async fetchOffices(user) {
        try {
            const allOfficesBelongingToUser = await this.OfficeModel.find({ belongsTo: user.id });
            const allOfficeObjects = allOfficesBelongingToUser.map(element => {
                return element.toObject();
            });
            console.log(chalk.blueBright.inverse('All offices loaded'));
            return allOfficeObjects;
        } catch (e) {
            console.log(chalk.blueBright.inverse('Empty offices loaded'));
            return [];
        }
    }

    async addOffice(user, department, unitname, workers, head) {
        if (user) {
            const haveDuplicateOffice = await this.OfficeModel.findOne({ belongsTo: user.id, department }).lean();
            if (!haveDuplicateOffice) {
                const newOffice = {
                    department: department,
                    unitname: unitname,
                    workers: workers,
                    head: head,
                    belongsTo: user.id
                };
                const addedOfficeDocument = await this.OfficeModel.create(newOffice);

                if (addedOfficeDocument) {
                    console.log(chalk.green.inverse('New office added!'));
                    const savedOffice = addedOfficeDocument.toObject();
                    return savedOffice;
                } else
                    console.log(chalk.red.inverse('Error in db creating the new office!'));
            } else
                console.log(chalk.red.inverse('Office title taken!'));
        } else
            console.log(chalk.red.inverse('No user given!'));

        return null;
    }

    async removeOffice(user, id) {
        const selectedOfficeById = await this.OfficeModel.findById(id).populate('belongsTo');

        if (selectedOfficeById) {
            if (selectedOfficeById.belongsTo.id == user.id) {
                const removedOfficeDocument = await this.OfficeModel.findByIdAndDelete(id);
                console.log(chalk.green.inverse('Office removed!' + removedOfficeDocument));
                return removedOfficeDocument.toObject();
            } else {
                console.log(chalk.red.inverse(`Office id and user do not correlate! No deletion made!`));
                return null;
            }
        } else {
            console.log(chalk.red.inverse(`No office found with id = ${id} !`));
            return null;
        }
    }

    async changeOffice(user, office) {
        const officeToChangeDocument = await this.OfficeModel.findOne({ _id: office.id, belongsTo: user.id });

        if (officeToChangeDocument) {
            const oldDepartment = officeToChangeDocument.department;
            let sameDepartmentOffice = null;
            if (oldDepartment != office.department)
            sameDepartmentOffice = await this.OfficeModel.findOne({ department: office.department, belongsTo: user.id });

            if (!sameDepartmentOffice) {
                officeToChangeDocument.title = office.department;
                officeToChangeDocument.unitname = office.unitname;
                officeToChangeDocument.workers = office.workers;
                officeToChangeDocument.head = office.head;
                console.log(chalk.green.inverse('Office changed!'));

                const changedOfficeDocument = await officeToChangeDocument.save();
                return changedOfficeDocument.toObject();
            } else
                console.log(chalk.red.inverse('Office with same title exists for this user!'));
        } else
            console.log(chalk.red.inverse('Office to change not found!'));

        return null;
    }

    async getOfficeById(user, id) {
        const foundOffice = await this.OfficeModel.findOne({ _id: id, belongsTo: user.id });

        if (foundOffice) {
            console.log(chalk.green.inverse('Got office: ' + foundOffice.department + ':' + foundOffice.unitname));
            return foundOffice.toObject();
        } else {
            console.log(chalk.red.inverse(`Office not found with id = ${id} !`));
        }

        return null;
    }
}

export default MongooseOfficeManager;
